import React from "react";
import "../styles/AddSteps.css";
import Plus from "../assets/plus.svg";

function AddSteps({ steps, setSteps }) {
  const addNewStep = () => {
    setSteps([...steps, { id: steps.length + 1, description: "", image: null }]);
  };

  const handleDescriptionChange = (id, value) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, description: value } : step
      )
    );
  };

  const handleImageUpload = (id, file) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, image: file } : step
      )
    );
  };

  return (
    <div className="addsteps-container">
      {steps.map((step) => (
        <div key={step.id} className="step-container">
          <h2>Step {step.id}</h2>
          <textarea
            value={step.description}
            onChange={(e) => handleDescriptionChange(step.id, e.target.value)}
            className="step-description"
            placeholder="e.g.) Remove the fat from the beef and cut it into appropriate sizes"
          />
          <input
            id={`file-upload-${step.id}`}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(step.id, e.target.files[0])}
            className="step-image-upload"
          />
          {step.image && <p>{step.image.name}</p>}
        </div>
      ))}

      <button onClick={addNewStep} className="add-step-btn">
        <img src={Plus} alt="Plus" />
        Add Step
      </button>
    </div>
  );
}

export default AddSteps;
