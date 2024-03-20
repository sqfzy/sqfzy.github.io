"use client";

import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { maxQuestionsNum } from "../page";

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
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export function BasicCard({ result }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" component="div" marginBottom={3}>
          您答对了 {result}/{maxQuestionsNum} 题
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h4" color="text.secondary">
          感谢你的参与！
        </Typography>
      </CardContent>
    </Card>
  );
}
