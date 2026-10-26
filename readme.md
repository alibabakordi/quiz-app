# Quiz App

A web-based quiz application with a live countdown timer, answer tracking, and a final score review.

## Live demo
👉 https://YOUR-USERNAME.github.io/quiz-app/

## Features
- Multiple-choice questions loaded from an external JSON file (`data/questions.json`)
- Countdown timer that automatically ends the quiz when it expires
- Previous / next navigation between questions
- Selected option is highlighted and restored when revisiting a question
- Final score with a full review: correct, wrong, and unanswered questions

## Tech
- HTML, CSS, vanilla JavaScript
- ES modules (`import` / `export`)
- `fetch` + `async` / `await` for loading data
- Questions stored as JSON data, fully separate from code

## Changing the quiz duration
The deadline is set as a constant in the code:

1. Open `quiz.js`
2. Find this line near the top:

```js
const QUIZ_MINUTES = 1;