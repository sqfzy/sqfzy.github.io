"use client";

import "../globals.css";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { Choices, Question } from "../Components";
import { questions } from "../questions";
import { generateRandomNumbers, recordAnswerCount } from "../util";
import { useRouter } from "next/navigation";

export const maxQuestionsNum = 20;

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    useEffect(() => {
      // 检查用户是否已答题
      const answerResult = localStorage.getItem("answerResult");

      if (answerResult) {
        // 如果用户已答题，重定向到指定页面
        router.push("hard-already-answer");
      }
    }, [router]);
  }

  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (id) => (_event, newExpanded) => {
    setExpanded(newExpanded ? id : false);
  };

  useEffect(() => {
    // 仅在首次渲染时生成随机问题列表
    if (randomQuestions.length === 0) {
      const randomNums = generateRandomNumbers(
        maxQuestionsNum,
        questions.length - 1,
      );
      const initializedRandomQuestions = randomNums.map((num, index) => ({
        ...questions[num],
        id: index, // 直接在映射过程中设置新的 id
      }));
      setRandomQuestions(initializedRandomQuestions);
    }
  }, [randomQuestions]);

  randomQuestions.map((question) => {
    console.log(question);
  });

  return (
    <div className={styles.center}>
      <div style={{ width: 1200 }}>
        {randomQuestions.map((question) => (
          <Question
            key={question.id}
            id={question.id}
            expanded_id={expanded}
            question={question.question}
            currQuestionId={currQuestionId}
            onChance={handleChange(question.id)}
          >
            <Choices
              currQuestionId={currQuestionId}
              seq={question.seq}
              choices={question.choices}
              answer={question.answer}
              bingo={() => {
                setExpanded((prevId) => prevId + 1);
                setCurrQuestionId((prevId) => prevId + 1);
              }}
            />
          </Question>
        ))}
      </div>
    </div>
  );
}
