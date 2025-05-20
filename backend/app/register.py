from fastapi import APIRouter, UploadFile, Form, File, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .database import get_db
from .models import User
import os
import shutil

router = APIRouter()

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 회원가입 엔드포인트
@router.post("/register")
async def register_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 중복 확인
    if db.query(User).filter((User.username == username) | (User.email == email)).first():
        raise HTTPException(status_code=400, detail="Username or email already exists.")

    # 프로필 이미지 저장
    os.makedirs("static/profile", exist_ok=True)
    image_path = f"static/profile/{image.filename}"
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # 비밀번호 해싱
    hashed_password = pwd_context.hash(password)

    # 사용자 생성
    new_user = User(
        username=username,
        email=email,
        hashed_password=hashed_password,
        image_url=f"/static/profile/{image.filename}"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "image_url": new_user.image_url
    }
