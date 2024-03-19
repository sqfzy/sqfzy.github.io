"use client";

// import Image from "next/image";
// import styles from "./page.module.css";

import { React, useState } from "react";
import { Choices, Question } from "./Components";

export default function DisabledAccordion() {
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const questions = [
    {
      id: 0,
      question: "a question",
      choices: ["choice1", "choice2", "choice3", "choice4"],
    },
    {
      id: 1,
      question: "a question",
      choices: ["choice1", "choice2", "choice3", "choice4"],
    },
    {
      id: 2,
      question: "a question",
      choices: ["choice1", "choice2", "choice3", "choice4"],
    },
    // ...
  ];

  return (
    <div>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
            currQuestionId={currQuestionId}
          >
            <Choices
              choices={question.choices}
              right_choice_num={0}
              onComplete={() => {
                setCurrQuestionId(currQuestionId + 1);
              }}
            />
          </Question>
        );
      })}
    </div>
  );
}
