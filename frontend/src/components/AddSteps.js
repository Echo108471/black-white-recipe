import React, { useState } from "react";
import "../styles/AddSteps.css"; 
import Plus from "../assets/plus.svg";


function AddSteps() {
    const [steps, setSteps] = useState([
        { id: 1, description: "", image: null }
    ]);

    const [finalImage, setFinalImage] = useState(null); // ✅ 최종 사진 저장할 상태 추가

    // ✅ 새로운 Step 추가
    const addNewStep = () => {
        setSteps([...steps, { id: steps.length + 1, description: "", image: null }]);
    };

    // ✅ 설명 입력
    const handleDescriptionChange = (id, value) => {
        setSteps(
            steps.map((step) =>
                step.id === id ? { ...step, description: value } : step
            )
        );
    };

    // ✅ 개별 Step 이미지 업로드
    const handleImageUpload = (id, file) => {
        setSteps(
            steps.map((step) =>
                step.id === id ? { ...step, image: file } : step
            )
        );
    };

    // ✅ 최종 사진 업로드
    const handleFinalImageUpload = (file) => {
        setFinalImage(file);
    };

        // 저장 버튼 클릭 시 데이터 출력 (나중에 API로 전송 가능)
        const handleSave = () => {
            console.log("🔹 Steps Saved:");
            steps.forEach((step) => {
                console.log(`Step ${step.id}: ${step.description}`);
                if (step.image) console.log(`Image: ${step.image.name}`);
            });
    
            if (finalImage) {
                console.log(`Final Image: ${finalImage.name}`);
            }
            alert("Recipe has been saved!");
        };
    
        // 취소 버튼 클릭 시 초기 상태로 리셋
        const handleCancel = () => {
            setSteps([{ id: 1, description: "", image: null }]); // 초기 상태로 복원
            setFinalImage(null); // 최종 사진 초기화
            alert("Changes have been canceled");
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
                        placeholder={"e.g.) Remove the fat from the beef and cut it into appropriate sizes"}
                    />
                    {/* <label htmlFor={`file-upload-${step.id}`} className="custom-file-upload1">
                        Upload Image
                    </label> */}
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
