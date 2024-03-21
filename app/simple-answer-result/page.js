"use client";

import { Container } from "@mui/material";
import { maxSimpleQuestionsNum } from "../simple/page";

export default function AnswerResult() {
  let result = null;
  if (typeof window !== "undefined") {
    result = localStorage.getItem("answerRightResult");
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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export function BasicCard({ result }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" component="div" marginBottom={3}>
          您答对了 {result}/{maxSimpleQuestionsNum} 题
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h4" color="text.secondary">
          感谢你的参与！
        </Typography>
      </CardContent>
    </Card>
  );
}
