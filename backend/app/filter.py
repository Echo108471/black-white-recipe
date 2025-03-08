from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Recipe, Ingredient, recipe_ingredient
from typing import List, Dict

def recipe_filter_query(db: Session, filter_terms: List[str]) -> List[Dict]:
    """
    Filters recipes based on how many of the given ingredients they contain.
    Returns full recipe details along with a match percentage.
    """

    filter_terms_lower = [term.lower() for term in filter_terms]

    # Get the ingredient IDs that match the filter terms
    matching_ingredient_ids = (
        db.query(Ingredient.id)
        .filter(func.lower(Ingredient.name).in_(filter_terms_lower))
        .subquery()
    )

    # Subquery to count total ingredients per recipe and correctly count matched ingredients
    recipe_subquery = (
        db.query(
            recipe_ingredient.c.recipe_id.label("recipe_id"),
            func.count(recipe_ingredient.c.ingredient_id).label("total_count"),
            func.count(func.distinct(recipe_ingredient.c.ingredient_id)).filter(
                recipe_ingredient.c.ingredient_id.in_(matching_ingredient_ids)
            ).label("match_count")
        )
        .group_by(recipe_ingredient.c.recipe_id)
        .subquery()
    )

    print(recipe_subquery.c.keys())  # Print column names for debugging


    # Main query to retrieve full recipe details
    query = (
        db.query(
            Recipe.id,
            Recipe.title,
            Recipe.description,
            Recipe.instructions,
            func.array_agg(Ingredient.name).label("ingredients"),
            recipe_subquery.c.match_count,
            recipe_subquery.c.total_count,
            (recipe_subquery.c.match_count * 100.0 / recipe_subquery.c.total_count).label("match_percentage")
        )
        .join(recipe_ingredient, Recipe.id == recipe_ingredient.c.recipe_id)
        .join(Ingredient, recipe_ingredient.c.ingredient_id == Ingredient.id)
        .join(recipe_subquery, Recipe.id == recipe_subquery.c.recipe_id)
        .filter(recipe_subquery.c.match_count > 0)  # At least one requested ingredient should match
        .group_by(Recipe.id, recipe_subquery.c.match_count, recipe_subquery.c.total_count)
        .order_by(recipe_subquery.c.match_count.desc())  # Sort by number of matched ingredients
    )

    print(str(query))  # Print SQL query for debugging

    data = query.all()

    if not data:
        raise HTTPException(status_code=404, detail="No matching recipes found.")

    # Convert to list of dictionaries
    return [
        {
            "recipe_id": row[0],
            "title": row[1],
            "description": row[2],
            "instructions": row[3],
            "ingredients": row[4],  # List of ingredient names
            "match_count": int(row[5]),  # Correct number of requested ingredients found in the recipe
            "total_ingredients": int(row[6]),  # Total ingredients required for the recipe
            "match_percentage": round(float(row[7]), 2)  # Percentage of requested ingredients present
        }
        for row in data
    ]
