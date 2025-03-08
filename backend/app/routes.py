from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from collections import Counter
from .database import get_db
from .models import Ingredient, Recipe, recipe_ingredient
from .filter import recipe_filter_query
from pydantic import BaseModel
from typing import List




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

    return recipe_filter_query(db, filter_terms_list)

@router.post("/create_recipes", status_code=201)
def create_recipe(recipe_data: RecipeCreate, db: Session = Depends(get_db)):
    """
    Adds a new recipe to the database.
    """
    # Check if a recipe with the same title already exists
    existing_recipe = db.query(Recipe).filter(Recipe.title == recipe_data.title).first()
    if existing_recipe:
        raise HTTPException(status_code=400, detail="A recipe with this title already exists.")

    # Create new recipe instance
    new_recipe = Recipe(
        title=recipe_data.title,
        description=recipe_data.description,
        instructions=recipe_data.instructions
    )
    db.add(new_recipe)
    db.flush()  # Ensures new_recipe.id is available before proceeding

    # Ensure ingredients exist and link them
    ingredient_objects = []
    existing_ingredients = {ing.name: ing for ing in db.query(Ingredient).filter(Ingredient.name.in_(recipe_data.ingredients)).all()}
    
    for ingredient_name in recipe_data.ingredients:
        if ingredient_name in existing_ingredients:
            ingredient = existing_ingredients[ingredient_name]
        else:
            ingredient = Ingredient(name=ingredient_name)
            db.add(ingredient)
            db.flush()  # Ensures ingredient.id is assigned
        ingredient_objects.append(ingredient)

    # Link ingredients to the recipe
    new_recipe.ingredients.extend(ingredient_objects)

    # Commit the transaction
    db.commit()

    return {
        "id": new_recipe.id,
        "title": new_recipe.title,
        "description": new_recipe.description,
        "instructions": new_recipe.instructions,
        "ingredients": [ingredient.name for ingredient in ingredient_objects]
    }