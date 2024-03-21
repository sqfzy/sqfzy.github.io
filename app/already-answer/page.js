"use client";

import { Container } from "@mui/material";

export default function AnswerResult() {
  let result = null;
  if (typeof window !== "undefined") {
    result = localStorage.getItem("answerResult");
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BasicCard result={result} />
    </Container>
  );
}

import * as React from "react";
import Typography from "@mui/material/Typography";

export function BasicCard({ result }) {
  return (
    <Typography variant="h3" component="div" marginBottom={3}>
      感谢您参与此次问答！
    </Typography>
  );
}
