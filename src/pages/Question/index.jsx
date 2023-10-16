import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/question.css";

const QuestionImages = require('../../assets/images/img_image1.png');
const UpperImage = require('../../assets/images/img_.png');

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState([]); // Use an array for multiple choices
  const [userResponses, setUserResponses] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Fetch questions from the API when the component mounts
    fetch("http://localhost:5000/questions")
      .then((response) => response.json())
      
      .then((data) => {
        setQuestions(data)
      console.log("Fetched questions:", data);
    })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === 4) {
      if (Object.keys(selectedChoice).length === 0) {
        // For question 5, require at least one choice to be selected
        alert("Please select at least one answer for question 5.");
        return;
      }
    }
    else if (selectedChoice.length === 0 && currentQuestionIndex !== 4) { // Ensure at least one choice for single-choice questions
      alert("Please select an answer.");
      return;
    }
    
    // Record the user's response for the current question
    const userResponse = {
      questionId: questions[currentQuestionIndex].id,
      selectedChoice:[selectedChoice],
      timeTaken: timer,
    };

   
    console.log("User Response for Question", questions[currentQuestionIndex].id, ":", userResponse);



    // Store the user response in the userResponses array
    const newUserResponses = [...userResponses];
  newUserResponses[currentQuestionIndex] = userResponse;

  // Update the userResponses state
  setUserResponses(newUserResponses);

    // Reset the selected choice and timer
    setSelectedChoice([userResponse]);
    setTimer(0);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // User has completed all questions, proceed to finish the test
      handleFinishTest();
    }
  };

  const handleFinishTest = () => {
    if (currentQuestionIndex === 4 && selectedChoice.length === 0) {
      // For question 5, require at least one choice to be selected
      alert("Please select at least one answer for question 5.");
      return;
    } 
    else if (selectedChoice.length === 0 && currentQuestionIndex !== 4) { // Ensure at least one choice for single-choice questions
      alert("Please select an answer.");
      return;
    }
    console.log("User Response for Question 5 :", userResponses);

    // Make an API request to finish the test and get the score report
    fetch("http://localhost:5000/score-report", {
      method: "POST", // Use the appropriate HTTP method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userResponses }),
    })
      .then((response) => response.json())
      .then((scoreReport) => {
        // Navigate to the score report screen and pass the score report data
        navigate("/score-report", { state: { scoreReport } });
      })
      .catch((error) => {
        console.error("Error finishing the test:", error);
        // Handle the error as needed
      });
  };

  const handleChoiceSelect = (choice) => {
    if (currentQuestionIndex === 4) {
      // For question 5, toggle the selected choice
      const updatedChoices = selectedChoice.includes(choice)
        ? selectedChoice.filter((item) => item !== choice)
        : [...selectedChoice, choice];
      setSelectedChoice(updatedChoices);
    } else {
      // For other questions, use a single choice
      setSelectedChoice([choice]);
    }
  };

  useEffect(() => {
    let interval;
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      interval = setInterval(
        () => setTimer((prevTimer) => prevTimer + 1),
        1000
      );
    }

    return () => clearInterval(interval);
  }, [currentQuestionIndex, questions]);

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h1>Quiz Completed</h1>
        {/* Display the user's responses */}
        <pre>{JSON.stringify(userResponses, null, 2)}</pre>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{
      marginLeft: 350,
      width: "750px",
      height: "1624px",
      background: "#AF9CF3",
      backgroundBlendMode: "multiply",
      position: "relative",
    }}>
      <div>
        <img style={{
          maxWidth: "100%",
          maxHeight: "100%",
          position: "relative",
          marginTop: "10%",
        }}
        src={UpperImage}
        alt={`Image for upper section `}
        />
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        alignItems: "center",
        justifyContent: "start",
        position: "absolute",
        left: "15%",
        top: "100px",
        right: "auto",
        bottom: "auto",
        margin: "auto",
        width: "68%",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          height: "250px",
          alignItems: "center",
          justifyContent: "start",
          padding: "4px",
          paddingTop: "10px",
          borderRadius: "50%",
          width: "245px",
          backgroundColor: "white",
          zIndex: 1,
          marginRight: "5px",
        }}>
          <div style={{
            background: `url('images/img_group13.svg') no-repeat`,
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            height: "140px",
            alignItems: "center",
            justifyContent: "start",
            padding: "42px",
            width: "140px",
            zIndex: 1,
          }}>
            <p style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: "bold",
              fontSize: "96px",
              textAlign: "center",
              color: "#000000",
            }}>
              <span style={{
                color: "#000000",
                fontFamily: "Nunito, sans-serif",
                fontStyle: "italic",
                fontWeight: "bold",
                bottom: "100px",
                position: "relative",
              }}>
                {currentQuestion.id}
              </span>
              <span style={{
                color: "gray",
                fontFamily: "Nunito, sans-serif",
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "32px",
                position: "absolute",
                bottom: "120px",
              }}>
                /5
              </span>
            </p>
          </div>
        </div>
      </div>
      <div style={{
        width: "750px",
        height: "1390px",
        top: "235px",
        borderRadius: "60px 60px 0px 0px",
        background: "white",
        position: "absolute",
      }}>
        <div style={{
          width: "670px",
          height: "168px",
          top: "70px",
          left: "40px",
          right: "40px",
          opacity: "0.8",
          position: "absolute",
        }}>
          <p style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "40px",
            fontWeight: "900",
            lineHeight: "56px",
            letterSpacing: "0px",
            textAlign: "left",
          }}>
            {currentQuestion.text}
          </p>
        </div>
        <div style={{ marginBottom: 0 }}>
          {currentQuestion.image && (
            <img style={{
              maxWidth: "100%",
              maxHeight: "100%",
              position: "relative",
              marginTop: "30%",
            }}
            src={QuestionImages}
            alt={`Image for question ${currentQuestion.id}`}
            />
          )}
        </div>
        <ul style={{ listStyle: "none", padding: 20 }}>
          {currentQuestion.options.map((option) => (
            <li key={option}>
              <label htmlFor={`checkbox_${option}`}>
                <input
                  type="checkbox"
                  id={`checkbox_${option}`}
                  name={`question_${currentQuestion.id}`}
                  value={option}
                  checked={selectedChoice.includes(option)}
                  onChange={() => handleChoiceSelect(option)}
                  style={{
                    display: "none",
                  }}
                />
                <div style={{
                  width: "670px",
                  height: "160px",
                  top: "250px",
                  left: "10px",
                  borderRadius: "40px",
                  fontFamily: "Nunito",
                  fontSize: "40px",
                  fontWeight: 900,
                  lineHeight: "56px",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#F3F4FA",
                  position: "relative",
                  border: `4px solid ${selectedChoice.includes(option) ? "#00FF00" : "transparent"}`,
                }}>
                  <div style={{
                    width: "513px",
                    height: "48px",
                    top: "61px",
                    left: "100px",
                    opacity: 0.8,
                  }}>
                    <p style={{
                      marginTop: "10px",
                      marginLeft: "40px",
                      fontFamily: "Nunito",
                      fontSize: "28px",
                      fontWeight: 600,
                      lineHeight: "45px",
                      letterSpacing: "0px",
                      textAlign: "left",
                    }}>
                      {option}
                    </p>
                  </div>
                </div>
                <div style={{
                  width: "48px",
                  height: "48px",
                  top: "150px",
                  left: "60px",
                  opacity: "0.08",
                  border: "4px solid #000000",
                  position: "relative",
                  borderRadius: "50%",
                  backgroundColor: selectedChoice.includes(option) ? "#00FF00" : "transparent",
                }}>
                  {selectedChoice.includes(option) && (
                    <div style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{
                        fontFamily: "Arial",
                        fontSize: "36px",
                        color: "white",
                      }}>
                        &#10003; {/* Display a checkmark */}
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </li>
          ))}
        </ul>
        <p style={{
          position: "relative",
          top: "210px",
          left: "70px",
          fontSize: "50px",
          bottom: "50px",
        }}>
          Time taken: {timer} seconds
        </p>
        <div style={{
          width: "670px",
          height: "160px",
          top: "1200px",
          left: "70px",
          marginTop: "210px",
          marginLeft: "25px",
        }}>
          <button style={{
            width: "630px",
            height: "120px",
            top: "20px",
            left: "40px",
            background: "#FF3B3F",
            border: "none",
            color: "white",
            fontSize: "36px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
          onClick={() => {
            if (currentQuestionIndex < questions.length - 1) {
              // Continue to the next question
              handleNextQuestion();
              navigate("/question");
            } else {
              // Finish the test and get the score report
              handleFinishTest();
            }
          }}>
          <div style={{
            width: "316px",
            height: "50px",
            top: "1500px",
            left: "435px",
            display: "flex",
            justifyContent: "space between",
            alignItems: "center",
            marginLeft: "180px",
          }}>
            <span style={{ justifyContent: "flex-start", position: "relative" }}>
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </span>
            <span style={{
              justifyContent: "flex-end",
              position: "relative",
              fontWeight: "bold",
              fontSize: "50px",
              marginLeft:"auto"
            }}>
              &rarr;
            </span>
          </div>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;