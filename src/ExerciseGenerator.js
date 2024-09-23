import React, { useState, useCallback } from 'react';
import Exercise from './Exercise';
import Countdown from './Countdown';
import { Button, TextField, Checkbox, FormControlLabel, Select, MenuItem, Grid , Card, CardContent} from '@mui/material';
import QuizCard from './QuizCard';
import Quiz from './Quiz';


 


const levelColors = {
    1: '#d8ebff',
    '1-2': '#d3e8ff',
    2: '#89c4ff',
    '2-2': '#7dbeff',
    3: '#0080ff',
    4: '#004589',
    5: '#001e3b',
    'IR': 'linear-gradient(45deg, #0015ff 0%, #ff0073 99%, #a6ff00 100%)'
  };
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




  function createExercise(level, exerciseType) {
    let exercise;
    let questionText = '';
  
    if (level === 1 || level === '1-2' || level === '2-2') {
      exercise = level === 1 ? level1() : level === '1-2' ? level1_2() : level2_2();
      questionText = 'Simplifier:';
    } else if (level === 'IR') {
      exercise = irExercises(exerciseType);
      questionText = exercise.questionText;
    } else {
      if (exerciseType === 'expand' || (exerciseType === 'both' && Math.random() < 0.5)) {
        exercise = createExpansionExercise(level);
        questionText = 'Développer et simplifier:';
      } else {
        exercise = createFactorizationExercise(level);
        questionText = 'Factoriser:';
      }
    }
  
    return { ...exercise, questionText };
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
return { question, answer, questionText: 'Développer puis simplifier:' };
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
  const term1 = formatTerm(a, variable);
  const term2Value = a * b;
  const term2 = term2Value >= 0 ? `+ ${term2Value}` : `- ${Math.abs(term2Value)}`;
  const answer = `${term1} ${term2}`;
  return { question, answer };
}


function expansionLevel3() {
  let b = randInt(-5, 5);
  let d = randInt(-5, 5);
  const variable = 'x';

  const question = `(${variable} ${b >= 0 ? '+' : ''} ${b})(${variable} ${d >= 0 ? '+' : ''} ${d})`;

  // Calculate coefficients
  const firstCoeff = 1; // Coefficient of x^2 term
  const middleCoeff = b + d;
  const lastCoeff = b * d;

  // Build answer string
  let answer = `${variable}^2`;

  if (middleCoeff !== 0) {
      answer += ` ${middleCoeff > 0 ? '+' : '-'} ${Math.abs(middleCoeff)}${variable}`;
  }

  if (lastCoeff !== 0) {
      answer += ` ${lastCoeff > 0 ? '+' : '-'} ${Math.abs(lastCoeff)}`;
  }

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
  let a = randNonZeroInt(2, 10);
  let b = randNonZeroInt(2, 10);
  let c = randNonZeroInt(2, 10);
  let variable = 'x';

  let gcd = greatestCommonDivisor(a * b, a * c);

  const term1 = a * b;
  const term2 = a * c;

  const question = `${term1}${variable} + ${term2}`;
  const factorOut = gcd;
  const insideParenthesis = `${(term1 / gcd)}${variable} + ${(term2 / gcd)}`;

  const answer = `${factorOut}(${insideParenthesis})`;
  return { question, answer };
}


function greatestCommonDivisor(a, b) {
  if (!b) return a;
  return greatestCommonDivisor(b, a % b);
}


function factorizationLevel3() {
  let a = randNonZeroInt(1, 5);
  let b = randNonZeroInt(1, 5);
  let c = randNonZeroInt(1, 5);
  let d = randNonZeroInt(1, 5);
  let variable = 'x';

  // Correctly construct terms as strings
  const term1 = `${a * c}${variable}^2`;
  const term2 = `${a * d}${variable}`;
  const term3 = `${b * c}${variable}`;
  const term4 = `${b * d}`;

  const expression = `${term1} + ${term2} + ${term3} + ${term4}`;

  // You can implement factorization steps here if needed

  const question = expression;
  const answer = `(${a * c}${variable} + ${b * d})(${variable} + 1)`; // Example answer

  return { question, answer };
}

function formatTerm(coefficient, variable = '', exponent = '') {
  if (isNaN(coefficient)) {
    console.error('Invalid coefficient:', coefficient);
    coefficient = 1; // Default to 1 if coefficient is NaN
  }

  let coeffStr = '';

  if (coefficient === 1 && variable) {
    coeffStr = '';
  } else if (coefficient === -1 && variable) {
    coeffStr = '-';
  } else {
    coeffStr = coefficient.toString();
  }

  let varStr = variable;
  if (exponent && exponent !== '1') {
    varStr += `^${exponent}`;
  }

  return `${coeffStr}${varStr}`;
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
  const [useCountdown, setUseCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(300);
  const [exerciseType, setExerciseType] = useState('both');
  const [key, setKey] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState(null);

  const generateExercises = useCallback((level) => {
    const newExercises = [];
    for (let i = 0; i < numExercises; i++) {
      newExercises.push(createExercise(level, exerciseType));
    }
    setExercises(newExercises);
    setKey(prevKey => prevKey + 1);
  }, [numExercises, exerciseType]);
 const handleStartQuiz = (difficulty) => {
    setQuizDifficulty(difficulty);
    setShowQuiz(true);
  };

  const handleFinishQuiz = () => {
    setShowQuiz(false);
    setQuizDifficulty(null);
  };
  return (
    <div className="container">
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#f0f4f8' }}>
        <CardContent>
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
                control={
                  <Checkbox
                    checked={useCountdown}
                    onChange={(e) => setUseCountdown(e.target.checked)}
                  />
                }
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
                <MenuItem value="expand">Développement</MenuItem>
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
          {useCountdown && <Countdown initialTime={countdownTime} />}
          <div id="exercise-container">
            {exercises.map((exercise, index) => (
              <Exercise key={`${key}-${index}`} exercise={exercise} index={index} />
            ))}
          </div>
          <Button onClick={() => window.print()}>Print Exercises</Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, p: 2, backgroundColor: '#e6f7ff' }}>
        <CardContent>
          {!showQuiz ? (
            <QuizCard onStartQuiz={handleStartQuiz} />
          ) : (
            <Quiz difficulty={quizDifficulty} onFinish={handleFinishQuiz} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ExerciseGenerator;
export { createExpansionExercise, createFactorizationExercise, irExpansion, irFactorization };
