import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import router
from fastapi.staticfiles import StaticFiles
from app.register import router as register_router
from app.login import router as login_router
from app.database import engine
from app.models import Base

# ✅ 테이블 생성 먼저
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 및 정적 파일 설정
app.include_router(router)
app.include_router(register_router)
app.include_router(login_router)
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
