from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import psycopg2
from dotenv import load_dotenv
import os

# Connect to the database
load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# ORM connections, for general endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()