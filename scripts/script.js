const text = require("fs").readFileSync("data/questions.txt", "utf-8");

// 将文本按行分割
const lines = text.split("\n");

const questions = [];
let currentQuestion = {};
let id = 0;

lines.forEach((line) => {
  if (line.match(/^\d+\./)) {
    // 匹配问题开始
    // 如果当前问题对象不为空，则添加到问题数组中
    if (currentQuestion.question) {
      questions.push(currentQuestion);
    }
    // 开始新问题
    currentQuestion = {
      question: line.slice(4),
      choices: [],
      answer: "",
    };
  } else if (line.match(/^[A-D]\./)) {
    // 匹配选项
    currentQuestion.choices.push(line.slice(2));
  } else if (line.startsWith("答案：")) {
    // 匹配答案
    currentQuestion.answer = line.split("：")[1].trim();
  }
});

// 添加最后一个问题到数组中
if (currentQuestion.question) {
  questions.push(currentQuestion);
}

for (let i = 0; i < questions.length; i++) {
  questions[i].seq = i;
}

console.log(questions);

// 将questions对象数组转换为JSON字符串，如果需要
const json = JSON.stringify(questions, null, 2);
console.log(json);

let questionsStr = "export const questions = " + json + ";";
require("fs").writeFileSync("app/questions.js", questionsStr);
