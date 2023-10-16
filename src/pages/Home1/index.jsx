import React ,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import { Img } from "components";



const Home1Page = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [userAnswers, setUserAnswers] = useState({});

  const fetchQuestions = () => {
    fetch("http://localhost:5000/questions")
      .then((response) => response.json())
      .then((data) => {
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setQuestions(data);
          console.log(data);
          // navigate("/question");
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Set isMounted to true when the component mounts
    setIsMounted(true);

    // Clean up the component when it unmounts
    return () => {
      setIsMounted(false);
    };
  }, []);



  const handleStartQuiz = () => {
    // Fetch the questions when the "Start" button is clicked
   fetchQuestions()
   navigate(`/score-report?userAnswers=${JSON.stringify(userAnswers)}`);
  };


  return (
    <div
      style={{
        width: "750px",
        height: "1624px",
        background:
          "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
        backgroundBlendMode: "multiply",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "200px",
          
        }}
      >
        <div
          style={{
            width: "291px",
            height: "70px",
            top: "40px",
            left: "230px",
            marginTop: '200px',
          }}
        >
          <Img className="h-20" src="images/img_frame.svg" alt="frame" />
        </div>
      </div>
      <div
        style={{
          marginTop: "50px", // Add margin between the two divs
          display: "flex",
          flexDirection: "column",
         
         
        }}
      >
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
            marginTop: "200px",
            
          }}
        >
          <text
            style={{
              width: "215px",
              height: "94px",
              top: "47px",
              left: "0",
              fontFamily: "Poppins",
              fontSize: "80px",
              fontWeight: 800,
              lineHeight: "90px",
              letterSpacing: "0px",
              textAlign: "center",
              background: "#FFFFF",
              color: "#FF3B3C",
            }}
          >
            Quiz
          </text>
        </div>
      </div>
      <div
        style={{
          width: "670px",
          height: "160px",
          top: "1200px",
          left: "50px",
          marginTop: '200px',
          marginLeft:25,
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
          onClick={() => {
            handleStartQuiz()
            navigate("/question")}}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home1Page;
