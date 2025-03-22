// ExercicesGenerator_racines.js with responsive design

import React, { useState, useCallback, useEffect} from 'react';
import Exercise from './Exercise'; 
import { Button, TextField, Grid, Card, CardContent, Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import ReactGA from 'react-ga4';
import './ResponsiveMath.css';

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

// Format text in LaTeX to preserve spaces
function formatText(text) {
    return `\\text{${text}}`;
}

// Main Exercise Generator function
function createExercise(level) {
    let exercise = {};
    let questionText = `${formatText('Calculer :')}`;

    exercise = createRacineExercise(level);

    // Adjust question text for Level 3
    if (level === 3) {
        questionText = `${formatText('Écrire avec un dénominateur entier :')}`;
    }

    return { ...exercise, questionText };
}

// Functions to create exercises for 'les racines carrées'
function createRacineExercise(level) {
    switch (level) {
        case 1:
            return racineLevel1();
        case 2:
            return racineLevel2();
        case '2plus':
            return racineLevel2plus();
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
        case 'EQ':
            return racineLevelEQ();
        default:
            return racineLevel1();
    }
}

// Level 1: Calculations like 4, 16, 0.49, etc.
function racineLevel1() {
    const exercises = [
        () => {
            const a = randChoice([4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]);
            return {
                question: `\\sqrt{${a}}`,
                answer: `${Math.sqrt(a)}`
            };
        },
        () => {
            const a = randChoice([4, 9, 16, 25, 36, 49, 64, 81]);
            return {
                question: `\\sqrt{\\sqrt{${a * a}}}`,
                answer: `${Math.sqrt(a)}`
            };
        },
        () => {
            const fractions = [
                { numerator: 4, denominator: 9 },
                { numerator: 1, denominator: 16 },
                { numerator: 9, denominator: 25 },
            ];
            const frac = randChoice(fractions);
            return {
                question: `\\sqrt{\\dfrac{${frac.numerator}}{${frac.denominator}}}`,
                answer: `\\dfrac{${Math.sqrt(frac.numerator)}}{${Math.sqrt(frac.denominator)}}`
            };
        },
        () => {
            const decimals = [0.25, 0.04, 0.49, 0.36, 0.81];
            const decimal = randChoice(decimals);
            return {
                question: `\\sqrt{${decimal}}`,
                answer: `${Math.sqrt(decimal)}`
            };
        },
        () => {
            const a = randInt(1, 10);
            return {
                question: `\\sqrt{(-${a})^{2}}`,
                answer: `${a}`
            };
        },
        () => {
            const values = [1, 4, 9, 16, 25];
            const a = randChoice(values);
            const b = randChoice(values);
            return {
                question: `\\sqrt{${a}} + \\sqrt{${b}}`,
                answer: `${Math.sqrt(a) + Math.sqrt(b)}`
            };
        }
    ];

    return randChoice(exercises)();
}

// Level 2: Multiplication and Division of radicals
function racineLevel2() {
    const operations = [
        {
            generate: () => {
                const a = randInt(2, 20);
                const b = randInt(2, 20);
                return {
                    question: `\\sqrt{${a}} \\times \\sqrt{${b}}`,
                    answer: `\\sqrt{${a * b}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 20);
                const b = randInt(2, 10);
                const c = a * b;
                return {
                    question: `\\dfrac{\\sqrt{${c}}}{\\sqrt{${a}}}`,
                    answer: `\\sqrt{${b}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 15);
                const b = randInt(2, 15);
                const numerator = a * b;
                return {
                    question: `\\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}}`,
                    answer: `\\sqrt{\\dfrac{${a}}{${b}}}`
                };
            }
        },
        {
            generate: () => {
                const a = randInt(2, 20);
                return {
                    question: `(\\sqrt{${a}})^{2}`,
                    answer: `${a}`
                };
            }
        }
    ];

    return randChoice(operations).generate();
}

// Level 2+: Addition and Subtraction of radicals (Remarkable Identities)
function racineLevel2plus() {
    const operations = [
        // (a + b)²
        () => {
            const a = randInt(2, 20);
            const b = randInt(2, 20);
            return {
                question: `(\\sqrt{${a}} + \\sqrt{${b}})^2`,
                answer: `${a} + ${b} + 2\\sqrt{${a * b}}`
            };
        },
        // (a - b)²
        () => {
            const a = randInt(2, 20);
            const b = randInt(2, 20);
            return {
                question: `(\\sqrt{${a}} - \\sqrt{${b}})^2`,
                answer: `${a} + ${b} - 2\\sqrt{${a * b}}`
            };
        },
        // (a + b)(a - b)
        () => {
            const a = randInt(2, 20);
            const b = randInt(2, 20);
            return {
                question: `(\\sqrt{${a}} + \\sqrt{${b}})(\\sqrt{${a}} - \\sqrt{${b}})`,
                answer: `${a} - ${b}`
            };
        },
        // Variation: (ka + b)²
        () => {
            const a = randInt(2, 20);
            const b = randInt(2, 20);
            const k = randInt(2, 5);
            return {
                question: `(${k}\\sqrt{${a}} + \\sqrt{${b}})^2`,
                answer: `${k*k*a} + ${b} + ${2*k}\\sqrt{${a * b}}`
            };
        },
        // Variation: (a + kb)²
        () => {
            const a = randInt(2, 20);
            const b = randInt(2, 20);
            const k = randInt(2, 5);
            return {
                question: `(\\sqrt{${a}} + ${k}\\sqrt{${b}})^2`,
                answer: `${a} + ${k*k*b} + ${2*k}\\sqrt{${a * b}}`
            };
        }
    ];

    return randChoice(operations)();
}

// Level 3: Rationalize denominators with a single term
function racineLevel3() {
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

// Level 4: Rationalizing denominators with binomial denominators
function racineLevel4() {
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

    const newNumerator = `${numerator} \\times (${conjugate})`;
    const denominatorProduct = `( \\sqrt{${radicand}} )^{2} - ( ${constant} )^{2}`;
    const simplifiedDenominator = radicand - constant * constant;

    const answer = ` \\dfrac{${newNumerator}}{${simplifiedDenominator}} `;

    return { question, answer };
}

// Level 5: Simplifying expressions involving variables under radicals
function racineLevel5() {
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

// Level 6: Simplifying sums and differences of radicals with perfect squares
function racineLevel6() {
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

// Level 7: More complex simplification of sums and differences of radicals
function racineLevel7() {
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

// Level 8: Diversification of previous levels with increased difficulty
function racineLevel8() {
    const operations = [
        // Exercise Type A: Rationalization and simplification
        () => {
            // Simplify the expression: (a + b) / (a - b)
            const a = randChoice([9, 16, 25, 36]);
            const b = randChoice([1, 4, 9, 16]);
            if (a === b) return null; // Avoid zero denominator
            const question = `\\dfrac{ \\sqrt{${a}} + \\sqrt{${b}} }{ \\sqrt{${a}} - \\sqrt{${b}} }`;

            // Multiply numerator and denominator by the conjugate
            // Answer: (a + b)^2 / (a - b)
            const numerator = `( \\sqrt{${a}} + \\sqrt{${b}} )^{2}`;
            const denominator = `${a - b}`;
            const simplifiedNumerator = `${a} + 2 \\sqrt{${a * b}} + ${b}`;
            const answer = `\\dfrac{ ${simplifiedNumerator} }{ ${denominator} }`;

            return { question, answer };
        },

        // Exercise Type B: Simplifying sums of radicals
        () => {
            // Simplify the expression: a + b + c
            const radicands = [12, 27, 75, 20, 45, 80, 18];
            const a = randChoice(radicands);
            const b = randChoice(radicands);
            const c = randChoice(radicands);
            const question = `\\sqrt{${a}} + \\sqrt{${b}} + \\sqrt{${c}}`;

            // Simplify each radical
            function simplifyRadical(n) {
                let outside = 1;
                let inside = n;
                for (let i = 2; i <= Math.floor(Math.sqrt(inside)); i++) {
                    while (inside % (i * i) === 0) {
                        outside *= i;
                        inside /= i * i;
                    }
                }
                if (inside === 1) {
                    return `${outside}`;
                } else {
                    return `${outside === 1 ? '' : outside} \\sqrt{${inside}}`;
                }
            }

            const simplifiedA = simplifyRadical(a);
            const simplifiedB = simplifyRadical(b);
            const simplifiedC = simplifyRadical(c);
            const answer = `${simplifiedA} + ${simplifiedB} + ${simplifiedC}`;

            return { question, answer };
        },

        // Exercise Type C: Multiplication involving variables
        () => {
            // Simplify the expression: (a²b) × (ab³)
            const a = randInt(2, 5);
            const b = randInt(2, 5);
            const question = `\\sqrt{${a}^2 \\times ${b}} \\times \\sqrt{${a} \\times ${b}^3}`;

            // Simplify the expression step by step
            // (a²b) = ab
            // (ab³) = (a) × bb
            // Multiply: ab × (a × bb) = a × a × b × b × b = a × b × a × b = a × b² × a
            const answer = `${a} \\times ${b * b} \\sqrt{${a}}`;

            return { question, answer };
        },

        // Exercise Type E: Rationalization with binomial denominators
        () => {
            // Simplify the expression: 1 / (a + b)
            const a = randChoice([2, 3, 5]);
            const b = randChoice([2, 3, 5].filter(n => n !== a));
            const question = `\\dfrac{1}{ \\sqrt{${a}} + \\sqrt{${b}} }`;

            // Multiply numerator and denominator by the conjugate
            // Result: (a - b) / (a - b)
            const denominator = `${a - b}`;
            const answer = `\\dfrac{ \\sqrt{${a}} - \\sqrt{${b}} }{ ${denominator} }`;

            return { question, answer };
        },

        // Exercise Type F: Simplifying radicals with variables and exponents
        () => {
            // Simplify the expression: (x^m y^n)
            const variables = ['x', 'y', 'z'];
            const var1 = randChoice(variables);
            const var2 = randChoice(variables.filter(v => v !== var1));
            const exp1 = randInt(2, 4) * 2; // Even exponent
            const exp2 = randInt(1, 5) * 2; // Even exponent
            const question = `\\sqrt{ ${var1}^{${exp1}} ${var2}^{${exp2}} }`;
            const simplifiedVar1 = `${var1}^{${exp1 / 2}}`;
            const simplifiedVar2 = `${var2}^{${exp2 / 2}}`;
            const answer = `${simplifiedVar1} ${simplifiedVar2}`;

            return { question, answer };
        },

        // Exercise Type G: Combining rationalization and conjugates
        () => {
            // Simplify the expression: (a - b) / (a + b)
            const a = randChoice([2, 3, 5]);
            const b = randChoice([2, 3, 5].filter(n => n !== a));
            const numerator = `\\sqrt{${a}} - \\sqrt{${b}}`;
            const denominator = `\\sqrt{${a}} + \\sqrt{${b}}`;
            const question = `\\dfrac{ ${numerator} }{ ${denominator} }`;

            // Multiply numerator and denominator by (a - b)
            // Result: (a - 2(ab) + b) / (a - b)
            const denominatorValue = a - b;
            const simplifiedNumerator = `${a} - 2 \\sqrt{${a * b}} + ${b}`;
            const answer = `\\dfrac{ ${simplifiedNumerator} }{ ${denominatorValue} }`;

            return { question, answer };
        },

        // Exercise Type H: Simplifying expressions with coefficients
        () => {
            // Simplify the expression: 218 - 38 + 50
            const terms = [];
            for (let i = 0; i < 3; i++) {
                const coeff = randChoice([1, 2, -1, -2, 3, -3]);
                const radicand = randChoice([8, 18, 32, 50, 72]);
                terms.push(`${coeff === 1 ? '' : coeff === -1 ? '-' : coeff} \\sqrt{${radicand}}`);
            }
            const question = terms.join(' ').replace(/\s-\s/g, ' - ').replace(/\s\+\s/g, ' + ');

            // Simplify each radical and combine like terms
            function simplifyTerm(term) {
                const [coeffStr, sqrtPart] = term.split('\\sqrt{');
                const coeff = coeffStr === '' ? 1 : coeffStr === '-' ? -1 : parseInt(coeffStr);
                const radicand = parseInt(sqrtPart.replace('}', ''));
                let outside = 1;
                let inside = radicand;
                for (let i = 2; i <= Math.floor(Math.sqrt(inside)); i++) {
                    while (inside % (i * i) === 0) {
                        outside *= i;
                        inside /= i * i;
                    }
                }
                const totalCoeff = coeff * outside;
                return { coeff: totalCoeff, radicand: inside };
            }

            const simplifiedTerms = terms.map(simplifyTerm);
            const likeTerms = {};
            simplifiedTerms.forEach(({ coeff, radicand }) => {
                const key = radicand;
                if (likeTerms[key]) {
                    likeTerms[key] += coeff;
                } else {
                    likeTerms[key] = coeff;
                }
            });

            const answerTerms = Object.entries(likeTerms)
                .filter(([_, coeff]) => coeff !== 0)
                .map(([radicand, coeff]) => {
                    const coeffStr = coeff === 1 ? '' : coeff === -1 ? '-' : coeff;
                    return `${coeffStr} \\sqrt{${radicand}}`;
                });
            const answer = answerTerms.join(' ').replace(/\s-\s/g, ' - ').replace(/\s\+\s/g, ' + ');

            return { question, answer };
        },
    ];

    // Randomly select an exercise from the operations list
    let exercise = null;
    while (!exercise) {
        exercise = randChoice(operations)();
    }
    exercise.level = 8;
    exercise.questionText = `${formatText("Simplifiez l'expression suivante :")}`;
    return exercise;
}

// Level EQ: Simple quadratic equations
function racineLevelEQ() {
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
    const [showPDFGallery, setShowPDFGallery] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const startTime = new Date();
        return () => {
          const endTime = new Date();
          const timeSpent = (endTime - startTime) / 1000; // in seconds
          ReactGA.event({
            category: 'User Engagement',
            action: 'Time Spent',
            label: 'Racine Carrée',
            value: Math.round(timeSpent)
          });
        };
    }, []);

    const generateExercises = useCallback((selectedLevel = level) => {
        const newExercises = [];
        for (let i = 0; i < numExercises; i++) {
            newExercises.push({...createExercise(selectedLevel), id: Date.now() + i});
        }
        setExercises(newExercises);
        ReactGA.event({
            category: 'Exercise',
            action: 'Generate',
            label: `Level ${selectedLevel}`,
            value: numExercises
        });
    }, [numExercises, level]);

    // Level colors for buttons
    const levelColors = {
        1: '#d8ebff',
        2: '#b0d4ff',
        '2plus': '#a0c0ff',
        3: '#89c4ff',
        4: '#62b5ff',
        5: '#3aa5ff',
        6: '#0080ff',
        7: '#0059b3',
        8: '#002966',
        'EQ': '#800080', // Purple color for equations level
    };
      
    return (
        <div className="container_racine responsive-container">
            <Card sx={{ mb: 0.4, p: 0.2 }}>
                <CardContent style={{ backgroundColor: 'rgb(173, 136, 39, 0.25)'}}>
                    <h1 className="responsive-heading">
                        {formatText('Générateur d\'Exercices - Les Racines Carrées')}
                    </h1>
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
                            <div className="level-buttons responsive-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
                                {[1, 2, '2plus', 3, 4, 5, 6, 7, 8, 'EQ'].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => {
                                            setLevel(lvl);
                                            generateExercises(lvl);
                                        }}
                                        variant="contained"
                                        style={{
                                            margin: isMobile ? '3px' : '5px',
                                            padding: isMobile ? '6px 12px' : '10px 20px',
                                            backgroundColor: levelColors[lvl],
                                            color: '#fff',
                                            fontSize: isMobile ? '0.85rem' : '1rem',
                                        }}
                                    >
                                        Niveau {lvl === '2plus' ? '2+' : lvl === 'EQ' ? 'EQ (Équations)' : lvl}
                                    </Button>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: '20px' }}>
                        <Button 
                            variant="contained" 
                            onClick={() => generateExercises(level)}
                            className="generate-button"
                        >
                            Générer les Exercices
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container" className="responsive-exercise-container">
                {exercises.map((exercise, index) => (
                    <Exercise 
                        key={exercise.id} 
                        exercise={exercise} 
                        index={index} 
                        className="responsive-exercise"
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
        </div>
    );
}

export default ExerciseGeneratorRacines;