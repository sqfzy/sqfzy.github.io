export default async function getStaticProps(_context) {
  const questions = get_question();
  return {
    props: {
      questions,
    },
  };
}

function get_question() {
  let questions = require("fs").readFileSync("public/questions.json", "utf-8");
  return JSON.parse(questions);
}
