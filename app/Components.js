import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Question({ id, question, currQuestionId, children }) {
  let disabled = id > currQuestionId;
  return (
    <div>
      <Accordion disabled={disabled}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            {question}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
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

// @Params
// choices: 选项描述
// right_choice_num: 正确选项的序号
// onComplete: 选项选择完成后解锁下一个问题
export function Choices({ choices, right_choice_num, onComplete }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  let choicesValues = ["wrong0", "wrong1", "wrong2", "wrong3"];
  choicesValues[right_choice_num] = "right";

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "right") {
      setHelperText("You got it!");
      setError(false);
      onComplete();
    } else if (value.startsWith("wrong")) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        {/* <FormLabel id="demo-error-radios"></FormLabel> */}
        <RadioGroup name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel
            value={choicesValues[0]}
            control={<Radio />}
            label={choices[0]}
          />
          <FormControlLabel
            value={choicesValues[1]}
            control={<Radio />}
            label={choices[1]}
          />
          <FormControlLabel
            value={choicesValues[2]}
            control={<Radio />}
            label={choices[2]}
          />
          <FormControlLabel
            value={choicesValues[3]}
            control={<Radio />}
            label={choices[3]}
          />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
