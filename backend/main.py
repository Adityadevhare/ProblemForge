from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routes.root import router as root_router
from routes.health import router as health_router
from routes.problem import router as problem_router

# Create FastAPI app instance
app = FastAPI(
    title="ProblemForge API",
    description="API for discovering project and hackathon problem statements",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",      # <-- ADD THIS
        "http://127.0.0.1:8080",      # <-- ADD THIS
        # Or use "*" for development:
        # "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(root_router)
app.include_router(health_router)
app.include_router(problem_router)