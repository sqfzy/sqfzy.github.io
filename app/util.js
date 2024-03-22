import { GetStaticProps } from "next";

export function generateRandomNumbers(count, max) {
  if (count > max + 1) {
    throw new Error("Requested more numbers than are available in the range.");
  }

  const randomNumbers = new Set();

  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max + 1));
    randomNumbers.add(randomNumber);
  }

  return Array.from(randomNumbers);
}

// import { kv } from "@vercel/kv";

import { createClient } from "@vercel/kv";

const kv = createClient({
  // url: 'https://<hostname>.redis.vercel-storage.com',
  url: "https://normal-mite-38893.upstash.io",
  token:
    "AZftASQgMWU0ZDc3M2EtMjZhZC00ZWIxLTlkOGQtNWI0OTQzNDM4ZmZhYTdlNDQ4YmNmMGZlNDcyMWExYjQ1ZmRhM2Q4NTQ3OWI=",
});

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

import { questionNum } from "./page";

// BUG:
export async function flush() {
  for (let seq = 0; seq < 1; seq++) {
    await kv.set(`question_${seq}_answer_count`, 0);
    await kv.set(`question_${seq}_answer_right`, 0);
  }
}

export async function fetch_all_datas() {
  let counts = [];
  let rights = [];
  for (let seq = 0; seq < 5; seq++) {
    // const count = await kv.get(`question_${seq}_answer_count`);
    // const right = await kv.get(`question_${seq}_answer_right`);
    counts.push(await kv.get(`question_${seq}_answer_count`));
    rights.push(await kv.get(`question_${seq}_answer_right`));
  }
  return {
    counts,
    rights,
  };
}
