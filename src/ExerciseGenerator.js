import React, { useState } from 'react';
import Exercise from './Exercise';
import Countdown from './Countdown';
import { Button, TextField, Checkbox, FormControlLabel, Select, MenuItem, Grid } from '@mui/material';


const levelColors = {
    1: '#a8e6cf',
    '1-2': '#1de9b6',
    2: '#fff176',
    '2-2': '#ffd54f',
    3: '#64b5f6',
    4: '#42a5f5',
    5: '#7e57c2',
    'IR': 'linear-gradient(45deg, #0015ff 0%, #ff0073 99%, #a6ff00 100%)'
  };

function renderMathJax(text) {
    return '<span class="math-expression">\\(' + text + '\\)</span>';
}

 function generateExercises(level) {
        const container = document.getElementById('exercise-container');
        container.innerHTML = '';
        let numExercises = document.getElementById('num-exercises').value;
        numExercises = numExercises ? parseInt(numExercises) : 30;
        const exerciseType = document.getElementById('exercise-type').value;

        // Check if countdown should be used
        const useCountdown = document.getElementById('use-countdown').checked;
        if (useCountdown) {
            const countdownTime = document.getElementById('countdown-time').value || 300;
            startCountdown(countdownTime);
        } else {
            const countdownContainer = document.getElementById('countdown-container');
            countdownContainer.style.display = 'none';
        }
                // Start the countdown
        const countdownTime = document.getElementById('countdown-time').value || 300;
        startCountdown(countdownTime);

        for (let i = 0; i < numExercises; i++) {
            let exerciseObj = createExercise(level, exerciseType);
            let exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise';

            let exerciseTitle = document.createElement('h3');
            exerciseTitle.textContent = 'Exercise ' + (i + 1);
            exerciseDiv.appendChild(exerciseTitle);

            let questionP = document.createElement('p');
            questionP.innerHTML = '<strong>' + exerciseObj.questionText + ' </strong> ' + renderMathJax(exerciseObj.question);
            exerciseDiv.appendChild(questionP);

            let showAnswerBtn = document.createElement('button');
            showAnswerBtn.textContent = 'Show Answer';
            showAnswerBtn.className = 'show-answer-btn';
            showAnswerBtn.onclick = function() {
                answerDiv.style.display = 'block';
                MathJax.typeset([answerDiv]);
            };
            exerciseDiv.appendChild(showAnswerBtn);

            let answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.innerHTML = '<strong>Answer:</strong> ' + renderMathJax(exerciseObj.answer);
            exerciseDiv.appendChild(answerDiv);

            container.appendChild(exerciseDiv);
        }
        MathJax.typeset();
    }
function startCountdown(duration) {
const countdownContainer = document.getElementById('countdown-container');
const countdownElement = document.getElementById('countdown');

if (!document.getElementById('use-countdown').checked) {
    countdownContainer.style.display = 'none';
    return;
}

countdownContainer.style.display = 'block';
countdownElement.classList.remove('expired');
countdownElement.style.color = '#fff'; // Reset color

const countdownInterval = setInterval(function () {
    const minutes = parseInt(timer / 60, 10);
    const seconds = parseInt(timer % 60, 10);

    countdownElement.textContent = minutes + "m " + (seconds < 10 ? '0' + seconds : seconds) + "s";

    if (--timer < 0) {
        clearInterval(countdownInterval);
        countdownElement.classList.add('expired');
        countdownElement.textContent = "Time's up!";
        countdownElement.style.color = '#e74c3c';
        alert("Time's up!");
    }
}, 1000);
}


        // Function to count negative time
        function countNegative(element) {
            let negativeTime = 1;
            setInterval(function () {
                element.textContent = "-" + negativeTime + "s";
                negativeTime++;
            }, 1000);
        }
        function createExercise(level, exerciseType) {
            let exercise;
            if (level === 1) {
              exercise = level1();
            } else if (level === '1-2') {
              exercise = level1_2();
            } else if (level === '2-2') {
              exercise = level2_2();
            } else if (level === 'IR') {
              exercise = irExercises(exerciseType);
            } else {
              if (exerciseType === 'expand') {
                exercise = createExpansionExercise(level);
              } else if (exerciseType === 'factor') {
                exercise = createFactorizationExercise(level);
              } else {
                if (Math.random() < 0.5) {
                  exercise = createExpansionExercise(level);
                } else {
                  exercise = createFactorizationExercise(level);
                }
              }
            }
            exercise.questionText = 'Simplify:';
            return exercise;
          }
          
          


function irExercises(exerciseType) {
if (exerciseType === 'expand') {
    return irExpansion();
} else if (exerciseType === 'factor') {
    return irFactorization();
} else {
    return Math.random() < 0.5 ? irExpansion() : irFactorization();
}
}

function irExpansion() {
const identities = [
    { formula: '({a}{variable} + {b})^2', expansion: '{a2}{variable}^2 + {2ab}{variable} + {b2}' },
    { formula: '({a}{variable} - {b})^2', expansion: '{a2}{variable}^2 - {2ab}{variable} + {b2}' },
    { formula: '({a}{variable} + {b})({a}{variable} - {b})', expansion: '{a2}{variable}^2 - {b2}' }
];
const identity = identities[randInt(0, identities.length - 1)];
let a = randNonZeroInt(1, 5);
let b = randNonZeroInt(1, 5);
const variable = 'x';

const formula = identity.formula.replace(/{a}/g, a).replace(/{b}/g, b).replace(/{variable}/g, variable);
const expansion = identity.expansion
    .replace(/{a2}/g, a * a)
    .replace(/{2ab}/g, 2 * a * b)
    .replace(/{b2}/g, b * b)
    .replace(/{variable}/g, variable);

const question = formula;
const answer = expansion;
return { question, answer, questionText: 'Expand and simplify:' };
}

function irFactorization() {
const identities = [
    { expansion: '{a2}{variable}^2 + {2ab}{variable} + {b2}', formula: '({a}{variable} + {b})^2' },
    { expansion: '{a2}{variable}^2 - {2ab}{variable} + {b2}', formula: '({a}{variable} - {b})^2' },
    { expansion: '{a2}{variable}^2 - {b2}', formula: '({a}{variable} + {b})({a}{variable} - {b})' }
];
const identity = identities[randInt(0, identities.length - 1)];
let a = randNonZeroInt(1, 5);
let b = randNonZeroInt(1, 5);
const variable = 'x';

const expansion = identity.expansion
    .replace(/{a2}/g, a * a)
    .replace(/{2ab}/g, 2 * a * b)
    .replace(/{b2}/g, b * b)
    .replace(/{variable}/g, variable);

const formula = identity.formula.replace(/{a}/g, a).replace(/{b}/g, b).replace(/{variable}/g, variable);

const question = expansion;
const answer = formula;
return { question, answer, questionText: 'Factor:' };
}

// Helper functions for random number generation
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randNonZeroInt(min, max) {
    let num = 0;
    while (num === 0) {
        num = randInt(min, max);
    }
    return num;
}

// Level 1: Basic Operations with Negative Numbers
function level1() {
    const operations = ['+', '-', '×'];
    const op = operations[randInt(0, operations.length - 1)];
    let a = randInt(-10, 10);
    let b = randInt(-10, 10);

    if (op === '+') {
        const question = `  ${a} + (${b})`;
        const answer = `${a + b}`;
        return { question, answer };
    } else if (op === '-') {
        const question = `  ${a} - (${b})`;
        const answer = `${a - b}`;
        return { question, answer };
    } else {
        const question = `  (${a}) \\times (${b})`;
        const answer = `${a * b}`;
        return { question, answer };
    }
}

// Create Expansion Exercises
function createExpansionExercise(level) {
    switch(level) {
        case 2:
            return expansionLevel2();
        case 3:
            return expansionLevel3();
        case 4:
            return expansionLevel4();
        case 5:
            return expansionLevel5();
        default:
            return {};
    }
}

// Create Factorization Exercises
function createFactorizationExercise(level) {
    switch(level) {
        case 2:
            return factorizationLevel2();
        case 3:
            return factorizationLevel3();
        case 4:
            return factorizationLevel4();
        case 5:
            return factorizationLevel5();
        default:
            return {};
    }
}
// level 2_2
function level1_2() {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const a = randNonZeroInt(-10, 10);
    const b = randNonZeroInt(-10, 10);
    const variables = ['x', 'y', 'z'];
    const variable = variables[Math.floor(Math.random() * variables.length)];
  
    let question, answer;
  
    switch (operation) {
      case '+':
        question = `${a}${variable} + ${b}${variable}`;
        answer = `${a + b}${variable}`;
        break;
      case '-':
        question = `${a}${variable} - ${b}${variable}`;
        answer = `${a - b}${variable}`;
        break;
      case '×':
        question = `${a}${variable} × ${b}${variable}`;
        answer = `${a * b}${variable}^2`;
        break;
    }
  
    return { question, answer };
  }
  
  function level2_2() {
    const variables = ['x', 'y'];
    const numTerms = randInt(3, 5);
    let terms = [];
    let simplifiedTerms = {};
  
    for (let i = 0; i < numTerms; i++) {
      const coefficient = randNonZeroInt(-10, 10);
      const variable = variables[Math.floor(Math.random() * variables.length)];
      terms.push(`${coefficient}${variable}`);
      
      if (simplifiedTerms[variable]) {
        simplifiedTerms[variable] += coefficient;
      } else {
        simplifiedTerms[variable] = coefficient;
      }
    }
  
    const question = terms.join(' + ').replace(/\+ -/g, '- ');
    const answer = Object.entries(simplifiedTerms)
      .filter(([_, value]) => value !== 0)
      .map(([variable, coefficient]) => `${coefficient}${variable}`)
      .join(' + ')
      .replace(/\+ -/g, '- ')
      .replace(/^1([xy])/, '$1')
      .replace(/ 1([xy])/g, ' $1');
  
    return { question, answer };
  }
  
// Expansion Levels
function expansionLevel2() {
    let a = randNonZeroInt(-5, 5);
    let b = randInt(-10, 10);

    const variables = ['x', 'y'];
    const variable = variables[randInt(0, variables.length - 1)];

    const question = ` ${a}(${variable} ${b >= 0 ? '+' : ''} ${b})`;
    const term1 = `${a === 1 ? '' : a === -1 ? '-' : a}${variable}`;
    const term2 = a * b;
    const answer = `${term1} ${term2 >= 0 ? '+' : ''} ${term2}`;
    return { question, answer };
}

function expansionLevel3() {
    let b = randInt(-5, 5);
    let d = randInt(-5, 5);

    const variable = 'x';

    const question = ` (${variable} ${b >= 0 ? '+' : ''} ${b})(${variable} ${d >= 0 ? '+' : ''} ${d})`;
    const first = `${variable}^2`;
    const outer = `${b}${variable}`;
    const inner = `${d}${variable}`;
    const last = b * d;
    const middleCoeff = b + d;
    const answer = `${first} ${middleCoeff >= 0 ? '+' : ''} ${middleCoeff === 1 ? '' : middleCoeff === -1 ? '-' : middleCoeff}${variable} ${last >= 0 ? '+' : ''} ${last}`;
    return { question, answer };
}

function expansionLevel4() {
    let a = randNonZeroInt(-5, 5);
    let b = randInt(-5, 5);
    let c = randNonZeroInt(-5, 5);
    let d = randInt(-5, 5);

    const variable = 'x';

    const question = ` (${a}${variable} ${b >= 0 ? '+' : ''} ${b})(${c}${variable} ${d >= 0 ? '+' : ''} ${d})`;
    const first = a * c;
    const middleCoeff = a * d + b * c;
    const last = b * d;

    const firstTerm = `${first === 1 ? '' : first === -1 ? '-' : first}${variable}^2`;
    const middleTerm = `${middleCoeff >= 0 ? '+' : ''} ${middleCoeff === 1 ? '' : middleCoeff === -1 ? '-' : middleCoeff}${variable}`;
    const lastTerm = `${last >= 0 ? '+' : ''} ${last}`;
    const answer = `${firstTerm} ${middleTerm} ${lastTerm}`;
    return { question, answer };
}

function expansionLevel5() {
    let a = randNonZeroInt(-5, 5);
    let b = randInt(-10, 10);
    let c = randNonZeroInt(-5, 5);
    let d = randInt(-10, 10);

    const variable = 'x';

    const question = ` (${a}${variable} ${b >= 0 ? '+' : ''} ${b})(${c}${variable} ${d >= 0 ? '+' : ''} ${d})`;
    const first = a * c;
    const middleCoeff = a * d + b * c;
    const last = b * d;

    const firstTerm = `${first === 1 ? '' : first === -1 ? '-' : first}${variable}^2`;
    const middleTerm = `${middleCoeff >= 0 ? '+' : ''} ${middleCoeff === 1 ? '' : middleCoeff === -1 ? '-' : middleCoeff}${variable}`;
    const lastTerm = `${last >= 0 ? '+' : ''} ${last}`;
    const answer = `${firstTerm} ${middleTerm} ${lastTerm}`;
    return { question, answer };
}

// Factorization Levels
function factorizationLevel2() {
    let a = randNonZeroInt(2, 5);
    let b = randNonZeroInt(2, 5);
    let c = randNonZeroInt(2, 5);
    let variable = 'x';

    let term1 = a * b;
    let term2 = a * c;

    const question = `${term1}${variable} + ${term2}`;
    const answer = `${a}(${b}${variable} + ${c})`;
    return { question, answer };
}



function factorizationLevel3() {
// Factor expressions similar to your example B
let commonBinomial = `(${randNonZeroInt(1, 5)}x ${randInt(0, 1) ? '+' : '-'} ${randNonZeroInt(1, 5)})`;
let a = randNonZeroInt(1, 5);
let b = randNonZeroInt(1, 5);

const question = `${a}${commonBinomial} ${randInt(0, 1) ? '+' : '-'} ${b}${commonBinomial}`;
const answer = `(${a} ${randInt(0, 1) ? '+' : '-'} ${b})${commonBinomial}`;
return { question, answer };
}

function factorizationLevel4() {
// Factor by grouping
let a = randNonZeroInt(1, 5);
let b = randNonZeroInt(1, 5);
let c = randNonZeroInt(1, 5);
let variable = 'x';

const question = `${a}${variable}^2 + ${a * b}${variable} - ${c}${variable} - ${b * c}`;
const answer = `(${a}${variable} - ${c})(${variable} + ${b})`;
return { question, answer };
}

function factorizationLevel5() {
// Combine like terms and factor
let a = randNonZeroInt(1, 5);
let b = randNonZeroInt(1, 5);
let c = randNonZeroInt(1, 5);
let variable = 'x';

const question = `${a}${variable}^2 + ${b}${variable} + ${c} + ${a}${variable}^2 - ${b}${variable} - ${c}`;
const simplified = `${2 * a}${variable}^2`;
const answer = `${2 * a}${variable}^2`;
return { question, answer };
}

function ExerciseGenerator() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(30);
    const [useCountdown, setUseCountdown] = useState(true);
    const [countdownTime, setCountdownTime] = useState(300);
    const [exerciseType, setExerciseType] = useState('both');
    const [key, setKey] = useState(0); // Add this line
  
    const generateExercises = (level) => {
      const newExercises = [];
      for (let i = 0; i < numExercises; i++) {
        newExercises.push(createExercise(level, exerciseType));
      }
      setExercises(newExercises);
      setKey(prevKey => prevKey + 1); // Add this line
    };
  
    return (
        <div className="container">
          <h1>Math Exercises Generator</h1>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                value={numExercises}
                onChange={(e) => setNumExercises(Number(e.target.value))}
                label="Number of Exercises"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={<Checkbox checked={useCountdown} onChange={(e) => setUseCountdown(e.target.checked)} />}
                label="Use Countdown Timer"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                value={countdownTime}
                onChange={(e) => setCountdownTime(Number(e.target.value))}
                label="Countdown Time (seconds)"
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                label="Exercise Type"
              >
                <MenuItem value="both">Les deux</MenuItem>
                <MenuItem value="expand">Developpement</MenuItem>
                <MenuItem value="factor">Factorisation</MenuItem>
              </Select>
            </Grid>
          </Grid>
        <div className="level-buttons" style={{ marginTop: '20px' }}>
        {[1, '1-2', 2, '2-2', 3, 4, 5, 'IR'].map((level) => (
          <Button
            key={level}
            onClick={() => generateExercises(level)}
            variant="contained"
            style={{
              margin: '5px',
              background: levelColors[level],
              opacity: level === 'IR' ? 0.7 : 1,
            }}
          >
            Level {level}
          </Button>
        ))}
      </div>
      <div id="exercise-container">
        {exercises.map((exercise, index) => (
          <Exercise key={`${key}-${index}`} exercise={exercise} index={index} />
        ))}
      </div>
  
        {useCountdown && <Countdown initialTime={countdownTime} />}
  
        <div id="exercise-container">
          {exercises.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} index={index} />
          ))}
        </div>
  
        <Button onClick={() => window.print()}>Print Exercises</Button>
      </div>
    );
  }
  
  export default ExerciseGenerator;
  