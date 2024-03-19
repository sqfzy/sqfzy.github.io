// "use client";
// import { Inter } from "next/font/google";
// import "./globals.css";
//
// import * as React from "react";
// import { Button } from "@mui/material";
//
// export default function RadioButtonsGroup() {
//   return (
//     <button
//       onClick={() => {
//         alert("clicked");
//       }}
//     >
//       Click me
//     </button>
//   );
//   {
//     /* <Button */
//   }
//   {
//     /*   onClick={() => { */
//   }
//   {
//     /*     console.log("clicked"); */
//   }
//   {
//     /*     alert("clicked"); */
//   }
//   {
//     /*   }} */
//   }
//   {
//     /*   variant="contained" */
//   }
//   {
//     /* > */
//   }
//   {
//     /*   Click me */
//   }
//   {
//     /* </Button> */
//   }
// }
"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  function handleClick() {
    console.log("Clicked me!");
    alert("Clicked me!");
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>TESTE</div>
        <button onClick={handleClick}>Click me</button>
      </div>
    </main>
  );
}
