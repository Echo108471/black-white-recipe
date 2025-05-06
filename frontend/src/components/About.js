import React, { useState } from "react";
import "../styles/About.css";
import AboutHead from "../assets/abouthead.svg";
// import Black from "../assets/black.svg";
import AboutSearch from './AboutSearch.js';



function About() {

    return (
    <div className="AboutContainer">
        <img src={AboutHead} alt="About Head" className="AboutImg"/>
        <div className="AboutHead">
            <h1>About BnW Recipe</h1>
        </div>  
        <div className="AboutBody">
        <p><strong>Have you ever opened your fridge, spotted leftover ingredients, and had no idea what to cook?</strong> That’s where we come in. 
        <strong> Our mission</strong> is simple: help you turn what you already have into something delicious before it goes to waste.  
        <br></br><br></br>The name BnW Recipe reflects our philosophy. White symbolizes fresh ingredients, while black represents spoilage. We believe in cooking ingredients while they're still fresh before they turn black. Through this mindset, we aim to reduce food waste, one recipe at a time.
        <br></br><br></br>Unlike traditional recipe websites that ask you to shop for a long list of ingredients, we work in reverse. You tell us what you have — we tell you what you can make. It’s quick, practical, and surprisingly inspiring.
        <br></br><br></br>Join us in transforming how we cook, reduce waste, and make the most of every ingredient.
        </p>
        <h2>Let’s cook smart. Let’s cook sustainably.</h2>
        </div>
        <div className="AboutEnd">
            <h2>Giving leftover ingredients a second chance and reducing food waste, one meal at a time</h2>
            <p>Every year, tons of edible food are thrown away simply because we forget about what’s already in our fridge. At BnW Recipe, we believe that great meals don’t need fancy ingredients — just a little creativity and what you already have. By helping you cook with what’s on hand, we empower everyday people to reduce waste, save money, and discover unexpected flavor. Your fridge is full of stories waiting to be told — let’s start with what you have.</p>
            <AboutSearch />
        </div>
    </div>   
    );
}

export default About;
