import { flush } from "../util";

export default async function handler(req, res) {
  await flush();
  return (
    <div>
      <h1>Flush successfully</h1>
    </div>
  );
}
