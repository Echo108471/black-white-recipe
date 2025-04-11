from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Recipe, Ingredient, recipe_ingredient
from typing import List, Dict

def recipe_filter_query(db: Session, filter_terms: List[str]) -> List[Dict]:
    """
    Returns all recipes and their ingredients. Filtering is handled on the frontend.
    """

    query = (
        db.query(
            Recipe.id,
            Recipe.title,
            Recipe.description,
            Recipe.instructions,
            func.array_agg(Ingredient.name).label("ingredients"),
        )
        .join(recipe_ingredient, Recipe.id == recipe_ingredient.c.recipe_id)
        .join(Ingredient, recipe_ingredient.c.ingredient_id == Ingredient.id)
        .group_by(Recipe.id)
    )

    data = query.all()

    if not data:
        raise HTTPException(status_code=404, detail="No matching recipes found.")

    return [
        {
            "recipe_id": row[0],
            "title": row[1],
            "description": row[2],
            "instructions": row[3],
            "ingredients": row[4],
        }
        for row in data
    ]
