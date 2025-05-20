from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Recipe, Ingredient, RecipeIngredient  
from typing import List, Dict

def recipe_filter_query(db: Session, filter_terms: List[str]) -> List[Dict]:
    # Get all recipes that include **all** of the filter_terms
    subquery = (
        db.query(RecipeIngredient.c.recipe_id)
        .join(Ingredient, RecipeIngredient.c.ingredient_id == Ingredient.id)
        .filter(Ingredient.name.in_(filter_terms))
        .group_by(RecipeIngredient.c.recipe_id)
        .having(func.count(Ingredient.id) == len(filter_terms))
        .subquery()
    )

    query = (
    db.query(
        Recipe.id,
        Recipe.title,
        Recipe.description,
        Recipe.instructions,
        Recipe.image_url,  # ✅ 요거 추가!
        func.array_agg(Ingredient.name).label("ingredients"),
    )
    .join(RecipeIngredient, Recipe.id == RecipeIngredient.c.recipe_id)
    .join(Ingredient, RecipeIngredient.c.ingredient_id == Ingredient.id)
    .group_by(Recipe.id)
    .having(func.array_agg(Ingredient.name).op("@>")(filter_terms))
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
            "image_url": row[4],
            "ingredients": row[5],
        }
        for row in data
    ]
