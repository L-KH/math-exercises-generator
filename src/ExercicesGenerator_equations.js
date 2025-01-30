// ExercicesGenerator_equations.js
import React, { useState, useCallback, useEffect } from 'react';
import Exercise from './Exercise';
import { Button, TextField, Grid, Card, CardContent } from '@mui/material';
import ReactGA from 'react-ga4';

// ================ Helper Functions ================
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

function formatFraction(numerator, denominator) {
    if (denominator === 1) return `${numerator}`;
    if (denominator < 0) {
        numerator = -numerator;
        denominator = -denominator;
    }
    return `\\frac{${numerator}}{${denominator}}`;
}

function simplifyFraction(numerator, denominator) {
    const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
}

function formatTerm(coefficient, variable = 'x', showPlus = false) {
    if (coefficient === 0) return '';
    const sign = showPlus && coefficient > 0 ? '+' : '';
    if (coefficient === 1) return `${sign}${variable}`;
    if (coefficient === -1) return `-${variable}`;
    return `${sign}${coefficient}${variable}`;
}

// ================ Exercise Creation Functions ================

// Level 1: Basic Equations (ax = b or x + a = b)
function level1() {
    // Randomly choose between ax = b and a + x = b types
    const type = Math.random() < 0.5 ? 'multiplication' : 'addition';
    
    if (type === 'multiplication') {
        const a = randNonZeroInt(-10, 10);
        const x = randInt(-10, 10);
        const b = a * x;

        // Create fraction for answer if result isn't an integer
        const { numerator, denominator } = simplifyFraction(b, a);
        const answer = formatFraction(numerator, denominator);

        return {
            question: `${a}x = ${b}`,
            answer: `x = ${answer}`,
            questionText: 'Résoudre l\'équation :'
        };
    } else {
        const a = randInt(-20, 20);
        const x = randInt(-20, 20);
        const b = a + x;

        return {
            question: `x ${a >= 0 ? '+' : ''} ${a} = ${b}`,
            answer: `x = ${b - a}`,
            questionText: 'Résoudre l\'équation :'
        };
    }
}


// Level 2: Equations with Addition/Subtraction (ax + b = c)
function level2() {
    const a = randNonZeroInt(-10, 10);
    const b = randInt(-20, 20);
    const x = randInt(-10, 10);
    const c = a * x + b;

    // Calculate fraction answer
    const { numerator, denominator } = simplifyFraction(c - b, a);
    const answer = formatFraction(numerator, denominator);

    return {
        question: `${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}`,
        answer: `x = ${answer}`,
        questionText: 'Résoudre l\'équation :'
    };
}

// Level 3: Equations with Fractions
function level3() {
    const numerator = randNonZeroInt(-10, 10);
    const denominator = randNonZeroInt(2, 10);
    const x = randInt(-10, 10);
    const result = numerator * x;

    return {
        question: `${formatFraction(numerator + 'x', denominator)} = ${formatFraction(result, denominator)}`,
        answer: `x = ${x}`,
        questionText: 'Résoudre l\'équation :'
    };
}
// Level 4: Simple Inequations (ax + b ≤ c)
function level4() {
    const a = randNonZeroInt(-10, 10);
    const b = randInt(-20, 20);
    const c = randInt(-20, 20);
    const inequalitySymbols = ['<', '>', '\\leq', '\\geq'];
    const symbol = inequalitySymbols[randInt(0, 3)];
    
    const { numerator, denominator } = simplifyFraction(c - b, a);
    const solution = formatFraction(numerator, denominator);
    
    const finalSymbol = a > 0 ? symbol : {
        '<': '>',
        '>': '<',
        '\\leq': '\\geq',
        '\\geq': '\\leq'
    }[symbol];

    return {
        question: `${a}x ${b >= 0 ? '+' : ''} ${b} ${symbol} ${c}`,
        answer: `x ${finalSymbol} ${solution}`,
        questionText: 'Résoudre l\'inéquation :'
    };
}

// Level 5: Combined Equations (ax + b = cx + d)
function level5() {
    const a = randNonZeroInt(-10, 10);
    const b = randInt(-20, 20);
    const c = randNonZeroInt(-10, 10);
    const x = randInt(-10, 10);
    const d = a * x + b - c * x;

    const { numerator, denominator } = simplifyFraction(d - b, a - c);

    return {
        question: `${a}x ${b >= 0 ? '+' : ''} ${b} = ${c}x ${d >= 0 ? '+' : ''} ${d}`,
        answer: `x = ${formatFraction(numerator, denominator)}`,
        questionText: 'Résoudre l\'équation :'
    };
}

// Level 6: Inequations with Fractions
function level6() {
    const numerator = randNonZeroInt(-10, 10);
    const denominator = randNonZeroInt(2, 10);
    const b = randInt(-10, 10);
    const c = randInt(-10, 10);
    const inequalitySymbols = ['<', '>', '\\leq', '\\geq'];
    const symbol = inequalitySymbols[randInt(0, 3)];

    const adjustedRight = (c - b) * denominator;
    const { numerator: solNum, denominator: solDen } = simplifyFraction(adjustedRight, numerator);
    
    const finalSymbol = numerator > 0 ? symbol : {
        '<': '>',
        '>': '<',
        '\\leq': '\\geq',
        '\\geq': '\\leq'
    }[symbol];

    return {
        question: `${formatFraction(`${numerator}x`, denominator)} ${b >= 0 ? '+' : ''} ${b} ${symbol} ${c}`,
        answer: `x ${finalSymbol} ${formatFraction(solNum, solDen)}`,
        questionText: 'Résoudre l\'inéquation (fraction) :'
    };
}

// Level 7: Word Problems - Equations
function level7() {
    const problemTypes = [
        // Rectangle problem
        () => {
            const width = randInt(5, 15);
            const area = width * randInt(5, 15);
            const solution = area / width;
            return {
                question: `Un rectangle a une largeur de ${width} mètres et une aire de ${area} mètres carrés. Quelle est sa longueur ?`,
                answer: `x = ${solution}`,
                steps: `1) Soit x la longueur du rectangle\n2) L'aire = largeur × longueur\n3) ${area} = ${width} × x\n4) x = ${solution}`,
                questionText: 'Résoudre le problème en posant une équation :'
            };
        },
        // Age problem
        () => {
            const currentAge = randInt(20, 50);
            const yearsPast = randInt(5, 15);
            const pastAge = currentAge - yearsPast;
            return {
                question: "Il y a " + yearsPast + " ans, l'âge d'une personne était de " + pastAge + " ans. Quel est son âge actuel ?",
                answer: "x = " + currentAge,
                steps: "1) Soit x l'âge actuel\n2) Il y a " + yearsPast + " ans : x - " + yearsPast + " = " + pastAge + "\n3) x = " + currentAge,
                questionText: "Résoudre le problème en posant une équation :"
            };
        },
        // Distance/Speed/Time problem
        () => {
            const speed = randInt(40, 120);
            const time = randInt(1, 5);
            const distance = speed * time;
            return {
                question: "Une voiture roule à " + speed + " km/h pendant " + time + " heures. Quelle distance a-t-elle parcourue ?",
                answer: "x = " + distance,
                steps: "1) Soit x la distance parcourue\n2) distance = vitesse × temps\n3) x = " + speed + " × " + time + "\n4) x = " + distance,
                questionText: "Résoudre le problème en posant une équation :"
            };
        },
        // Number problem
        () => {
            const number = randInt(10, 50);
            const triple = number * 3;
            return {
                question: `Le triple d'un nombre est égal à ${triple}. Quel est ce nombre ?`,
                answer: `x = ${number}`,
                steps: `1) Soit x le nombre cherché\n2) 3x = ${triple}\n3) x = ${number}`,
                questionText: 'Résoudre le problème en posant une équation :'
            };
        },
        // Money/Price problem
        () => {
            const unitPrice = randInt(5, 20);
            const total = unitPrice * randInt(5, 15);
            const quantity = total / unitPrice;
            return {
                question: "Des articles coûtent " + unitPrice + " euros chacun. Le total est de " + total + " euros. Combien d'articles ont été achetés ?",
                answer: "x = " + quantity,
                steps: "1) Soit x le nombre d'articles\n2) " + unitPrice + "x = " + total + "\n3) x = " + quantity,
                questionText: "Résoudre le problème en posant une équation :"
            };
        }
    ];

    return problemTypes[randInt(0, problemTypes.length - 1)]();
}

// Level 8: Word Problems - Inequations
function level8() {
    const problemTypes = [
        // Subscription comparison (fixed template literals)
        () => {
            const rateA = randInt(5, 15);
            const fixedFeeB = randInt(50, 150);
            const rateB = randInt(2, rateA - 1);
            const breakEvenSessions = Math.ceil(fixedFeeB / (rateA - rateB));
            
            return {
                question: `Le tarif A coûte ${rateA} € par séance. Le tarif B a un abonnement annuel de ${fixedFeeB} € plus ${rateB} € par séance. À partir de combien de séances le tarif B devient-il plus économique ?`,
                answer: `x > ${breakEvenSessions}`,
                steps: `1) Soit x le nombre de séances\n2) Tarif A: ${rateA}x\n3) Tarif B: ${fixedFeeB} + ${rateB}x\n4) ${rateB}x + ${fixedFeeB} < ${rateA}x\n5) ${fixedFeeB} < ${rateA - rateB}x\n6) x > ${breakEvenSessions}`,
                questionText: 'Résoudre le problème en posant une inéquation :'
            };
        },
        // Budget constraint (improved spacing)
        () => {
            const budget = randInt(50, 200);
            const itemCost = randInt(5, 20);
            const maxItems = Math.floor(budget / itemCost);
            
            return {
                question: `Avec un budget de ${budget} €, combien d'articles à ${itemCost} € peut-on acheter au maximum ?`,
                answer: `x ≤ ${maxItems}`,
                steps: `1) Soit x le nombre d'articles\n2) Prix total: ${itemCost}x\n3) Budget maximum: ${budget}\n4) ${itemCost}x ≤ ${budget}\n5) x ≤ ${maxItems}`,
                questionText: 'Résoudre le problème en posant une inéquation :'
            };
        }
    ];

    return problemTypes[randInt(0, problemTypes.length - 1)]();
}

// Level 9: Produit Nul (ax + b)(cx + d) = 0
function level9() {
    const a = randNonZeroInt(-6, 6);
    const b = randInt(-10, 10);
    const c = randNonZeroInt(-6, 6);
    const d = randInt(-10, 10);

    const { numerator: sol1Num, denominator: sol1Den } = simplifyFraction(-b, a);
    const { numerator: sol2Num, denominator: sol2Den } = simplifyFraction(-d, c);

    return {
        question: `(${a}x ${b >= 0 ? '+' : ''} ${b})(${c}x ${d >= 0 ? '+' : ''} ${d}) = 0`,
        answer: `x = ${formatFraction(sol1Num, sol1Den)} ou x = ${formatFraction(sol2Num, sol2Den)}`,
        questionText: 'Résoudre l\'équation (produit nul) :'
    };
}

// ================ Main Exercise Generator ================
function createExercise(level) {
    let exercise = {};
    
    switch (level) {
        case 1:
            exercise = level1();
            break;
        case 2:
            exercise = level2();
            break;
        case 3:
            exercise = level3();
            break;
        case 4:
            exercise = level4();
            break;
        case 5:
            exercise = level5();
            break;
        case 6:
            exercise = level6();
            break;
        case 7:
            exercise = level7();
            break;
        case 8:
            exercise = level8();
            break;
        case 9:
            exercise = level9();
            break;
        default:
            exercise = level1();
    }

    return {
        ...exercise,
        questionText: exercise.questionText || 'Résoudre :',
        level // Add level to help with re-rendering
    };
}

// ================ Main Component ================
function ExerciseGeneratorEquations() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [level, setLevel] = useState(1);
    const [exerciseKey, setExerciseKey] = useState(0);

    useEffect(() => {
        const startTime = new Date();
        return () => {
            const endTime = new Date();
            const timeSpent = (endTime - startTime) / 1000;
            ReactGA.event({
                category: 'User Engagement',
                action: 'Time Spent',
                label: 'Equations',
                value: Math.round(timeSpent)
            });
        };
    }, []);

    const generateExercises = useCallback((selectedLevel) => {
        const newExercises = [];
        const currentLevel = selectedLevel || level;
        
        for (let i = 0; i < numExercises; i++) {
            newExercises.push({
                ...createExercise(currentLevel),
                id: Date.now() + i
            });
        }
        
        setExercises(newExercises);
        setExerciseKey(prev => prev + 1);
        
        ReactGA.event({
            category: 'Exercise',
            action: 'Generate',
            label: `Level ${currentLevel}`,
            value: numExercises
        });
    }, [numExercises, level]);

    const handleLevelChange = useCallback((newLevel) => {
        setLevel(newLevel);
        generateExercises(newLevel);
    }, [generateExercises]);

    const levelColors = {
        1: '#FFF3E0', // Lightest orange
        2: '#FFE0B2',
        3: '#FFCC80',
        4: '#FFB74D',
        5: '#FFA726',
        6: '#FF9800', // Standard orange
        7: '#F57C00',
        8: '#E65100', // Darkest orange
        9: '#BF360C'  // Deep orange
    };

    return (
        <div className="container_equations">
        <Card sx={{ 
            mb: 0.4, 
            p: 0.2,
            fontFamily: 'Arial, sans-serif', // Added font family
            overflow: 'hidden' 
        }}>
            <CardContent style={{ 
                backgroundColor: 'rgb(255, 152, 0, 0.1)',
                wordWrap: 'break-word' 
            }}>
                    <h1 style={{ color: '#E65100' }}>Générateur d'Exercices - Équations et Inéquations</h1>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                value={numExercises}
                                onChange={(e) => setNumExercises(Number(e.target.value))}
                                label="Nombre d'Exercices"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: '#FF9800',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FF9800',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="level-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => handleLevelChange(lvl)}
                                        variant="contained"
                                        style={{
                                            margin: '5px',
                                            backgroundColor: levelColors[lvl],
                                            color: lvl > 5 ? '#fff' : '#000',
                                            '&:hover': {
                                                backgroundColor: levelColors[lvl + 1]
                                            }
                                        }}
                                    >
                                        Niveau {lvl}
                                    </Button>
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: '20px' }}>
                        <Button 
                            variant="contained" 
                            onClick={() => generateExercises()}
                            style={{
                                backgroundColor: '#FF9800',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#F57C00'
                                }
                            }}
                        >
                            Générer les Exercices
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container" key={exerciseKey}>
                {exercises.map((exercise, index) => (
                    <Exercise 
                        key={`${exercise.id}-${exercise.level}`}
                        exercise={exercise} 
                        index={index} 
                    />
                ))}
            </div>
            {exercises.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button 
                        variant="outlined" 
                        onClick={() => window.print()}
                        style={{
                            color: '#FF9800',
                            borderColor: '#FF9800',
                            '&:hover': {
                                borderColor: '#F57C00',
                                color: '#F57C00'
                            }
                        }}
                    >
                        Imprimer les Exercices
                    </Button>
                </div>
            )}
        </div>
    );
}
export default ExerciseGeneratorEquations;
