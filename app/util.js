import { GetStaticProps } from "next";

export function generateRandomNumbers(count, max) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max + 1));
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

import { kv } from "@vercel/kv";

// 记录题目回答的人数
export async function recordAnswerCount(questionSeq) {
  const key = `question_${questionSeq}_answer_count`;
  const value = await kv.get(key);

  if (value) {
    await kv.set(key, parseInt(value) + 1);
    console.log(key, "count:", parseInt(value) + 1);
  } else {
    await kv.set(key, 1);
    console.log(key, "count:", 1);
    // console.log("set key", key, "value", 1);
  }
  // console.log("recordAnswerCount");
  // console.log("key", key);
  // console.log("value", value);
}

// 记录题目的答对人数
export async function recordAnswerRight(questionSeq) {
  const key = `question_${questionSeq}_answer_right`;
  const value = await kv.get(key);

  if (value) {
    await kv.set(key, parseInt(value) + 1);
    console.log(key, "right count:", parseInt(value) + 1);
  } else {
    await kv.set(key, 1);
    console.log(key, "right count:", 1);
  }

  // console.log("recordAnswerRight");
  // console.log("key", key);
  // console.log("value", value);
}
