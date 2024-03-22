import { questions } from "../questions";
import { fetch_all_datas } from "../util";

export default async function fetchAll() {
  let datas = await fetch_all_datas();
  return (
    <div>
      <h1>Fetch all successfully</h1>
      {questions.map((question) => {
        return (
          <div>
            <h2>{question.question}</h2>
            <h3>
              {"回答人数:"}
              {datas.counts[question.seq]}
            </h3>
            <h3>
              {"答对人数:"}
              {datas.rights[question.seq]}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
