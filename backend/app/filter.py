from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from .models import Recipe, Ingredient, recipe_ingredient
from typing import List

def _assemble_recipes(data) -> List[dict]:
    """
    Assembles the list of recipes into a structured JSON format.
    """
    recipes_dict = {}
    
    for recipe, ingredient in data:
        if recipe.recipe_id not in recipes_dict:
            recipes_dict[recipe.recipe_id] = {
                "id": recipe.recipe_id,
                "title": recipe.title,
                "description": recipe.description,
                "instructions": recipe.instructions,
                "ingredients": []
            }
        recipes_dict[recipe.recipe_id]["ingredients"].append(ingredient.name)

    return list(recipes_dict.values())

def recipe_search_query(db: Session, search_terms: List[str]) -> List[dict]:
    """
    Searches for recipes that can be made using the given list of ingredients.
    A recipe is considered a match if all its required ingredients are in the provided list.
    """

    # Convert search terms to lowercase for case-insensitive search
    search_terms_lower = [term.lower() for term in search_terms]

    # Subquery to find matching recipes
    recipe_subquery = (
        db.query(
            Recipe.recipe_id,
            func.count(Ingredient.id).label("match_count")
        )
        .join(recipe_ingredient, Recipe.recipe_id == recipe_ingredient.recipe_id)
        .join(Ingredient, recipe_ingredient.ingredient_id == Ingredient.id)
        .filter(
            or_(
                Ingredient.name.ilike(f"%{term}%") for term in search_terms_lower
            )
        )
        .group_by(Recipe.recipe_id)
        .having(func.count(Ingredient.id) == 
                db.query(func.count(Ingredient.id))
                .filter(Ingredient.name.in_(search_terms_lower))
                .scalar_subquery())  # Ensures all required ingredients are in the provided list
        .subquery()
    )

    # Query to retrieve full recipe details
    query = (
        db.query(Recipe, Ingredient)
        .join(recipe_ingredient, Recipe.recipe_id == recipe_ingredient.recipe_id)
        .join(Ingredient, recipe_ingredient.ingredient_id == Ingredient.id)
        .join(recipe_subquery, Recipe.recipe_id == recipe_subquery.c.recipe_id)
        .order_by(recipe_subquery.c.match_count.desc())  # Prioritize recipes with most matches
    )

    data = query.all()
    if not data:
        raise HTTPException(status_code=404, detail="No matching recipes found.")

    return _assemble_recipes(data)
