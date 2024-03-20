import { GetStaticProps } from "next";

export function generateRandomNumbers(count, max) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max + 1));
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

export const getStaticProps = async () => {
  const result = localStorage.getItem("answerResult");
  return result;

  return {
    props: {
      post,
    },
  };
};

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // 如果你使用React Router
//
// export default function Quiz() {
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     // 检查用户是否已答题
//     const hasAnswered = localStorage.getItem("answerResult");
//
//     if (answerResult) {
//       // 如果用户已答题，重定向到指定页面
//       navigate("/already-answered");
//     }
//   }, [navigate]);
//
//   const handleQuizCompletion = () => {
//     // 当用户完成答题后，设置localStorage
//     // TODO:
//     localStorage.setItem("answerResult", "10");
//     // 进行其他逻辑处理，如显示结果或重定向到其他页面
//   };
//
//   return (
//     <div>
//       {/* Quiz content */}
//       <button onClick={handleQuizCompletion}>Submit Answers</button>
//     </div>
//   );
// }
