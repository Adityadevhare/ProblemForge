from typing import List, Optional, Dict, Any
import random
from models.problem import Problem, MetadataResponse
from utils.data_loader import load_problems


class ProblemService:
    def __init__(self):
        self._data = load_problems()

    def _apply_filters(
        self,
        problems: List[Dict[str, Any]],
        domain: Optional[str] = None,
        difficulty: Optional[str] = None,
        tech: Optional[List[str]] = None,
        duration: Optional[str] = None,
        tags: Optional[List[str]] = None,
    ) -> List[Dict[str, Any]]:
        """Apply filters to a list of problem dicts."""
        filtered = problems

        if domain:
            filtered = [p for p in filtered if p["domain"].lower() == domain.lower()]

        if difficulty:
            filtered = [p for p in filtered if p["difficulty"].lower() == difficulty.lower()]

        if tech:
            tech_lower = [t.lower() for t in tech]
            filtered = [
                p for p in filtered
                if any(t.lower() in [pt.lower() for pt in p["tech_stack"]] for t in tech_lower)
            ]

        if duration:
            filtered = [p for p in filtered if p["duration"].lower() == duration.lower()]

        if tags:
            tags_lower = [t.lower() for t in tags]
            filtered = [
                p for p in filtered
                if any(t.lower() in [pt.lower() for pt in p["tags"]] for t in tags_lower)
            ]

        return filtered

    def _to_problem_models(self, problem_dicts: List[Dict[str, Any]]) -> List[Problem]:
        """Convert list of dicts to list of Problem Pydantic models."""
        return [Problem(**p) for p in problem_dicts]

    def get_all(
        self,
        domain: Optional[str] = None,
        difficulty: Optional[str] = None,
        tech: Optional[List[str]] = None,
        duration: Optional[str] = None,
        tags: Optional[List[str]] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> tuple[List[Problem], int]:
        """
        Return filtered problems with pagination.
        Returns (items, total_count).
        """
        filtered = self._apply_filters(self._data, domain, difficulty, tech, duration, tags)
        total = len(filtered)
        paginated = filtered[offset:offset + limit]
        return self._to_problem_models(paginated), total

    def get_by_id(self, problem_id: str) -> Optional[Problem]:
        """Get a single problem by its ID."""
        for p in self._data:
            if p["id"] == problem_id:
                return Problem(**p)
        return None

    def search(
        self,
        query: str,
        domain: Optional[str] = None,
        difficulty: Optional[str] = None,
        tech: Optional[List[str]] = None,
        duration: Optional[str] = None,
        tags: Optional[List[str]] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> tuple[List[Problem], int]:
        """
        Full-text search across title, description, and tags.
        Then apply filters and pagination.
        """
        query_lower = query.lower()
        # Search in title, description, and tags (each tag individually)
        matched = []
        for p in self._data:
            title_match = query_lower in p["title"].lower()
            desc_match = query_lower in p["description"].lower()
            tag_match = any(query_lower in tag.lower() for tag in p["tags"])
            if title_match or desc_match or tag_match:
                matched.append(p)

        # Apply filters on the matched set
        filtered = self._apply_filters(matched, domain, difficulty, tech, duration, tags)
        total = len(filtered)
        paginated = filtered[offset:offset + limit]
        return self._to_problem_models(paginated), total

    def get_random(self) -> Problem:
        """Return a random problem."""
        return Problem(**random.choice(self._data))

    def get_metadata(self) -> MetadataResponse:
        """Collect distinct values for all filter fields."""
        domains = sorted(set(p["domain"] for p in self._data))
        difficulties = sorted(set(p["difficulty"] for p in self._data))
        techs = sorted(set(t for p in self._data for t in p["tech_stack"]))
        durations = sorted(set(p["duration"] for p in self._data))
        tags = sorted(set(t for p in self._data for t in p["tags"]))

        return MetadataResponse(
            domains=domains,
            difficulties=difficulties,
            techs=techs,
            durations=durations,
            tags=tags,
        )