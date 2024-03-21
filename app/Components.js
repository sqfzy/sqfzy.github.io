import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { recordAnswerCount, recordAnswerRight } from "./util";

export function Question({
  id,
  expanded_id,
  question,
  currQuestionId,
  children,
  onChance,
}) {
  const [answerContent, setAnswerContent] = React.useState("");

  const setAnswer = (content) => {
    setAnswerContent(content);
  };

  let enhancedChildren = React.cloneElement(children, {
    setAnswerContent: setAnswer,
  });

  const expandedStyle = {
    // backgroundColor: "#f0f0f0", // 选择一个突出的颜色
    borderRadius: "4px",
    margin: "8px 0",
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };
  const disabled = id > currQuestionId;

  // 如果当前问题是最后一个问题，将答对的数目存储到localStorage
  return (
    <div>
      <Accordion
        disabled={disabled}
        expanded={id === expanded_id}
        onChange={onChance}
        style={id === expanded_id ? expandedStyle : {}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Typography sx={{ width: "50%", flexShrink: 0, marginRight: 4 }}>
            {question}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {answerContent}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{enhancedChildren}</AccordionDetails>
      </Accordion>
    </div>
  );
}

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { BorderAll } from "@mui/icons-material";
import { maxQuestionsNum } from "./hard/page";
import { useRouter } from "next/navigation";

// @Params
// choices: 选项描述
// right_choice_num: 正确选项的序号
// bingo: 选项选择完成后解锁下一个问题
export function Choices({
  currQuestionId,
  seq,
  choices,
  answer,
  bingo,
  setAnswerContent,
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [basicAlert, setBasicAlert] = React.useState("info");
  const router = useRouter();

  useEffect(() => {
    if (currQuestionId === maxQuestionsNum || error) {
      localStorage.setItem("answerResult", currQuestionId);
      router.push("hard-answer-result");
    }
  }, [currQuestionId, error, router, maxQuestionsNum]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    // setIsAlert();
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    recordAnswerCount(seq).then();

    if (value === answer) {
      setBasicAlert("success");
      setError(false);

      recordAnswerRight(seq).then();

      if (value === "A") {
        setAnswerContent(choices[0]);
      }
      if (value === "B") {
        setAnswerContent(choices[1]);
      }
      if (value === "C") {
        setAnswerContent(choices[2]);
      }
      if (value === "D") {
        setAnswerContent(choices[3]);
      }

      setTimeout(() => {
        bingo();
      }, 500);
    } else if (value !== answer && value !== "") {
      setBasicAlert("error");
      setError(true);
    } else {
      setBasicAlert("warn");
    }
  };

  let alert = null;
  if (basicAlert === "error") {
    alert = <AlertError />;
  } else if (basicAlert === "warn") {
    alert = <AlertWarn />;
  } else if (basicAlert === "success") {
    alert = <AlertSuccess />;
  } else if (basicAlert === "info") {
    alert = <AlertInfo />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        {/* <FormLabel id="demo-error-radios"></FormLabel> */}
        <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel
            value={"A"}
            control={<Radio />}
            label={choices[0]}
          />
          <FormControlLabel
            value={"B"}
            control={<Radio />}
            label={choices[1]}
          />
          <FormControlLabel
            value={"C"}
            control={<Radio />}
            label={choices[2]}
          />
          <FormControlLabel
            value={"D"}
            control={<Radio />}
            label={choices[3]}
          />
        </RadioGroup>
        <FormHelperText>{alert}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          确认答案
        </Button>
      </FormControl>
    </form>
  );
}

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export function AlertSuccess() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      回答正确！ 👍
    </Alert>
  );
}

export function AlertInfo() {
  return (
    <Alert severity="info">每个人只有一次答题机会，请仔细思考答案哟 😊</Alert>
  );
}

export function AlertError() {
  return <Alert severity="error">很遗憾，回答错误 😢</Alert>;
}

export function AlertWarn() {
  return <Alert severity="warning">您必须选择一个答案 😐</Alert>;
}

export function SimpleQuestion({
  id,
  expanded_id,
  question,
  currQuestionId,
  children,
  onChance,
}) {
  const [answerContent, setAnswerContent] = React.useState("");

  const setAnswer = (content) => {
    setAnswerContent(content);
  };

  let enhancedChildren = React.cloneElement(children, {
    setAnswerContent: setAnswer,
  });

  const expandedStyle = {
    // backgroundColor: "#f0f0f0", // 选择一个突出的颜色
    borderRadius: "4px",
    margin: "8px 0",
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };

  // 如果当前问题是最后一个问题，将答对的数目存储到localStorage
  return (
    <div>
      <Accordion
        // disabled={disabled}
        expanded={id === expanded_id}
        onChange={onChance}
        style={id === expanded_id ? expandedStyle : {}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Typography sx={{ width: "50%", flexShrink: 0, marginRight: 4 }}>
            {question}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {answerContent}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{enhancedChildren}</AccordionDetails>
      </Accordion>
    </div>
  );
}

import { maxSimpleQuestionsNum } from "./simple/page";

export function SimpleChoices({
  currQuestionId,
  seq,
  choices,
  answer,
  bingo,
  rightCount,
  onCompleted,
  setAnswerContent,
}) {
  const [display, setDisplay] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [basicAlert, setBasicAlert] = React.useState("info");
  const router = useRouter();

  useEffect(() => {
    console.log("currQuestionId", currQuestionId);
    if (currQuestionId === maxSimpleQuestionsNum) {
      localStorage.setItem("answerRightResult", rightCount);
      router.push("simple-answer-result");
    }
  }, [currQuestionId, error, router, maxSimpleQuestionsNum]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    // setIsAlert();
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplay({ display: "none" });
    setIsSubmitted(true);
    onCompleted();

    recordAnswerCount(seq).then();

    if (value === answer) {
      setBasicAlert("success");
      setError(false);

      recordAnswerRight(seq).then();

      if (answer === "A") {
        setAnswerContent(choices[0]);
      }
      if (answer === "B") {
        setAnswerContent(choices[1]);
      }
      if (answer === "C") {
        setAnswerContent(choices[2]);
      }
      if (answer === "D") {
        setAnswerContent(choices[3]);
      }

      setTimeout(() => {
        bingo();
      }, 500);
    } else if (value !== answer && value !== "") {
      setBasicAlert("error");
      setError(true);

      if (answer === "A") {
        setAnswerContent(choices[0]);
      }
      if (answer === "B") {
        setAnswerContent(choices[1]);
      }
      if (answer === "C") {
        setAnswerContent(choices[2]);
      }
      if (answer === "D") {
        setAnswerContent(choices[3]);
      }
    } else {
      setBasicAlert("warn");
    }
  };

  let alert = null;
  if (basicAlert === "error") {
    alert = <AlertError />;
  } else if (basicAlert === "warn") {
    alert = <AlertWarn />;
  } else if (basicAlert === "success") {
    alert = <AlertSuccess />;
  } else if (basicAlert === "info") {
    alert = <AlertInfo />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        {/* <FormLabel id="demo-error-radios"></FormLabel> */}
        <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel
            value={"A"}
            control={<Radio disabled={isSubmitted} />}
            label={choices[0]}
          />
          <FormControlLabel
            value={"B"}
            control={<Radio disabled={isSubmitted} />}
            label={choices[1]}
          />
          <FormControlLabel
            value={"C"}
            control={<Radio disabled={isSubmitted} />}
            label={choices[2]}
          />
          <FormControlLabel
            value={"D"}
            control={<Radio disabled={isSubmitted} />}
            label={choices[3]}
          />
        </RadioGroup>
        <FormHelperText>{alert}</FormHelperText>
        <Button
          sx={{ mt: 1, mr: 1 }}
          type="submit"
          variant="outlined"
          style={display}
        >
          确认答案
        </Button>
      </FormControl>
    </form>
  );
}
