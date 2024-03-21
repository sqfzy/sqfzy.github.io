"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // if (typeof window !== "undefined") {
  //   React.useEffect(() => {
  //     // 检查用户是否已答题
  //     const answerResult = localStorage.getItem("answerResult");
  //
  //     if (answerResult) {
  //       // 如果用户已答题，重定向到指定页面
  //       router.push("answer-result");
  //     }
  //   }, [router]);
  // }

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
      <GroupOrientation />
    </Container>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export function GroupOrientation() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        <Button
          key="simple"
          style={{ width: "350px", height: "200px", fontSize: "30px" }}
          onClick={() => {
            router.push("simple");
          }}
        >
          问卷模式
        </Button>
        <Button
          key="hard"
          style={{ width: "350px", height: "200px", fontSize: "30px" }}
          onClick={() => {
            router.push("hard");
          }}
        >
          闯关模式
        </Button>
      </ButtonGroup>
    </Box>
  );
}
