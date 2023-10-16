import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "pages/NotFound";
const Result = React.lazy(() => import("pages/Result/"));


const Question = React.lazy(() => import("pages/Question"));
const Home1 = React.lazy(() => import("pages/Home1"));

const ProjectRoutes = ({handleStartQuiz}) => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="question" element={<Question />} />

          <Route path="score-report" element={<Result  handleStartQuiz={handleStartQuiz}/>} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default ProjectRoutes;
