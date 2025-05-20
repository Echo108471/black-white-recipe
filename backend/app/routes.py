from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from collections import Counter
from .database import get_db
from .models import Recipe, User, Ingredient, RecipeIngredient, Comment, Rating
from .filter import recipe_filter_query
from pydantic import BaseModel
from typing import List
from fastapi import UploadFile, File, Form
import shutil
import os
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from .database import get_db
from .models import Recipe, User, Ingredient, Comment, Rating



class RecipeCreate(BaseModel):
    title: str
    description: str
    instructions: str
    ingredients: List[str]

router = APIRouter()

# @router.get("/recipes")
# def get_all_recipes(db: Session = Depends(get_db)):
#     data = (
#         db.query(Recipe)
#         .options(joinedload(Recipe.recipe_ingredients).joinedload(RecipeIngredient.ingredient))
#         .all()
#     )
#     return [{
#         "id": recipe.id,
#         "title": recipe.title,
#         "description": recipe.description,
#         "instructions": recipe.instructions,
#         "image_url": recipe.image_url,
#         "ingredients": [
#             {
#                 "name": ri.ingredient.name,
#                 "amount": ri.amount,
#                 "note": ri.note
#             }
#             for ri in recipe.recipe_ingredients
#         ],
#             } for recipe in data]

@router.get("/ingredients")
def get_all_ingredients(db: Session = Depends(get_db)):
    """
    Retrieves a list of all available ingredients.
    """
    data = db.query(Ingredient).all()
    
    if not data:
        return {"message": "No ingredients found."}

    return [{"id": ingredient.id, "name": ingredient.name} for ingredient in data]

@router.get("/filtered-recipes/")
def filter_recipe_endpoint(filter_terms: str, db: Session = Depends(get_db)):
    filter_terms_list = filter_terms.split(",") if filter_terms else []
    
    if not filter_terms_list:
        raise HTTPException(status_code=400, detail="At least one filter term must be provided.")

    return recipe_filter_query(db, filter_terms_list)  # <-- 여기가 꼭 List[Dict] 형태로 되어야 함

@router.post("/create_recipes", status_code=201)
async def create_recipe(
    title: str = Form(...),
    description: str = Form(...),
    instructions: str = Form(...),
    ingredients: str = Form(...),  # <- JSON string
    image: UploadFile = File(...),
    serving_size: str = Form(...),
    time: str = Form(...),
    difficulty: str = Form(...),
    author_id: int = Form(...),
    db: Session = Depends(get_db)
):
    # 중복 검사
    existing_recipe = db.query(Recipe).filter(Recipe.title == title).first()
    if existing_recipe:
        raise HTTPException(status_code=400, detail="A recipe with this title already exists.")

    # 이미지 저장
    image_url = None
    if image:
        os.makedirs("static/images", exist_ok=True)
        file_path = f"static/images/{image.filename}"
        with open(file_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        image_url = f"/static/images/{image.filename}"

    # DB 객체 생성
    new_recipe = Recipe(
        title=title,
        description=description,
        instructions=instructions,
        image_url=image_url,
        serving_size=serving_size,
        time=time,
        difficulty=difficulty,
        author_id=author_id
    )
    db.add(new_recipe)
    db.flush()

    # 재료 처리
    ingredient_data = json.loads(ingredients)

    # 재료가 문자열 배열로 온 경우 처리
    if ingredient_data and isinstance(ingredient_data[0], str):
        ingredient_data = [{"name": name} for name in ingredient_data]

    for item in ingredient_data:
        name = item.get("name", "")
        amount = item.get("amount", "")
        note = item.get("note", "")

        if not name:
            continue

        ingredient = db.query(Ingredient).filter(Ingredient.name == name).first()
        if not ingredient:
            ingredient = Ingredient(name=name)
            db.add(ingredient)
            db.flush()

        assoc = RecipeIngredient(
            recipe_id=new_recipe.id,
            ingredient_id=ingredient.id,
            amount=amount,
            note=note
        )
        db.add(assoc)
        db.commit()


    return {
        "id": new_recipe.id,
        "title": new_recipe.title,
        "description": new_recipe.description,
        "instructions": new_recipe.instructions,
        "serving_size": new_recipe.serving_size,
        "time": new_recipe.time,
        "difficulty": new_recipe.difficulty,
        "author_id": new_recipe.author_id,
        "image_url": new_recipe.image_url,
        # 응답에서 재료 정보 다시 불러오기
        "ingredients": [
            {
                "name": assoc.ingredient.name,
                "amount": assoc.amount,
                "note": assoc.note
            }
            for assoc in db.query(RecipeIngredient).filter(RecipeIngredient.recipe_id == new_recipe.id).all()
        ]
    }
    
@router.get("/recipe/{recipe_id}")
def get_recipe_detail(recipe_id: int, db: Session = Depends(get_db)):
    recipe = (
        db.query(Recipe)
        .options(
            joinedload(Recipe.recipe_ingredients).joinedload(RecipeIngredient.ingredient),
            joinedload(Recipe.author),
            joinedload(Recipe.comments).joinedload(Comment.user),
            joinedload(Recipe.ratings)
        )
        .filter(Recipe.id == recipe_id)
        .first()
    )

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found.")

    return {
        "id": recipe.id,
        "title": recipe.title,
        "description": recipe.description,
        "instructions": recipe.instructions,
        "image_url": recipe.image_url,
        "serving_size": recipe.serving_size,
        "time": recipe.time,
        "difficulty": recipe.difficulty,
        "author": {
            "email": recipe.author.email,
            "image_url": recipe.author.image_url
        },
        "ingredients": [
            {
                "name": ri.ingredient.name,
                "amount": ri.amount,
                "note": ri.note
            }
            for ri in recipe.recipe_ingredients
        ],
        "comments": [
        {
            "user_email": comment.user.email,
            "content": comment.content,
            "rating": next((r.score for r in recipe.ratings if r.user_id == comment.user_id), None)
        }
        for comment in recipe.comments
    ],

        "ratings": [rating.score for rating in recipe.ratings],
    }
from pydantic import BaseModel

class CommentCreate(BaseModel):
    content: str
    rating: float
    user_id: int

@router.get("/recipes")
def get_all_recipes(db: Session = Depends(get_db)):
    data = (
        db.query(Recipe)
        .options(
            joinedload(Recipe.recipe_ingredients).joinedload(RecipeIngredient.ingredient),
            joinedload(Recipe.ratings)
        )
        .all()
    )
    return [{
        "id": recipe.id,
        "title": recipe.title,
        "description": recipe.description,
        "instructions": recipe.instructions,
        "image_url": recipe.image_url,
        "ratings": [r.score for r in recipe.ratings],
        "average_rating": round(
            sum(r.score for r in recipe.ratings) / len(recipe.ratings), 1
        ) if recipe.ratings else None,
        "ingredients": [
            {
                "name": ri.ingredient.name,
                "amount": ri.amount,
                "note": ri.note
            }
            for ri in recipe.recipe_ingredients
        ],
    } for recipe in data]

@router.post("/recipe/{recipe_id}/comment", status_code=201)
def add_comment(recipe_id: int, comment_data: CommentCreate, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # 댓글 저장
    comment = Comment(
        content=comment_data.content,
        user_id=comment_data.user_id,
        recipe_id=recipe_id
    )
    db.add(comment)
    db.flush()

    # 평점 저장
    rating = Rating(
        score=comment_data.rating,
        user_id=comment_data.user_id,
        recipe_id=recipe_id
    )
    db.add(rating)
    db.commit()

    return {"message": "Comment and rating submitted successfully"}
