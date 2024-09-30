// ExercicesGenerator_puissance.js

import React, { useState, useCallback } from 'react';
import Exercise from './Exercise'; // Ensure this component renders MathJax expressions
import { Button, TextField, Select, MenuItem, Grid, Card, CardContent, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MiniDocument from './MiniDocument'; // Make sure to create this component in a separate file
import { MathJaxContext, MathJax } from 'better-react-mathjax';

// Helper functions
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(array) {
    return array[randInt(0, array.length - 1)];
}

function randVariable() {
    const variables = ['a', 'b', 'x', 'y', 'm', 'n'];
    return randChoice(variables);
}

function gcd(a, b) {
    if (!b) return Math.abs(a);
    return gcd(b, a % b);
}

// Main Exercise Generator function
function createExercise(level) {
    let exercise = {};
    let questionText = '';

    if (level === 'ES') {
        exercise = createEcritureScientifiqueExercise();
        questionText = 'Écrire en notation scientifique :';
    } else {
        exercise = createPuissanceExercise(level);
        questionText = 'Simplifier :';
    }

    return { ...exercise, questionText };
}

// Functions to create exercises for 'les puissances'
function createPuissanceExercise(level) {
    switch(level) {
        case 1:
            return puissanceLevel1();
        case 2:
            return puissanceLevel2();
        case 3:
            return puissanceLevel3();
        case 4:
            return puissanceLevel4();
        case '4+':
            return puissanceLevel4Plus();
        case 5:
            return puissanceLevel5();
        case 6:
            return puissanceLevel6();
        case 7:
            return puissanceLevel7();
        case 8:
            return puissanceLevel8();
        default:
            return puissanceLevel1();
    }
}

// Level 1: Basic multiplication of powers with the same base
function puissanceLevel1() {
    const base = randInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);

    const question = ` ${base}^{${exponent1}} \\times ${base}^{${exponent2}} `;
    const answerExponent = exponent1 + exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
}

// Level 2: Basic division of powers with the same base (including negative exponents)
function puissanceLevel2() {
    const base = randInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);

    const question = ` \\dfrac{ ${base}^{${exponent1}} }{ ${base}^{${exponent2}} } `;
    const answerExponent = exponent1 - exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
}

// Level 3: Multiplication and division with 3 to 4 factors, including negative numbers and exponents
function puissanceLevel3() {
    const base = randInt(2, 5);
    const numFactors = randInt(3, 4);
    const exponents = Array.from({ length: numFactors }, () => randInt(-5, 5));
    const operations = Array.from({ length: numFactors - 1 }, () => randChoice(['multiply', 'divide']));

    let numerator = `${base}^{${exponents[0]}}`;
    let denominator = '';
    let questionParts = [`${base}^{${exponents[0]}}`];

    let combinedExponent = exponents[0];

    for (let i = 1; i < numFactors; i++) {
        if (operations[i-1] === 'multiply') {
            questionParts.push(`\\times ${base}^{${exponents[i]}}`);
            numerator += ` \\times ${base}^{${exponents[i]}}`;
            combinedExponent += exponents[i];
        } else {
            if (denominator === '') {
                denominator = `${base}^{${exponents[i]}}`;
            } else {
                denominator += ` \\times ${base}^{${exponents[i]}}`;
            }
            combinedExponent -= exponents[i];
        }
    }

    let question;
    if (denominator === '') {
        question = questionParts.join(' ');
    } else {
        question = `\\frac{${numerator}}{${denominator}}`;
    }

    const answer = ` ${base}^{${combinedExponent}} `;

    return { question, answer };
}


// Level 4: Power of a power (including negative exponents)
function puissanceLevel4() {
    const base = randInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);

    const question = ` \\left( ${base}^{${exponent1}} \\right)^{${exponent2}} `;
    const answerExponent = exponent1 * exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
}
// Level 4+: Random mix of levels 1, 2, and 4
function puissanceLevel4Plus() {
    const levelChoice = randChoice([1, 2, 4]);
    switch(levelChoice) {
        case 1:
            return puissanceLevel1();
        case 2:
            return puissanceLevel2();
        case 4:
            return puissanceLevel4();
        default:
            return puissanceLevel1();
    }
}


// Level 5: Expressions with multiple variables and positive exponents
function puissanceLevel5() {
    const var1 = randVariable();
    let var2 = randVariable();

    while (var2 === var1) {
        var2 = randVariable();
    }

    const exponentA1 = randInt(1, 5);
    const exponentB1 = randInt(1, 5);
    const exponentA2 = randInt(1, 5);
    const exponentB2 = randInt(1, 5);

    const question = ` ${var1}^{${exponentA1}} ${var2}^{${exponentB1}} \\times ${var1}^{${exponentA2}} ${var2}^{${exponentB2}} `;
    const totalExponentVar1 = exponentA1 + exponentA2;
    const totalExponentVar2 = exponentB1 + exponentB2;

    const answer = ` ${var1}^{${totalExponentVar1}} ${var2}^{${totalExponentVar2}} `;

    return { question, answer };
}

// Level 6: Simplify expressions with negative exponents and parentheses
function puissanceLevel6() {
    const base = randInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);
    const exponent3 = randInt(1, 3);

    const operation = randChoice(['multiply', 'divide']);

    let question, combinedExponent;

    if (operation === 'multiply') {
        question = ` \\left( ${base}^{${exponent1}} \\times ${base}^{${exponent2}} \\right)^{${exponent3}} `;
        combinedExponent = (exponent1 + exponent2) * exponent3;
    } else {
        question = ` \\left( \\frac{${base}^{${exponent1}}}{${base}^{${exponent2}}} \\right)^{${exponent3}} `;
        combinedExponent = (exponent1 - exponent2) * exponent3;
    }

    const answer = ` ${base}^{${combinedExponent}} `;

    return { question, answer };
}

// Level 7: Expressions involving fractions and powers
function puissanceLevel7() {
    const var1 = randVariable();
    let var2 = randVariable();
    let var3 = randVariable();

    // Ensure variables are unique
    while (var2 === var1) {
        var2 = randVariable();
    }
    while (var3 === var1 || var3 === var2) {
        var3 = randVariable();
    }

    const exponentA1 = randInt(-5, 5);
    const exponentB1 = randInt(-5, 5);
    const exponentC1 = randInt(-5, 5);

    const exponentA2 = randInt(-5, 5);
    const exponentB2 = randInt(-5, 5);
    const exponentC2 = randInt(-5, 5);

    const commonExponent = randInt(1, 3);

    const question = ` \\left( ${var1}^{${exponentA1}} ${var2}^{${exponentB1}} ${var3}^{${exponentC1}} \\times ${var1}^{${exponentA2}} ${var2}^{${exponentB2}} ${var3}^{${exponentC2}} \\right)^{${commonExponent}} `;

    const totalExponentVar1 = (exponentA1 + exponentA2) * commonExponent;
    const totalExponentVar2 = (exponentB1 + exponentB2) * commonExponent;
    const totalExponentVar3 = (exponentC1 + exponentC2) * commonExponent;

    let answerParts = [];
    if (totalExponentVar1 !== 0) {
        answerParts.push(` ${var1}^{${totalExponentVar1}} `);
    }
    if (totalExponentVar2 !== 0) {
        answerParts.push(` ${var2}^{${totalExponentVar2}} `);
    }
    if (totalExponentVar3 !== 0) {
        answerParts.push(` ${var3}^{${totalExponentVar3}} `);
    }
    const answer = answerParts.length > 0 ? answerParts.join(' \\times ') : '1';

    return { question, answer };
}

// Level 8: Complex expressions combining multiple exponent rules
function puissanceLevel8() {
    const var1 = randVariable();
    let var2 = randVariable();

    while (var2 === var1) {
        var2 = randVariable();
    }

    const exponents = Array.from({ length: 6 }, () => randInt(-3, 3));

    const numerator = `${var1}^{${exponents[0]}} \\; ${var2}^{${exponents[1]}} \\left( ${var1}^{${exponents[2]}} \\; ${var2}^{${exponents[3]}} \\right)^{${exponents[4]}}`;
    const denominator = `${var1}^{${exponents[5]}} \\; ${var2}^{${-exponents[4]}}`;

    const question = ` \\dfrac{ ${numerator} }{ ${denominator} } `;

    // Calculating exponents step by step
    const totalExponentVar1 = exponents[0] + exponents[2] * exponents[4] - exponents[5];
    const totalExponentVar2 = exponents[1] + exponents[3] * exponents[4] + exponents[4];

    // Constructing the answer
    let answerParts = [];
    if (totalExponentVar1 !== 0) {
        answerParts.push(` ${var1}^{${totalExponentVar1}} `);
    }
    if (totalExponentVar2 !== 0) {
        answerParts.push(` ${var2}^{${totalExponentVar2}} `);
    }

    const answer = answerParts.length > 0 ? answerParts.join(' \\times ') : '1';

    return { question, answer };
}

// New Level 'ES': Exercises on Scientific Notation
function createEcritureScientifiqueExercise() {
    const type = randChoice(['large', 'small']);
    let exponent;
    let mantissa;
    let number;
    let sign = randChoice(['', '-']);

    // Generate mantissa between 1.0 and 9.9 with one decimal place
    mantissa = (Math.random() * 8.9 + 1).toFixed(1); // Generates 1.0 to 9.9

    // For small numbers, exponent negative, for large numbers, exponent positive
    if (type === 'large') {
        exponent = randInt(3, 9); // Exponent between 3 and 9
    } else {
        exponent = -randInt(1, 9); // Exponent between -1 and -9
    }

    // Now compute the number
    number = parseFloat(sign + mantissa) * Math.pow(10, exponent);

    // Format the question number appropriately
    let questionNumber;

    if (Math.abs(number) >= 1) {
        questionNumber = number.toLocaleString('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).replace(/\s/g, ' ').replace(/,/g, ',');
    } else {
        // For small numbers, format with enough decimal places
        const absNumber = Math.abs(number);
        const decimalPlaces = -Math.floor(Math.log10(absNumber)) + 1;
        questionNumber = absNumber.toFixed(decimalPlaces);
        if (sign === '-') questionNumber = '-' + questionNumber;
    }

    const question = `${questionNumber}`;

    const answer = `${sign}${mantissa.replace('.', ',')} \\times 10^{${exponent}}`;

    return { question, answer };
}



// Main component
function ExerciseGeneratorPuissance() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [level, setLevel] = useState(1);
    const [exerciseKey, setExerciseKey] = useState(0);
    const [isDocumentOpen, setIsDocumentOpen] = useState(false);


    const generateExercises = useCallback((selectedLevel = level) => {
        const newExercises = [];
        for (let i = 0; i < numExercises; i++) {
            newExercises.push(createExercise(selectedLevel));
        }
        setExercises(newExercises);
        setExerciseKey(prevKey => prevKey + 1); // Increment the key
    }, [numExercises, level]);

    // Level colors for buttons
    const levelColors = {
        1: '#d8ebff',
        2: '#b0d4ff',
        3: '#89c4ff',
        4: '#62b5ff',
        '4+': 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)', // Rainbow gradient
        5: '#3aa5ff',
        6: '#0080ff',
        7: '#0059b3',
        8: '#002966',
        'ES': '#ff9900',
    };
    

    return (
        <div className="container">
            <Card sx={{ mb: 2, p: 1, backgroundColor: '#f0f4f8' }}>
                <CardContent>
                    <h1>Générateur d'Exercices - Puissances & Notation Scientifique</h1>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                value={numExercises}
                                onChange={(e) => setNumExercises(Number(e.target.value))}
                                label="Nombre d'Exercices"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                className="level-buttons"
                                style={{ textAlign: 'center', marginTop: '10px' }}
                            >
                                {[1, 2, 3, 4, '4+', 5, 6, 7, 8, 'ES'].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => {
                                            setLevel(lvl);
                                            generateExercises(lvl);
                                        }}
                                        variant="contained"
                                        style={{
                                            margin: '5px',
                                            background: levelColors[lvl],
                                            color: '#fff',
                                        }}
                                    >
                                        Niveau {lvl}
                                    </Button>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: '20px' }}>
                        <Button variant="contained" onClick={() => generateExercises(level)}>
                            Générer les Exercices
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container">
                {exercises.map((exercise, index) => (
                    <Exercise
                        key={`${index}-${exerciseKey}`}
                        exercise={exercise}
                        index={index}
                    />
                ))}
            </div>
            {exercises.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant="outlined" onClick={() => window.print()}>
                        Imprimer les Exercices
                    </Button>
                </div>
            )}
            
            <Card sx={{ mt: 4, mb: 4, p: 2, backgroundColor: '#f0f4f8' }}>
          <CardContent>
            <Button
              onClick={() => setIsDocumentOpen(!isDocumentOpen)}
              endIcon={<ExpandMoreIcon style={{ transform: isDocumentOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
              fullWidth
              variant="contained"
              color="primary"
            >
              <Typography variant="h6">
                Guide d'Étude: Les Puissances et Les Exposants
              </Typography>
            </Button>
            <Collapse in={isDocumentOpen}>
              <MiniDocument />
            </Collapse>
          </CardContent>
            </Card>
        </div>
    );
}

export default ExerciseGeneratorPuissance;
