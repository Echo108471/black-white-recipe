from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from collections import Counter
from .database import get_db
from .models import Ingredient, Recipe, recipe_ingredient

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
        "ingredients": [ingredient.name for ingredient in recipe.ingredients]
    } for recipe in data]
