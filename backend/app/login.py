from fastapi import APIRouter, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .models import User
from .database import get_db

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login_user(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    try:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=400, detail="User not found.")
        
        if not pwd_context.verify(password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect password.")

        return {
            "message": "Login successful",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "image_url": user.image_url
        }
    except Exception as e:
        print("⚠️ Error during login:", e)
        raise HTTPException(status_code=500, detail="Internal server error")
