from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from collections import Counter
from .database import get_db
from .models import Ingredient, Recipe, recipe_ingredient
from .filter import recipe_filter_query
from pydantic import BaseModel
from typing import List
from fastapi import UploadFile, File, Form
import shutil
import os
import json

class RecipeCreate(BaseModel):
    title: str
    description: str
    instructions: str
    ingredients: List[str]

router = APIRouter()


@router.get("/recipes")
def get_all_recipes(db: Session = Depends(get_db)):
    data = (
        db.query(Recipe)
        .options(joinedload(Recipe.ingredients))
        .all()
    )
    return [{
        "id": recipe.id,
        "title": recipe.title,
        "description": recipe.description,
        "instructions": recipe.instructions,
        "image_url": recipe.image_url,
        "ingredients": [ingredient.name for ingredient in recipe.ingredients]
    } for recipe in data]

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
    ingredients: str = Form(...),  # JSON string
    image: UploadFile = File(...),
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
        image_url=image_url
    )
    db.add(new_recipe)
    db.flush()

    # 재료 처리
    ingredient_names = json.loads(ingredients)
    ingredient_objects = []
    existing_ingredients = {ing.name: ing for ing in db.query(Ingredient).filter(Ingredient.name.in_(ingredient_names)).all()}

    for name in ingredient_names:
        ingredient = existing_ingredients.get(name)
        if not ingredient:
            ingredient = Ingredient(name=name)
            db.add(ingredient)
            db.flush()
        ingredient_objects.append(ingredient)

    new_recipe.ingredients.extend(ingredient_objects)
    db.commit()

    return {
        "id": new_recipe.id,
        "title": new_recipe.title,
        "description": new_recipe.description,
        "instructions": new_recipe.instructions,
        "image_url": new_recipe.image_url,
        "ingredients": [i.name for i in ingredient_objects]
    }