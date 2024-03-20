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
  const key = `question_${questionSeq}`;
  const value = await kv.get(key);

  if (value) {
    await kv.put(key, parseInt(value) + 1);
  } else {
    await kv.put(key, 1);
  }
}

// 记录题目的答对人数
export async function recordAnswerRight(questionSeq) {
  const key = `question_${questionSeq}`;
  const value = await kv.get(key);

  if (value) {
    await kv.put(key, parseInt(value) + 1);
  } else {
    await kv.put(key, 1);
  }
}
