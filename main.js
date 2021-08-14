function calculateNormal() {
  question = document.getElementsByClassName("question")[0];
  a = question.getElementsByClassName("a")[0].innerText;
  b = question.getElementsByClassName("b")[0].innerText;
  operator = question.getElementsByClassName("operator")[0].innerText;

  t_a = parseInt(a.replaceAll(",", ""));
  t_b = parseInt(b.replaceAll(",", ""));

  switch (operator) {
    case "+":
      return t_a + t_b;
    case "−":
      return t_a - t_b;
    case "×":
      return t_a * t_b;
    case "÷":
      return t_a / t_b;
  }
}

function calculateKatex() {
  expression = document.getElementsByTagName("annotation")[0].innerHTML;
  if (expression.startsWith("\\sqrt")) {
    start = expression.indexOf("{");
    number = parseInt(expression.substring(start + 1, expression.length - 1));
    return parseInt(Math.sqrt(number));
  } else if (expression.includes("^")) {
    e = expression.split("^");
    a = parseInt(e[0]);
    b = parseInt(e[1]);
    return Math.pow(a, b);
  }
}

function getQuestionType() {
  question = document.getElementsByClassName("question")[0];
  operator = question.getElementsByClassName("operator")[0];
  if (operator !== undefined) return "NORMAL";

  return "KATEX";
}

function typeResult() {
  questionType = getQuestionType();
  console.log(questionType);
  var result = "";

  switch (questionType) {
    case "NORMAL":
      result = calculateNormal();
      break;
    case "KATEX":
      result = calculateKatex();
      break;
  }

  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: result.toString() })
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var leveling = true;

async function levelUp() {
  while (leveling) {
    await sleep(2000);
    document.getElementsByClassName("start")[0].click();
    await sleep(2000);

    while (true) {
      progress = document.getElementsByClassName("progress");

      if (progress.length == 0) {
        break;
      }
      typeResult();
      await sleep(Math.random() * 2000 + 1000);
    }
  }
}

function stop() {
  leveling = false;
}
