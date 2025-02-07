from sqlalchemy.orm import Session
from faker import Faker
import random

from .database import get_db, engine
from .models import Base, Recipe, Ingredient

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def create_sample_data(num_recipes=10, num_ingredients=20):
    db = next(get_db())  # Get a database session
    fake = Faker()

    try:
        # Ensure Ingredients table is not empty to avoid duplicates
        if not db.query(Ingredient).first():
            ingredient_names = {fake.word() for _ in range(num_ingredients)}
            ingredients = [Ingredient(name=name) for name in ingredient_names]
            db.add_all(ingredients)
            db.commit()

        # Retrieve ingredients from the database
        ingredients = db.query(Ingredient).all()

        # Create recipes
        for _ in range(num_recipes):
            recipe = Recipe(
                title=fake.sentence(nb_words=3),
                description=fake.paragraph(nb_sentences=3),
                instructions=fake.text(max_nb_chars=200)
            )

            # Assign random ingredients to the recipe
            recipe.ingredients = random.sample(ingredients, k=random.randint(2, 5))
            db.add(recipe)

        db.commit()
        print(f"Added {num_recipes} recipes and {num_ingredients} ingredients to the database.")

    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
