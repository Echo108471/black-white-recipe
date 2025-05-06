import json
from sqlalchemy.orm import Session
from faker import Faker
import random

from .database import get_db, engine
from .models import Base, Recipe, Ingredient


# Ensure tables exist
Base.metadata.create_all(bind=engine)

file_path = "C:/Users/stephanie/Desktop/black-white-recipe/backend/app/tenRecipes.json"

def load_data_from_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def create_sample_data_from_json():
    db = next(get_db())  # Get a database session
    data = load_data_from_json(file_path)
    
    try:
        # Ensure ingredients exist
        existing_ingredients = {ing.name for ing in db.query(Ingredient).all()}
        new_ingredients = [Ingredient(name=name) for name in data["ingredients"] if name not in existing_ingredients]
        if new_ingredients:
            db.add_all(new_ingredients)
            db.commit()

        # Fetch all ingredients from the database
        ingredients_dict = {ing.name: ing for ing in db.query(Ingredient).all()}
        
        # Create recipes
        for recipe_data in data["recipes"]:
            recipe = Recipe(
                title=recipe_data["title"],
                description=recipe_data["description"],
                instructions=recipe_data["instructions"]
            )
            
            # Assign specified ingredients to the recipe
            recipe.ingredients = [ingredients_dict[name] for name in recipe_data["ingredients"] if name in ingredients_dict]
            db.add(recipe)
        
        db.commit()
        print(f"Added {len(data['recipes'])} recipes and {len(new_ingredients)} new ingredients to the database.")
    
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data_from_json()



# def create_sample_data(num_recipes=10, num_ingredients=20):
#     db = next(get_db())  # Get a database session
#     fake = Faker()

#     try:
#         # Ensure Ingredients table is not empty to avoid duplicates
#         if not db.query(Ingredient).first():
#             ingredient_names = {fake.word() for _ in range(num_ingredients)}
#             ingredients = [Ingredient(name=name) for name in ingredient_names]
#             db.add_all(ingredients)
#             db.commit()

#         # Retrieve ingredients from the database
#         ingredients = db.query(Ingredient).all()

#         # Create recipes
#         for _ in range(num_recipes):
#             recipe = Recipe(
#                 title=fake.sentence(nb_words=3),
#                 description=fake.paragraph(nb_sentences=3),
#                 instructions=fake.text(max_nb_chars=200)
#             )

#             # Assign random ingredients to the recipe
#             recipe.ingredients = random.sample(ingredients, k=random.randint(2, 5))
#             db.add(recipe)

#         db.commit()
#         print(f"Added {num_recipes} recipes and {num_ingredients} ingredients to the database.")

#     except Exception as e:
#         db.rollback()
#         print(f"Error: {e}")
    
#     finally:
#         db.close()

# if __name__ == "__main__":
#     create_sample_data()
