from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from services.problem_service import ProblemService
from models.problem import Problem, ProblemListResponse

router = APIRouter(prefix="/api", tags=["Problems"])
service = ProblemService()


@router.get("/problems")
async def get_problems(
    domain: Optional[str] = Query(None, description="Filter by domain"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    tech: Optional[str] = Query(None, description="Comma-separated list of technologies"),
    duration: Optional[str] = Query(None, description="Filter by duration"),
    tags: Optional[str] = Query(None, description="Comma-separated list of tags"),
    limit: int = Query(20, ge=1, le=100, description="Number of results per page"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
) -> ProblemListResponse:
    """
    Get all problems with optional filtering and pagination.
    """
    tech_list = [t.strip() for t in tech.split(",")] if tech else None
    tags_list = [t.strip() for t in tags.split(",")] if tags else None

    items, total = service.get_all(
        domain=domain,
        difficulty=difficulty,
        tech=tech_list,
        duration=duration,
        tags=tags_list,
        limit=limit,
        offset=offset,
    )
    return ProblemListResponse(items=items, total=total, limit=limit, offset=offset)


@router.get("/problems/{problem_id}")
async def get_problem_by_id(problem_id: str) -> Problem:
    """
    Get a single problem by its ID.
    """
    problem = service.get_by_id(problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@router.get("/search")
async def search_problems(
    q: str = Query(..., description="Search query string"),
    domain: Optional[str] = Query(None, description="Filter by domain"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    tech: Optional[str] = Query(None, description="Comma-separated list of technologies"),
    duration: Optional[str] = Query(None, description="Filter by duration"),
    tags: Optional[str] = Query(None, description="Comma-separated list of tags"),
    limit: int = Query(20, ge=1, le=100, description="Number of results per page"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
) -> ProblemListResponse:
    """
    Full-text search across problem titles, descriptions, and tags.
    Additional filters can be combined.
    """
    tech_list = [t.strip() for t in tech.split(",")] if tech else None
    tags_list = [t.strip() for t in tags.split(",")] if tags else None

    items, total = service.search(
        query=q,
        domain=domain,
        difficulty=difficulty,
        tech=tech_list,
        duration=duration,
        tags=tags_list,
        limit=limit,
        offset=offset,
    )
    return ProblemListResponse(items=items, total=total, limit=limit, offset=offset)


@router.get("/random")
async def get_random_problem() -> Problem:
    """
    Get a random problem.
    """
    return service.get_random()


@router.get("/metadata")
async def get_metadata():
    """
    Get distinct values for all filterable fields.
    """
    return service.get_metadata()