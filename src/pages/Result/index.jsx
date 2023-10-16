import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Img } from "components";
import "../../styles/question.css";
import fullcircle from "../../assets/images/img_group3.svg";
import semicircle from "../../assets/images/img_group5.svg";
import indicator from "../../assets/images/img__gray_900_01.svg";

const UpperImage = require("../../assets/images/img_.png");
const ResultImgie = require("../../assets/images/img_3_240x480.png");

const ResultPage = () => {
  const navigate = useNavigate();

  

  const correctAnswers = {
    1: { selectedChoice: { "Paris": "Paris" } },
    2: { selectedChoice: { "Jupiter": "Jupiter" } },
    3: { selectedChoice: { "Carbon Dioxide": "Carbon Dioxide" } },
    4: { selectedChoice: { "Personal feeling": "Personal feeling" } },
    5: {
      selectedChoice: {
        "Make a questionary": "Make a questionary",
        "Personal feeling": "Personal feeling",
      },
    },
  };
  
  const location = useLocation();
  const userResponses = location.state && location.state.userResponses;

  

  function calculateScore(userResponses, correctAnswers) {
    if (!userResponses || !correctAnswers) {
      // Handle the case where userResponses or correctAnswers is not defined.
      return 0; // Or another suitable default value.
    }

    let score = 0;

    for (const questionId in userResponses) {
      if (userResponses.hasOwnProperty(questionId)) {
        const userResponse = userResponses[questionId];
        const correctAnswer = correctAnswers[questionId];

        if (userResponse && correctAnswer) {
          
          if (
            arraysEqual(
              userResponse.selectedChoice,
              correctAnswer.selectedChoice
            )
          ) {
            score++; // Increment the score for each correct answer
          }
        }
      }
    }

    return score;
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const handleButtonClick = () => {
    navigate("/");
  };

  if (
    userResponses &&
    Object.keys(correctAnswers).length === userResponses.length
  ) {
    const score = calculateScore(userResponses, correctAnswers);
    console.log("Score:", score);
  } else {
    console.log("Invalid data or data mismatch.");
  }

  return (
    <div
      style={{
        marginLeft: 350,
        width: "750px",
        height: "1624px",
        background: "#AF9CF3",
        backgroundBlendMode: "multiply",
        position: "relative",
      }}
    >
      <div>
        <Img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            position: "relative",
            marginTop: "10%",
          }}
          src={UpperImage}
          alt="Image for upper section"
        />
        <div
          style={{
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
          }}
        ></div>
        <div
          style={{
            width: "750px",
            height: "1390px",
            top: "235px",
            borderRadius: "60px 60px 0px 0px",
            background: "white",
            position: "absolute",
          }}
        >
          <div
            style={{
              width: "670px",
              height: "168px",
              top: "70px",
              left: "40px",
              right: "40px",
              opacity: "0.8",
              position: "absolute",
            }}
          >
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: "40px",
                fontWeight: "900",
                lineHeight: "56px",
                letterSpacing: "0px",
                textAlign: "center",
              }}
            >
              Your result
            </p>
          </div>

          <div style={{ marginBottom: 0, position: "relative" }}>
            <Img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                marginTop: "30%",
                position: "relative",
              }}
              src={ResultImgie}
              alt="result image"
            />
            <Img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                left: "3%",
                top: "30%",
                width: "94%",
                height: "100%",
              }}
              src={semicircle}
              alt="semi-circle"
            />
            <Img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                left: "17%",
                top: "52%",
                width: "65%",
                zIndex: 1,
              }}
              src={fullcircle}
              alt="full-circle"
            />

            <Img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                left: "45%",
                top: "42%",
                width: "10%",
              }}
              src={indicator}
              alt="indicator"
            />

            <div
              style={{
                width: "432px",
                height: "396px",
                top: "416px",
                left: "159px",
                boxShadow: "0px 8px 8px 0px #0000001A",
                background: "#FFFFFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "absolute",
                top: "55%",
                color: "black",
                backgroundColor: "red",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  fontSize: "50px",
                }}
              >
                {calculateScore(userResponses, correctAnswers)}/5
              </p>
            </div>
          </div>
          <div
            style={{
              width: "670px",
              height: "130px",
              opacity: 0.12,
              background: "#44B77B",
              marginTop: "40%",
              display: "flex",
              alignItems: "center",
              borderRadius: "30px",
              marginLeft: "40px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "blue",
                borderRadius: "50%",
                marginRight: "50px",
                marginLeft: "50px",
              }}
            ></div>
            <p
              style={{
                width: "199.26px",
                height: "28px",
                top: "51px",
                left: "126px",
                opacity: 0.5,
                fontFamily: "Source Sans Pro",
                fontSize: "50px",
                fontWeight: 600,
                lineHeight: "34px",
                letterSpacing: "0px",
                textAlign: "left",
                color: "black",
              }}
            >
              Correct
            </p>
          </div>

          <div
            style={{
              width: "670px",
              height: "130px",
              opacity: 0.12,
              background: "#FF3B3F",
              marginTop: "10%",
              display: "flex",
              alignItems: "center",
              borderRadius: "30px",
              marginLeft: "40px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "black",
                borderRadius: "50%",
                marginRight: "50px",
                marginLeft: "50px",
              }}
            ></div>
            <p
              style={{
                width: "199.26px",
                height: "28px",
                left: "126px",
                opacity: 0.5,
                fontFamily: "Source Sans Pro",
                fontSize: "50px",
                fontWeight: 600,
                lineHeight: "34px",
                textAlign: "left",
                color: "black",
              }}
            >
              InCorrect
            </p>
          </div>
          <div
            style={{
              width: "670px",
              height: "160px",
              top: "1200px",
              left: "50px",
              marginTop: "200px",
              marginLeft: 25,
            }}
          >
            <button
              style={{
                width: "630px",
                height: "120px",
                top: "20px",
                left: "20px",
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
              onClick={handleButtonClick}
            >
              Start Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
