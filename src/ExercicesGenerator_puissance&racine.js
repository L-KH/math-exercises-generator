// ExercicesGenerator_puissance&racine.js

import React, { useState, useCallback } from 'react';
import Exercise from './Exercise'; // Ensure this component uses MathJax
import { Button, TextField, Select, MenuItem, Grid, Card, CardContent } from '@mui/material';

// Helper functions
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

function randChoice(array) {
    return array[randInt(0, array.length - 1)];
}

// Function to generate random variables
function randVariable() {
    const variables = ['a', 'b', 'x', 'y', 'm', 'n'];
    return randChoice(variables);
}

// Function to compute GCD
function gcd(a, b) {
    if (!b) return Math.abs(a);
    return gcd(b, a % b);
}

// Main Exercise Generator function
function createExercise(level, exerciseTopic) {
    let exercise = {};
    let questionText = '';

    if (exerciseTopic === 'puissances') {
        exercise = createPuissanceExercise(level);
        questionText = 'Simplifier :';
    } else if (exerciseTopic === 'racines') {
        exercise = createRacineExercise(level);
        questionText = "Simplifier :";
    } else { // both
        if (Math.random() < 0.5) {
            exercise = createPuissanceExercise(level);
            questionText = 'Simplifier :';
        } else {
            exercise = createRacineExercise(level);
            questionText = "Simplifier :";
        }
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
        case 5:
            return puissanceLevel5();
        default:
            return puissanceLevel1();
    }
}

function puissanceLevel1() {
    // Simple exponentiation with integer base and exponent
    let base = randInt(-10, 10);
    let exponent = randInt(1, 5);

    if (base === 0 && exponent === 0) {
        base = 1; // Avoid 0^0
    }

    const question = ` ${base}^{${exponent}} `;
    const answer = Math.pow(base, exponent);

    return { question, answer: `${answer}` };
}

function puissanceLevel2() {
    // Exponentiation involving fractions, result as fraction
    const numerator = randInt(-5, 5);
    const denominator = randInt(1, 5); // Avoid zero denominator

    // Ensure denominator is not zero
    if (denominator === 0) {
        denominator = 1;
    }

    const exponent = randInt(1, 3);

    const question = ` \\left( \\dfrac{${numerator}}{${denominator}} \\right)^{${exponent}} `;
    const numPower = Math.pow(numerator, exponent);
    const denPower = Math.pow(denominator, exponent);

    // Simplify fraction
    const gcdValue = gcd(numPower, denPower);
    const simplifiedNum = numPower / gcdValue;
    const simplifiedDen = denPower / gcdValue;

    const answer = simplifiedDen === 1
        ? `${simplifiedNum}`
        : ` \\dfrac{${simplifiedNum}}{${simplifiedDen}} `;

    return { question, answer };
}

function puissanceLevel3() {
    // Simplify expressions with same base
    const base = randNonZeroInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);

    const operation = Math.random() < 0.5 ? '\\times' : '\\div';

    const question = ` ${base}^{${exponent1}} ${operation} ${base}^{${exponent2}} `;

    let combinedExponent;
    if (operation === '\\times') {
        combinedExponent = exponent1 + exponent2;
    } else {
        combinedExponent = exponent1 - exponent2;
    }

    const answer = ` ${base}^{${combinedExponent}} `;

    return { question, answer };
}

function puissanceLevel4() {
    // Simplify expressions with variables and exponents
    let var1 = randVariable();
    let var2 = randVariable();

    // Ensure variables are different
    while (var2 === var1) {
        var2 = randVariable();
    }

    const exponents = [];
    for (let i = 0; i < 4; i++) {
        exponents.push(randInt(1, 5));
    }

    const question = ` \\dfrac{ ${var1}^{${exponents[0]}} \\times ${var2}^{${exponents[1]}} }{ ${var1}^{${exponents[2]}} \\times ${var2}^{${exponents[3]}} } `;

    // Simplify exponents
    const exponentVar1 = exponents[0] - exponents[2];
    const exponentVar2 = exponents[1] - exponents[3];

    // Construct answer
    let answerParts = [];
    if (exponentVar1 !== 0) {
        if (exponentVar1 === 1) {
            answerParts.push(` ${var1} `);
        } else {
            answerParts.push(` ${var1}^{${exponentVar1}} `);
        }
    }
    if (exponentVar2 !== 0) {
        if (exponentVar2 === 1) {
            answerParts.push(` ${var2} `);
        } else {
            answerParts.push(` ${var2}^{${exponentVar2}} `);
        }
    }

    const answer = answerParts.length > 0 ? answerParts.join(' \\times ') : '1';

    return { question, answer };
}

function puissanceLevel5() {
    // Complex expressions with variables, negative exponents, and fractions
    let var1 = randVariable();
    let var2 = randVariable();

    while (var2 === var1) {
        var2 = randVariable();
    }

    const exponent1 = randInt(-3, 3);
    const exponent2 = randInt(-3, 3);
    const exponent3 = randInt(-3, 3);
    const exponent4 = randInt(-3, 3);

    const question = ` \\frac{ ${var1}^{${exponent1}} ${var2}^{${exponent2}} }{ ${var1}^{${exponent3}} ${var2}^{${exponent4}} } `;

    // Simplify exponents
    const exponentVar1 = exponent1 - exponent3;
    const exponentVar2 = exponent2 - exponent4;

    // Handle negative exponents and fractions
    let numeratorParts = [];
    let denominatorParts = [];

    if (exponentVar1 > 0) {
        numeratorParts.push(` ${var1}^{${exponentVar1}} `);
    } else if (exponentVar1 < 0) {
        denominatorParts.push(` ${var1}^{${-exponentVar1}} `);
    }

    if (exponentVar2 > 0) {
        numeratorParts.push(` ${var2}^{${exponentVar2}} `);
    } else if (exponentVar2 < 0) {
        denominatorParts.push(` ${var2}^{${-exponentVar2}} `);
    }

    let answer = '';
    if (denominatorParts.length === 0) {
        answer = numeratorParts.join(' \\times ');
    } else {
        const numerator = numeratorParts.length > 0 ? numeratorParts.join(' \\times ') : '1';
        const denominator = denominatorParts.join(' \\times ');
        answer = ` \\frac{ ${numerator} }{ ${denominator} } `;
    }

    if (answer === '') {
        answer = '1';
    }

    return { question, answer };
}


// Functions to create exercises for 'les racines'
function createRacineExercise(level) {
    switch(level) {
        case 1:
            return racineLevel1();
        case 2:
            return racineLevel2();
        case 3:
            return racineLevel3();
        case 4:
            return racineLevel4();
        case 5:
            return racineLevel5();
        default:
            return racineLevel1();
    }
}

function racineLevel1() {
    // Simple square roots of perfect squares
    const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
    const radicand = randChoice(perfectSquares);

    const question = ` \\sqrt{${radicand}} `;
    const answer = `${Math.sqrt(radicand)}`;

    return { question, answer };
}

function racineLevel2() {
    // Simplify square roots (e.g., \sqrt{18} = 3\sqrt{2})
    let n = randInt(2, 10);
    let k = randInt(2, 5);
    const radicand = n * n * k; // n^2 * k

    // Simplify \sqrt{radicand}
    const question = ` \\sqrt{${radicand}} `;
    const answer = `${n} \\sqrt{${k}}`;

    return { question, answer };
}

function racineLevel3() {
    // Multiply and divide square roots
    const a = randInt(2, 10);
    const b = randInt(2, 10);

    const operation = randChoice(['\\times', '\\div']);

    if (operation === '\\times') {
        const question = ` \\sqrt{${a}} \\times \\sqrt{${b}} `;
        const radicand = a * b;
        const simplified = simplifySquareRoot(radicand);
        const answer = ` ${simplified} `;
        return { question, answer };
    } else {
        const question = ` \\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}} `;
        const radicand = a / b;
        if (Number.isInteger(radicand) && radicand > 0) {
            const simplified = simplifySquareRoot(radicand);
            const answer = ` ${simplified} `;
            return { question, answer };
        } else {
            const answer = ` \\sqrt{\\dfrac{${a}}{${b}}} `;
            return { question, answer };
        }
    }
}

function racineLevel4() {
    // Rationalization of denominators
    const numerator = randInt(1, 10);
    const radicand = randInt(2, 20);

    const question = ` \\dfrac{${numerator}}{\\sqrt{${radicand}}} `;

    // Rationalize denominator: multiply numerator and denominator by sqrt(radicand)
    const newNumerator = `${numerator} \\sqrt{${radicand}}`;
    const newDenominator = radicand;

    const answer = ` \\dfrac{${newNumerator}}{${newDenominator}} `;

    return { question, answer };
}

function racineLevel5() {
    // Solve equations involving square roots
    const x = randInt(1, 10);
    const radicand = x * x;

    const question = ` \\sqrt{x} = ${x} `;

    const answer = ` x = ${radicand} `;

    return { question, answer };
}

function simplifySquareRoot(n) {
    let largestSquare = 1;

    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % (i * i) === 0) {
            largestSquare = i * i;
        }
    }

    const outsideRoot = Math.sqrt(largestSquare);
    const insideRoot = n / largestSquare;

    if (insideRoot === 1) {
        return `${outsideRoot}`;
    } else {
        return `${outsideRoot} \\sqrt{${insideRoot}}`;
    }
}

function ExerciseGeneratorPuissance() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [exerciseTopic, setExerciseTopic] = useState('both'); // Default to 'both'
    const [level, setLevel] = useState(1);

    const generateExercises = useCallback((selectedLevel = level) => {
        const newExercises = [];
        for (let i = 0; i < numExercises; i++) {
            newExercises.push(createExercise(selectedLevel, exerciseTopic));
        }
        setExercises(newExercises);
    }, [numExercises, exerciseTopic, level]);

    // Level colors for buttons
    const levelColors = {
        1: '#d8ebff',
        2: '#89c4ff',
        3: '#0080ff',
        4: '#004589',
        5: '#001e3b',
    };

    return (
        <div className="container">
            <Card sx={{ mb: 4, p: 2, backgroundColor: '#f0f4f8' }}>
                <CardContent>
                    <h1>Générateur d'Exercices - Puissances & Racines Carrées</h1>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                value={numExercises}
                                onChange={(e) => setNumExercises(Number(e.target.value))}
                                label="Nombre d'Exercices"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Select
                                fullWidth
                                value={exerciseTopic}
                                onChange={(e) => setExerciseTopic(e.target.value)}
                                label="Type d'Exercices"
                            >
                                <MenuItem value="both">Les deux</MenuItem>
                                <MenuItem value="puissances">Les puissances</MenuItem>
                                <MenuItem value="racines">Les racines carrées</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="level-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
                                {[1, 2, 3, 4, 5].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => {
                                            setLevel(lvl);
                                            generateExercises(lvl);
                                        }}
                                        variant="contained"
                                        style={{
                                            margin: '5px',
                                            backgroundColor: levelColors[lvl],
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
                        <Button variant="contained" onClick={() => generateExercises(level)}>Générer les Exercices</Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container">
                {exercises.map((exercise, index) => (
                    <Exercise key={index} exercise={exercise} index={index} />
                ))}
            </div>
            {exercises.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant="outlined" onClick={() => window.print()}>Imprimer les Exercices</Button>
                </div>
            )}
        </div>
    );
}

export default ExerciseGeneratorPuissance;
