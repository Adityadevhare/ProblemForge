from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class Problem(BaseModel):
    id: str
    title: str
    description: str
    domain: str
    difficulty: str
    tech_stack: List[str] = Field(..., alias="tech_stack")
    duration: str
    tags: List[str]
    problem_statement: str
    objectives: List[str]
    deliverables: List[str]

    class Config:
        populate_by_name = True


class ProblemListResponse(BaseModel):
    items: List[Problem]
    total: int
    limit: int = 20
    offset: int = 0


class MetadataResponse(BaseModel):
    domains: List[str]
    difficulties: List[str]
    techs: List[str]
    durations: List[str]
    tags: List[str]


class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    service: str = "ProblemForge API"