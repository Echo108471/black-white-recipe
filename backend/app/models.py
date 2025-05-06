from sqlalchemy import (
    Column, Integer, String, Text, Float, ForeignKey, ARRAY, Boolean, Table
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


# Association table for many-to-many relationship between recipes and ingredients
recipe_ingredient = Table(
    'recipe_ingredient', Base.metadata,
    Column('recipe_id', Integer, ForeignKey('recipes.id')),
    Column('ingredient_id', Integer, ForeignKey('ingredients.id'))
)

# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     recipes = relationship('Recipe', back_populates='author')
#     comments = relationship('Comment', back_populates='user')
#     ratings = relationship('Rating', back_populates='user')

class Ingredient(Base):
    __tablename__ = 'ingredients'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    recipes = relationship('Recipe', secondary=recipe_ingredient, back_populates='ingredients')

class Recipe(Base):
    __tablename__ = 'recipes'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    instructions = Column(Text)
    image_url = Column(String, nullable=True)
    # author_id = Column(Integer, ForeignKey('users.id'))

    # author = relationship('User', back_populates='recipes')
    ingredients = relationship('Ingredient', secondary=recipe_ingredient, back_populates='recipes')
    # comments = relationship('Comment', back_populates='recipe')
    # ratings = relationship('Rating', back_populates='recipe')

# class Comment(Base):
#     __tablename__ = 'comments'
#     id = Column(Integer, primary_key=True, index=True)
#     content = Column(Text)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     recipe_id = Column(Integer, ForeignKey('recipes.id'))

#     user = relationship('User', back_populates='comments')
#     recipe = relationship('Recipe', back_populates='comments')

# class Rating(Base):
#     __tablename__ = 'ratings'
#     id = Column(Integer, primary_key=True, index=True)
#     score = Column(Float)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     recipe_id = Column(Integer, ForeignKey('recipes.id'))

#     user = relationship('User', back_populates='ratings')
#     recipe = relationship('Recipe', back_populates='ratings')
