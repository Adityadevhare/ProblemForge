from fastapi import APIRouter

router = APIRouter(tags=["Root"])


@router.get("/")
async def root():
    return {
        "message": "Welcome to ProblemForge API",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "health": "/api/health",
            "problems": "/api/problems",
            "search": "/api/search?q=<query>",
            "random": "/api/random",
            "metadata": "/api/metadata",
        },
    }