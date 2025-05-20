from sqlalchemy import (
    Column, Integer, String, Text, Float, ForeignKey, ARRAY, Boolean, Table
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    image_url = Column(String, nullable=True)

    comments = relationship('Comment', back_populates='user')
    ratings = relationship('Rating', back_populates='user')
    recipes = relationship('Recipe', back_populates='author')
    
class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredient"
    recipe_id = Column(Integer, ForeignKey("recipes.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), primary_key=True)
    amount = Column(String, nullable=True)
    note = Column(String, nullable=True)

    recipe = relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = relationship("Ingredient", back_populates="ingredient_recipes")

class Ingredient(Base):
    __tablename__ = 'ingredients'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    ingredient_recipes = relationship("RecipeIngredient", back_populates="ingredient", cascade="all, delete-orphan")


class Recipe(Base):
    __tablename__ = 'recipes'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    instructions = Column(Text)
    image_url = Column(String, nullable=True)
    serving_size = Column(String, nullable=True)
    time = Column(String, nullable=True)
    difficulty = Column(String, nullable=True)
    author_id = Column(Integer, ForeignKey('users.id'))

    author = relationship('User', back_populates='recipes')
    recipe_ingredients = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete-orphan")
    comments = relationship('Comment', back_populates='recipe')
    ratings = relationship('Rating', back_populates='recipe')
    recipe_ingredients = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete-orphan")



class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey('users.id'))
    recipe_id = Column(Integer, ForeignKey('recipes.id'))

    user = relationship('User', back_populates='comments')
    recipe = relationship('Recipe', back_populates='comments')

class Rating(Base):
    __tablename__ = 'ratings'
    id = Column(Integer, primary_key=True, index=True)
    score = Column(Float)
    user_id = Column(Integer, ForeignKey('users.id'))
    recipe_id = Column(Integer, ForeignKey('recipes.id'))

    user = relationship('User', back_populates='ratings')
    recipe = relationship('Recipe', back_populates='ratings')
    