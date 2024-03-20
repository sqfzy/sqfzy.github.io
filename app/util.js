import { GetStaticProps } from "next";

export function generateRandomNumbers(count, max) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max + 1));
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

// import { createClient } from "@vercel/kv";

// const kv = createClient({
//   // url: 'https://<hostname>.redis.vercel-storage.com',
//   url: "https://normal-mite-38893.upstash.io",
//   token:
//     "AZftASQgMWU0ZDc3M2EtMjZhZC00ZWIxLTlkOGQtNWI0OTQzNDM4ZmZhYTdlNDQ4YmNmMGZlNDcyMWExYjQ1ZmRhM2Q4NTQ3OWI=",
// });
//
// const REDIS_URL =
//   "redis://default:a7e448bcf0fe4721a1b45fda3d85479b@normal-mite-38893.upstash.io:38893";
// const REDIS_REST_API_URL = "https://normal-mite-38893.upstash.io";
// const REDIS_REST_API_TOKEN =
//   "AZftASQgMWU0ZDc3M2EtMjZhZC00ZWIxLTlkOGQtNWI0OTQzNDM4ZmZhYTdlNDQ4YmNmMGZlNDcyMWExYjQ1ZmRhM2Q4NTQ3OWI=";
// const REDIS_REST_API_READ_ONLY_TOKEN =
//   "ApftASQgMWU0ZDc3M2EtMjZhZC00ZWIxLTlkOGQtNWI0OTQzNDM4ZmZhhn8xOq1yULEpzJxq3rgA5ICpCCFn7A36vATUctQ_iQk=";

import { kv } from "@vercel/kv";

// 记录题目回答的人数
export async function recordAnswerCount(questionSeq) {
  const key = `question_${questionSeq}_answer_count`;
  const value = await kv.get(key);

  if (value) {
    await kv.set(key, parseInt(value) + 1);
    // console.log("set key", key, "value", parseInt(value) + 1);
  } else {
    await kv.set(key, 1);
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
  } else {
    await kv.set(key, 1);
  }

  // console.log("recordAnswerRight");
  // console.log("key", key);
  // console.log("value", value);
}

export async function refreshRecord() {
  // const keys = await kv.list();
  // for (const key of keys.keys) {
  await kv.delete("question_1_answer_count");
  // }
}
