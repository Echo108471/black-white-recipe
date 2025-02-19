from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from collections import Counter
from .database import get_db
from .models import Ingredient, Recipe, recipe_ingredient
from .filter import recipe_search_query

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
def search_recipe_endpoint(search_term: str, db: Session = Depends(get_db)):
    return recipe_search_query(db , search_term)



