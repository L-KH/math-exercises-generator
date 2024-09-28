// ExercicesGenerator_puissance&racine.js

import React, { useState, useCallback } from 'react';
import Exercise from './Exercise'; // Make sure this component renders MathJax expressions
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

function randVariable() {
    const variables = ['a', 'b', 'x', 'y', 'm', 'n'];
    return randChoice(variables);
}

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
    const exponent1 = randInt(1, 5);
    const exponent2 = randInt(1, 5);

    const question = ` ${base}^{${exponent1}} \\times ${base}^{${exponent2}} `;
    const answerExponent = exponent1 + exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
}

// Level 2: Basic division of powers with the same base
function puissanceLevel2() {
    const base = randInt(2, 5);
    const exponent1 = randInt(2, 5);
    const exponent2 = randInt(1, exponent1); // Ensure exponent2 <= exponent1

    const question = ` \\dfrac{ ${base}^{${exponent1}} }{ ${base}^{${exponent2}} } `;
    const answerExponent = exponent1 - exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
}

// Level 3: Multiplication and division with negative exponents
function puissanceLevel3() {
    const base = randInt(2, 5);
    const exponent1 = randInt(-5, 5);
    const exponent2 = randInt(-5, 5);

    const operation = randChoice(['\\times', '\\div']);

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

// Level 4: Power of a power
function puissanceLevel4() {
    const base = randInt(2, 5);
    const exponent1 = randInt(1, 5);
    const exponent2 = randInt(1, 5);

    const question = ` \\left( ${base}^{${exponent1}} \\right)^{${exponent2}} `;
    const answerExponent = exponent1 * exponent2;

    const answer = ` ${base}^{${answerExponent}} `;

    return { question, answer };
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

    const question = ` \\left( ${base}^{${exponent1}} \\times ${base}^{${exponent2}} \\right)^{${exponent3}} `;
    const combinedExponent = (exponent1 + exponent2) * exponent3;

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

// Functions to create exercises for 'les racines'
function createRacineExercise(level) {
    switch (level) {
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
        case 6:
            return racineLevel6();
        case 7:
            return racineLevel7();
        case 8:
            return racineLevel8();
        default:
            return racineLevel1();
    }
}

// Level 1: Square roots of perfect squares
function racineLevel1() {
    const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
    const radicand = randChoice(perfectSquares);

    const question = ` \\sqrt{${radicand}} `;
    const answer = `${Math.sqrt(radicand)}`;

    return { question, answer };
}

// Level 2: Simplify square roots (e.g., sqrt(18) = 3sqrt(2))
function racineLevel2() {
    const n = randInt(2, 10);
    const k = randInt(2, 5);
    const radicand = n * n * k;

    const question = ` \\sqrt{${radicand}} `;
    const answer = `${n} \\sqrt{${k}}`;

    return { question, answer };
}

// Level 3: Multiply and divide square roots
function racineLevel3() {
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

// Level 4: Rationalization of denominators
function racineLevel4() {
    const numerator = randInt(1, 10);
    const radicand = randInt(2, 20);

    const question = ` \\dfrac{${numerator}}{\\sqrt{${radicand}}} `;

    // Rationalize denominator: multiply numerator and denominator by sqrt(radicand)
    const newNumerator = `${numerator} \\sqrt{${radicand}}`;
    const newDenominator = radicand;

    const gcdValue = gcd(numerator, radicand);
    const simplifiedNumerator = numerator / gcdValue;
    const simplifiedDenominator = radicand / gcdValue;

    const answer = ` \\dfrac{${simplifiedNumerator} \\sqrt{${radicand}}}{${simplifiedDenominator}} `;

    return { question, answer };
}

// Level 5: Simplify expressions with roots and exponents
function racineLevel5() {
    const n = randInt(2, 5);
    const m = randInt(2, 5);

    const question = ` \\left( \\sqrt{${n}} \\right)^{${m}} `;
    const exponent = m / 2;

    const answer = ` ${n}^{${exponent}} `;

    return { question, answer };
}

// Level 6: Equations involving square roots
function racineLevel6() {
    const x = randInt(1, 10);
    const radicand = x * x;

    const question = ` \\sqrt{x} = ${x} `;
    const answer = ` x = ${radicand} `;

    return { question, answer };
}

// Level 7: Simplify nested square roots
function racineLevel7() {
    const a = randInt(2, 5);
    const b = randInt(2, 5);

    const question = ` \\sqrt{ ${a} + \\sqrt{${b}} } `;
    const answer = ` Cannot simplify further `;

    return { question, answer };
}

// Level 8: Complex expressions combining roots and exponents
function racineLevel8() {
    const base = randInt(2, 5);
    const exponent = randInt(1, 3);
    const radicand = randInt(2, 5);

    const question = ` \\left( \\sqrt{${radicand}} \\right)^{${exponent}} \\times ${base}^{\\dfrac{${exponent}}{2}} `;
    const exponentResult = exponent / 2;

    const answer = ` ${base}^{${exponentResult}} \\times ${radicand}^{${exponentResult}} `;

    return { question, answer };
}

// Helper function to simplify square roots
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

// Main component
function ExerciseGeneratorPuissance() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [exerciseTopic, setExerciseTopic] = useState('puissances'); // Default to 'puissances'
    const [level, setLevel] = useState(1);

    const [exerciseKey, setExerciseKey] = useState(0);

    const generateExercises = useCallback((selectedLevel = level) => {
        const newExercises = [];
        for (let i = 0; i < numExercises; i++) {
            newExercises.push(createExercise(selectedLevel, exerciseTopic));
        }
        setExercises(newExercises);
        setExerciseKey(prevKey => prevKey + 1); // Increment the key
    }, [numExercises, exerciseTopic, level]);

    // Level colors for buttons
    const levelColors = {
        1: '#d8ebff',
        2: '#b0d4ff',
        3: '#89c4ff',
        4: '#62b5ff',
        5: '#3aa5ff',
        6: '#0080ff',
        7: '#0059b3',
        8: '#002966',
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
                                <MenuItem value="puissances">Puissances</MenuItem>
                                <MenuItem value="racines">Racines carrées</MenuItem>
                                <MenuItem value="both">Les deux</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                className="level-buttons"
                                style={{ textAlign: 'center', marginTop: '20px' }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
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
                        <Button variant="contained" onClick={() => generateExercises(level)}>
                            Générer les Exercices
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container">
                {exercises.map((exercise, index) => (
                    <Exercise key={`${index}-${exerciseKey}`} exercise={exercise} index={index} />
                ))}
            </div>
            {exercises.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant="outlined" onClick={() => window.print()}>
                        Imprimer les Exercices
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ExerciseGeneratorPuissance;
