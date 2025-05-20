import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/RecipeDetail.css";
import Star from "../assets/star.svg";
import Person from "../assets/person.svg";
import Fire from "../assets/fire.svg";
import Clock from "../assets/clock.svg";
import RatingStar from "../assets/ratingstar.svg";
import EmptyStar from "../assets/emptystar.svg";



function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState("");
    const currentUserId = parseInt(localStorage.getItem("user_id"));
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        if (!currentUserId) {
          alert("⚠️ You must be logged in to comment.");
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:8000/recipe/${id}/comment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: newComment,
              rating: Number(newRating),
              user_id: currentUserId,
            }),
          });
    
          if (response.ok) {
            setNewComment("");
            setNewRating("");
            const updated = await fetch(`http://localhost:8000/recipe/${id}`).then(res => res.json());
            setRecipe(updated);
          } else {
            const error = await response.json();
            alert(`❌ Failed to comment: ${error.detail}`);
          }
        } catch (err) {
          console.error(err);
          alert("❌ Comment submission failed.");
        }
      };
      useEffect(() => {
        fetch(`http://localhost:8000/recipe/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch recipe");
            }
            return res.json();
          })
          .then((data) => {
            console.log("📦 Fetched recipe data:", data);
            setRecipe(data);
          })
          .catch((err) => console.error("Error fetching recipe:", err));
      }, [id]);
    
      if (!recipe) return <div>Loading...</div>;
    
      const ratings = recipe.ratings || [];
      const averageRating =
          ratings.length > 0
              ? (ratings.reduce((sum, score) => sum + score, 0) / ratings.length).toFixed(1)
              : "N/A";
  
      const totalStars = 5;
  
      const renderStars = (rating) => {
          const stars = [];
          const fullStars = Math.floor(rating);
          const hasHalfStar = rating - fullStars >= 0.5;
  
          for (let i = 0; i < fullStars; i++) {
              stars.push(<img key={`full-${i}`} src={Star} alt="Full Star" className="star-icon" />);
          }
  
          if (hasHalfStar) {
              stars.push(<img key="half" src={EmptyStar} alt="Half Star" className="star-icon" />);
          }
  
          while (stars.length < totalStars) {
              stars.push(<img key={`empty-${stars.length}`} src={EmptyStar} alt="Empty Star" className="star-icon" />);
          }
  
          return stars;
      };
      

  return (
    <div className="recipe-detail">
        <div className="title-detail">
        <h1>{recipe.title}</h1>
        <div className="stars">
          {averageRating !== "N/A" ? renderStars(Number(averageRating)) : "No ratings yet"}</div>

    </div>
    <img src={`http://localhost:8000${recipe.image_url}`} alt={recipe.title} className="main-image" />
    <div className="main">
        <div className="author-section">
            <img
                src={
                    recipe.author?.image_url
                    ? `http://localhost:8000${recipe.author.image_url}`
                    : "/default-profile.jpg"
                }
                alt="author"
                className="author-image"
            />
            <p>{recipe.author?.email || "Unknown author"}</p>
        </div>

        <div className="info-row">
            <div className="info-box">
                <img src={Person} alt="Servings" className="info-icon" />
                <span>Serves {recipe.serving_size}</span>
            </div>
            <div className="info-box">
                <img src={Clock} alt="Time" className="info-icon" />
                <span>Under {recipe.time} minutes</span>
            </div>
            <div className="info-box">
                <img src={Fire} alt="Difficulty" className="info-icon" />
                <span>{recipe.difficulty}</span>
            </div>
            <div className="info-box">
                <img src={RatingStar} alt="Rating" className="info-icon" />
                <span>{averageRating || "No ratings yet"}</span>
            </div>
        </div>
        <div className="blackline"></div>

        <h3>Ingredients ({recipe.ingredients.length})</h3>
        <ul>
        {recipe.ingredients.map((ing, idx) => (
        <li key={idx}>
            {ing.note && `${ing.note}`} {ing.name} 
        </li>
        ))}

        </ul>
    </div>
    <div className="main2">
        <h3>Recipe Instruction</h3>
        <ol>
            {recipe.instructions.split("\n\n").map((step, idx) => (
            <li key={idx}>{step}</li>
            ))}
        </ol>
        </div>
        <div className="comments">
            {/* ✅ 입력 폼 */}
            <form onSubmit={handleCommentSubmit}className="comment-form">
                <textarea
                className="comment-form1"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="We'd love to hear your thoughts on the recipe—leave a comment about the recipe! "
                required
                />
                <select className="comment-form2" value={newRating} onChange={(e) => setNewRating(e.target.value)} required>
                <option value="">⭐</option>
                {[1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>{val} ⭐</option>
                ))}
                </select>
                <button type="submit" className="submit-btn">Post</button>
            </form>
            {/* ✅ 댓글과 평점 출력 */}
            {recipe.comments?.length > 0 ? (
                recipe.comments.map((c, i) => (
                <div key={i} className="comment">
                    <strong>{c.user_email}</strong> — {<img src={Star} alt ="star" className="star"></img>} {c.rating || "N/A"}<br />
                    <p>{c.content}</p>
                </div>
                ))
            ) : (
                <p>No comments yet</p>
            )}
            </div>
</div>
);
}

export default RecipeDetail;
