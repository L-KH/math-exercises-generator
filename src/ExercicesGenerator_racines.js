// ExercicesGenerator_racines.js

import React, { useState, useCallback } from 'react';
import Exercise from './Exercise'; // Ensure this component renders MathJax expressions
import { Button, TextField, Grid, Card, CardContent } from '@mui/material';

// Helper functions
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(array) {
    return array[randInt(0, array.length - 1)];
}

function gcd(a, b) {
    if (!b) return Math.abs(a);
    return gcd(b, a % b);
}

function isPerfectSquare(n) {
    return Number.isInteger(Math.sqrt(n));
}

// Main Exercise Generator function
function createExercise(level) {
    let exercise = {};
    let questionText = 'Simplifier :';

    exercise = createRacineExercise(level);

    return { ...exercise, questionText };
}

// Functions to create exercises for 'les racines carrées'
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

// Level 1: Basic calculations involving squares and square roots
function racineLevel1() {
    const a = randInt(2, 10);
    const questionOptions = [
        `\\left( \\sqrt{${a}} \\right)^2`,
        `\\sqrt{${a}^2}`,
    ];
    const question = randChoice(questionOptions);
    const answer = `${a}`;

    return { question, answer };
}

// Level 2: Simplifying sums and differences of radicals with perfect squares
function racineLevel2() {
    const radicands = [12, 27, 75, 20, 45, 80];
    const coefficients = [1, 2, 3, -1, -2];

    const term1 = `${randChoice(coefficients)} \\sqrt{${randChoice(radicands)}}`;
    const term2 = `${randChoice(coefficients)} \\sqrt{${randChoice(radicands)}}`;
    const term3 = `${randChoice(coefficients)} \\sqrt{${randChoice(radicands)}}`;

    const question = ` ${term1} ${term2.startsWith('-') ? '' : '+ '} ${term2} ${term3.startsWith('-') ? '' : '+ '} ${term3} `;

    const terms = [term1, term2, term3];
    const simplifiedTerms = terms.map(term => {
        const [coeffStr, sqrtPart] = term.split('\\sqrt{');
        const coeff = eval(coeffStr); // Use eval to handle fractions and negative signs
        const radicand = parseInt(sqrtPart.replace('}', ''));
        const simplified = simplifySquareRootWithCoeff(coeff, radicand);
        return simplified;
    });

    // Group like radicals
    const likeTerms = {};
    simplifiedTerms.forEach(({ coeff, radicandStr }) => {
        if (likeTerms[radicandStr]) {
            likeTerms[radicandStr] += coeff;
        } else {
            likeTerms[radicandStr] = coeff;
        }
    });

    // Construct the answer
    const answer = Object.entries(likeTerms)
        .filter(([_, coeff]) => coeff !== 0)
        .map(([radicandStr, coeff]) => {
            const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff;
            return `${coeffStr} \\sqrt{${radicandStr}}`;
        })
        .join(' + ')
        .replace(/\+ -/g, '- ');

    return { question, answer };
}

// Level 3: Simplifying complex radical expressions with coefficients and fractions
// Level 6: More complex simplification of sums and differences of radicals
// Level 6: More complex simplification of sums and differences of radicals
function racineLevel6() {
    const radicands = [12, 27, 48, 75, 108, 147, 192, 243, 300, 375];
    const coefficients = [1, 2, 3, 4, 5, -1, -2, -3, -4, -5];

    // Generate 4 terms
    const terms = [];
    for (let i = 0; i < 4; i++) {
        const coeff = randChoice(coefficients);
        const radicand = randChoice(radicands);
        terms.push(`${coeff === 1 ? '' : coeff === -1 ? '-' : coeff}\\sqrt{${radicand}}`);
    }

    const question = terms.join(' + ').replace(/\+ -/g, '- ');

    // Simplify each term
    const simplifiedTerms = terms.map(term => {
        const [coeffStr, sqrtPart] = term.split('\\sqrt{');
        const coeff = coeffStr === '' ? 1 : coeffStr === '-' ? -1 : parseInt(coeffStr);
        const radicand = parseInt(sqrtPart.replace('}', ''));
        return simplifySquareRoot(coeff, radicand);
    });

    // Group like terms
    const likeTerms = {};
    simplifiedTerms.forEach(({ coeff, outsideRoot, insideRoot }) => {
        const key = insideRoot;
        if (likeTerms[key]) {
            likeTerms[key] += coeff * outsideRoot;
        } else {
            likeTerms[key] = coeff * outsideRoot;
        }
    });

    // Construct the answer
    const answerTerms = Object.entries(likeTerms)
        .filter(([_, coeff]) => coeff !== 0)
        .map(([radicand, coeff]) => {
            if (radicand === '1') {
                return coeff.toString();
            } else {
                const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff.toString();
                return `${coeffStr}\\sqrt{${radicand}}`;
            }
        });

    const answer = answerTerms.join(' + ').replace(/\+ -/g, '- ') || '0';

    return { question, answer };
}

// Helper function to simplify square roots
function simplifySquareRoot(coeff, radicand) {
    let outsideRoot = 1;
    let insideRoot = radicand;

    for (let i = 2; i * i <= insideRoot; i++) {
        while (insideRoot % (i * i) === 0) {
            outsideRoot *= i;
            insideRoot /= i * i;
        }
    }

    return { coeff, outsideRoot, insideRoot };
}


// Level 4: Rationalizing denominators with a single term in the denominator
function racineLevel4() {
    const numerators = [1, 2, 3, 5, -1, -2];
    const radicands = [2, 3, 5, 7, 11];

    const numerator = randChoice(numerators);
    const radicand = randChoice(radicands);

    const question = ` \\dfrac{${numerator}}{\\sqrt{${radicand}}} `;

    // Rationalize the denominator
    const newNumerator = `${numerator} \\sqrt{${radicand}}`;
    const newDenominator = radicand;

    const simplifiedNumerator = numerator === 1 ? '' : numerator === -1 ? '-' : numerator;

    const answer = ` \\dfrac{${simplifiedNumerator} \\sqrt{${radicand}}}{${newDenominator}} `;

    return { question, answer };
}

// Level 5: Rationalizing denominators with binomial denominators
function racineLevel5() {
    const numerators = [1, 2, 3, -1];
    const radicands = [2, 3, 5];
    const constants = [1, -1, 2, -2];

    const numerator = randChoice(numerators);
    const radicand = randChoice(radicands);
    const constant = randChoice(constants);

    const denominator = `\\sqrt{${radicand}} ${constant >= 0 ? '+ ' : '- '} ${Math.abs(constant)}`;

    const question = ` \\dfrac{${numerator}}{${denominator}} `;

    // Rationalize the denominator by multiplying numerator and denominator by the conjugate
    const conjugate = `\\sqrt{${radicand}} ${constant >= 0 ? '- ' : '+ '} ${Math.abs(constant)}`;

    const newNumerator = `${numerator} \\times ( ${conjugate} )`;
    const denominatorProduct = `( \\sqrt{${radicand}} )^{2} - ( ${constant} )^{2}`;
    const simplifiedDenominator = radicand - constant * constant;

    const answer = ` \\dfrac{${newNumerator}}{${simplifiedDenominator}} `;

    return { question, answer };
}

// Level 6: Simplifying expressions involving variables under radicals (VARIED)
function racineLevel3() {
    const variables = ['a', 'b', 'c', 'x', 'y', 'z'];
    const var1 = randChoice(variables);
    const var2 = randChoice(variables.filter(v => v !== var1));
    const var3 = randChoice(variables.filter(v => v !== var1 && v !== var2));

    const exponents = [2, 4, 6, 8];
    const exp1 = randChoice(exponents);
    const exp2 = randChoice(exponents);
    const exp3 = randChoice(exponents);

    const question = ` \\sqrt{ ${var1}^{${exp1}} ${var2}^{${exp2}} ${var3}^{${exp3}} } `;

    const simplifiedVar1 = exp1 / 2 >= 1 ? `${var1}^{${exp1 / 2}}` : '';
    const simplifiedVar2 = exp2 / 2 >= 1 ? `${var2}^{${exp2 / 2}}` : '';
    const simplifiedVar3 = exp3 / 2 >= 1 ? `${var3}^{${exp3 / 2}}` : '';

    const answer = [simplifiedVar1, simplifiedVar2, simplifiedVar3].filter(Boolean).join(' ');

    return { question, answer };
}

// Level 7: Operations with radicals and exponents
// Level 7: Complex operations with radicals and exponents
function racineLevel7() {
    const operations = [
        {
            generate: () => {
                const a = randInt(2, 10);
                const b = randInt(2, 10);
                return {
                    question: `(\\sqrt{${a}} + \\sqrt{${b}})^2`,
                    answer: `${a} + ${b} + 2\\sqrt{${a * b}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 10);
                const b = randInt(2, 10);
                return {
                    question: `(\\sqrt{${a}} - \\sqrt{${b}})^2`,
                    answer: `${a} + ${b} - 2\\sqrt{${a * b}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 10);
                const b = randInt(2, 10);
                return {
                    question: `\\sqrt{${a}} \\cdot \\sqrt{${b}}`,
                    answer: `\\sqrt{${a * b}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 10);
                const b = randInt(2, 10);
                const c = a * b;
                return {
                    question: `\\frac{\\sqrt{${c}}}{\\sqrt{${a}}}`,
                    answer: `\\sqrt{${b}}`
                };
            }
        }
    ];

    return randChoice(operations).generate();
}

// Helper function to convert decimal to fraction
function toFraction(decimal) {
    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = decimal;
    do {
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);
    return [h1, k1];
}

// Level 8: Simple quadratic equations (ADJUSTED)
function racineLevel8() {
    const coefficients = [1, 2, 3, 5, 7, 9];
    const constants = [4, 5, 7, 9, 12, 16, 25];

    const a = randChoice(coefficients);
    const c = randChoice(constants);

    const equationType = randInt(1, 2);

    let question, answer;
    if (equationType === 1) {
        // Equations like x^2 = c
        question = ` x^{2} = ${c} `;
        const sqrtC = Math.sqrt(c);
        if (Number.isInteger(sqrtC)) {
            answer = ` x = \\pm ${sqrtC} `;
        } else {
            answer = ` x = \\pm \\sqrt{${c}} `;
        }
    } else {
        // Equations like a x^2 = c
        question = ` ${a} x^{2} = ${c} `;
        const fraction = c / a;
        const sqrtFraction = Math.sqrt(fraction);
        if (Number.isInteger(sqrtFraction)) {
            answer = ` x = \\pm ${sqrtFraction} `;
        } else {
            if (fraction % 1 === 0) {
                // Integer fraction
                answer = ` x = \\pm \\sqrt{${fraction}} `;
            } else {
                // Fraction under square root
                const numerator = c;
                const denominator = a;
                answer = ` x = \\pm \\sqrt{\\dfrac{${numerator}}{${denominator}}} `;
            }
        }
    }

    return { question, answer };
}

// Helper function to simplify square roots with coefficients
function simplifySquareRootWithCoeff(coeff, radicand) {
    let largestSquare = 1;

    for (let i = 1; i <= Math.floor(Math.sqrt(radicand)); i++) {
        if (radicand % (i * i) === 0) {
            largestSquare = i * i;
        }
    }

    const outsideRoot = Math.sqrt(largestSquare);
    const insideRoot = radicand / largestSquare;

    const newCoeff = coeff * outsideRoot;

    const radicandStr = insideRoot === 1 ? '' : insideRoot.toString();

    return {
        coeff: newCoeff,
        radicandStr,
    };
}

// Main component
function ExerciseGeneratorRacines() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [level, setLevel] = useState(1);

    const generateExercises = useCallback((selectedLevel = level) => {
        const newExercises = [];
        for (let i = 0; i < numExercises; i++) {
            newExercises.push({...createExercise(selectedLevel), id: Date.now() + i});
        }
        setExercises(newExercises);
    }, [numExercises, level]);
    

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
        <div className="container_racine">
            <Card sx={{ mb: 0.4, p: 0.2 }}>
                <CardContent style={{ backgroundColor: 'rgb(173, 136, 39, 0.25)'}}>
                    <h1>Générateur d'Exercices - Les Racines Carrées</h1>
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
                        <Grid item xs={12}>
                            <div className="level-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
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
                        <Button variant="contained" onClick={() => generateExercises(level)}>Générer les Exercices</Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container">
            {exercises.map((exercise, index) => (
                <Exercise key={exercise.id} exercise={exercise} index={index} />
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

export default ExerciseGeneratorRacines;