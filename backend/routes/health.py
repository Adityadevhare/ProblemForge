from fastapi import APIRouter
from datetime import datetime
from models.problem import HealthResponse

router = APIRouter(prefix="/api/health", tags=["Health"])


@router.get("/")
async def health_check() -> HealthResponse:
    """Health check endpoint to verify API is running."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.utcnow(),
        service="ProblemForge API"
    )