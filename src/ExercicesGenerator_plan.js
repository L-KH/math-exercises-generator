// ExercicesGenerator_plan.js with responsive design

import React, { useState, useCallback, useEffect } from 'react';
import Exercise from './Exercise'; 
import { Button, TextField, Grid, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import ReactGA from 'react-ga4';
import './PlanStyles.css'; // We'll create this CSS file

// Helper functions
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(array) {
    return array[randInt(0, array.length - 1)];
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
        [a, b] = [b, a];
    }
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Function to simplify fractions
function simplifyFraction(numerator, denominator) {
    if (numerator === 0) return { numerator: 0, denominator: 1 };
    if (denominator === 0) return { numerator: 1, denominator: 0 }; // Represent undefined
    
    const divisor = gcd(numerator, denominator);
    let sign = 1;
    
    if (denominator < 0) {
        sign = -1;
    }
    
    return {
        numerator: (numerator / divisor) * sign,
        denominator: Math.abs(denominator / divisor)
    };
}

// Format a fraction for display
function formatFraction(numerator, denominator) {
    if (denominator === 0) return "\\text{Non défini}";
    if (numerator === 0) return "0";
    
    const simplified = simplifyFraction(numerator, denominator);
    numerator = simplified.numerator;
    denominator = simplified.denominator;
    
    if (denominator === 1) return numerator.toString();
    
    return `\\frac{${numerator}}{${denominator}}`;
}

// Format a point for display
function formatPoint(x, y) {
    return `(${x}, ${y})`;
}

// Format a vector for display
function formatVector(x, y) {
    return `(${x}, ${y})`;
}

// Format text in LaTeX to preserve spaces
function formatText(text) {
    return `\\text{${text}}`;
}

// Calculate distance between two points
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Calculate the midpoint of two points
function midpoint(x1, y1, x2, y2) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    return {
        x: midX,
        y: midY,
        xFormatted: Number.isInteger(midX) ? midX : formatFraction(x1 + x2, 2),
        yFormatted: Number.isInteger(midY) ? midY : formatFraction(y1 + y2, 2)
    };
}

// Main Exercise Generator function
function createExercise(level) {
    let exercise = {};
    let questionText = '';

    switch(level) {
        case 1:
            exercise = createVectorExercise();
            questionText = 'Déterminer le vecteur :';
            break;
        case 2:
            exercise = createDistanceExercise();
            questionText = 'Calculer la distance :';
            break;
        case 3:
            exercise = createMidpointExercise();
            questionText = 'Déterminer le milieu du segment :';
            break;
        case 4:
            exercise = createInverseProblemExercise();
            questionText = 'Déterminer le point manquant :';
            break;
        case 5:
            exercise = createParallelogramExercise();
            questionText = 'Vérifier si les points forment un parallélogramme :';
            break;
        default:
            exercise = createVectorExercise();
            questionText = 'Déterminer le vecteur :';
    }

    return { ...exercise, questionText };
}

// Exercise 1: Vector Operations
function createVectorExercise() {
    // Generate random coordinates for points A and B
    const x1 = randInt(-5, 5);
    const y1 = randInt(-5, 5);
    const x2 = randInt(-5, 5);
    const y2 = randInt(-5, 5);
    
    // Compute vector AB
    const vectorX = x2 - x1;
    const vectorY = y2 - y1;
    
    const question = `A${formatPoint(x1, y1)} \\; ${formatText("et")} \\; B${formatPoint(x2, y2)}. \\; ${formatText("Calculer")} \\; \\overrightarrow{AB}.`;
    const answer = `\\overrightarrow{AB} = ${formatVector(vectorX, vectorY)}`;
    
    return { question, answer };
}

// Exercise 2: Distance Between Two Points
function createDistanceExercise() {
    // Generate random coordinates for points A and B
    const x1 = randInt(-5, 5);
    const y1 = randInt(-5, 5);
    const x2 = randInt(-5, 5);
    const y2 = randInt(-5, 5);
    
    // Compute distance
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distanceValue = Math.sqrt(dx*dx + dy*dy);
    
    // Create a prettier expression for the answer
    const distanceExpr = `\\sqrt{(${x2} - ${x1})^2 + (${y2} - ${y1})^2} = \\sqrt{${dx*dx} + ${dy*dy}}`;
    
    // Check if distance is a perfect square
    const isRationalValue = Number.isInteger(distanceValue);
    const exactValue = isRationalValue ? distanceValue.toString() : `\\sqrt{${dx*dx + dy*dy}}`;
    const approxValue = distanceValue.toFixed(2);
    
    const question = `${formatText("Soient")} \\; A${formatPoint(x1, y1)} \\; ${formatText("et")} \\; B${formatPoint(x2, y2)}. \\; ${formatText("Calculer la distance")} \\; AB.`;
    const answer = `d(A,B) = ${distanceExpr} = ${exactValue}${!isRationalValue ? ` \\approx ${approxValue}` : ''}`;
    
    return { question, answer };
}

// Exercise 3: Midpoint of a Segment
function createMidpointExercise() {
    // Generate random coordinates for points A and B
    const x1 = randInt(-5, 5);
    const y1 = randInt(-5, 5);
    const x2 = randInt(-5, 5);
    const y2 = randInt(-5, 5);
    
    // Compute midpoint
    const mid = midpoint(x1, y1, x2, y2);
    
    const question = `${formatText("Déterminer le milieu du segment")} \\; [AB] \\; ${formatText("où")} \\; A${formatPoint(x1, y1)} \\; ${formatText("et")} \\; B${formatPoint(x2, y2)}.`;
    const answer = `${formatText("Le milieu M du segment")} \\; [AB] \\; ${formatText("est")} \\; M${formatPoint(mid.xFormatted, mid.yFormatted)}`;
    
    return { question, answer };
}

// Exercise 4: Inverse Problem - Find the Missing Point
function createInverseProblemExercise() {
    // Generate random coordinates for point A
    const xA = randInt(-5, 5);
    const yA = randInt(-5, 5);
    
    // Generate random coordinates for point B
    const xB = randInt(-5, 5);
    const yB = randInt(-5, 5);
    
    // Compute midpoint
    const mid = midpoint(xA, yA, xB, yB);
    
    // For the question, we provide A and M, and ask for B
    const question = `${formatText("Si le milieu de")} \\; [AB] \\; ${formatText("est")} \\; M${formatPoint(mid.x, mid.y)} \\; ${formatText("et")} \\; A${formatPoint(xA, yA)}, \\; ${formatText("trouver")} \\; B.`;
    
    // For finding B, we use B = 2M - A
    const xB_calc = 2 * mid.x - xA;
    const yB_calc = 2 * mid.y - yA;
    
    const answer = `B${formatPoint(xB, yB)}. \\\\
    ${formatText("Méthode : Si M est le milieu de [AB], alors B = 2M - A.")} \\\\
    ${formatText("Donc")} \\; B = 2 \\times ${formatPoint(mid.x, mid.y)} - ${formatPoint(xA, yA)} = ${formatPoint(xB_calc, yB_calc)}`;
    
    return { question, answer };
}

// Exercise 5: Parallelogram Verification
function createParallelogramExercise() {
    // Generate random coordinates for points A, B, and C
    const xA = randInt(-5, 5);
    const yA = randInt(-5, 5);
    const xB = randInt(-5, 5);
    const yB = randInt(-5, 5);
    const xC = randInt(-5, 5);
    const yC = randInt(-5, 5);
    
    // Compute point D so that ABCD is a parallelogram
    // Using the property that in a parallelogram, opposite sides are equal and parallel
    // So D = C + (B - A) or equivalently D = B + C - A
    const xD = xB + xC - xA;
    const yD = yB + yC - yA;
    
    // Compute vector AB
    const vectorAB_x = xB - xA;
    const vectorAB_y = yB - yA;
    
    // Create question text
    const question = `${formatText("Dans un repère orthonormé (O ; i ; j)")} \\\\
    ${formatText("on donne les points :")} \\\\
    A${formatPoint(xA, yA)} ${formatText("et")} B${formatPoint(xB, yB)} ${formatText("et")} C${formatPoint(xC, yC)} \\\\
    ${formatText("Calculer les coordonnées du point D")} \\\\
    ${formatText("tel que :")} \\\\
    \\overrightarrow{AB} = \\overrightarrow{CD}`;
    
    // Create answer
    const answer = `${formatText("On a le vecteur")} \\; \\overrightarrow{AB} = ${formatVector(vectorAB_x, vectorAB_y)} \\\\
    
    ${formatText("Si")} \\; \\overrightarrow{AB} = \\overrightarrow{CD} \\; ${formatText("alors")} \\; \\overrightarrow{CD} = ${formatVector(vectorAB_x, vectorAB_y)} \\\\
    
    ${formatText("Donc")} \\; D = C + \\overrightarrow{CD} = ${formatPoint(xC, yC)} + ${formatVector(vectorAB_x, vectorAB_y)} = ${formatPoint(xD, yD)} \\\\
    
    ${formatText("On peut aussi utiliser la relation")} \\; D = B + C - A \\; ${formatText("(propriété du parallélogramme)")} \\\\
    D = ${formatPoint(xB, yB)} + ${formatPoint(xC, yC)} - ${formatPoint(xA, yA)} = ${formatPoint(xD, yD)}`;
    
    return { question, answer };
}

// Main Component
function ExerciseGeneratorPlan() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(10);
    const [level, setLevel] = useState(1);
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
                label: 'Repère dans le Plan',
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
        1: '#ffe5e5', // Light crimson
        2: '#ffb3b3', // Medium light crimson
        3: '#ff8080', // Medium crimson
        4: '#ff4d4d', // Medium dark crimson
        5: '#cc0000', // Dark crimson
    };

    return (
        <div className="container plan-container">
            <Card sx={{ mb: 0.4, p: 0.2 }}>
               <CardContent style={{ backgroundColor: 'rgba(204, 0, 0, 0.1)'}}>

                    <h1 className="responsive-heading">Générateur d'Exercices - Repère dans le Plan</h1>
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
                                {[1, 2, 3, 4, 5].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => {
                                            setLevel(lvl);
                                            generateExercises(lvl);
                                        }}
                                        variant="contained"
                                        className="level-button"
                                        style={{
                                            margin: isMobile ? '3px' : '5px',
                                            padding: isMobile ? '6px 12px' : '10px 20px',
                                            backgroundColor: levelColors[lvl],
                                            color: '#fff',
                                            fontSize: isMobile ? '0.85rem' : '1rem',
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
                    <Button variant="outlined" onClick={() => window.print()}>Imprimer les Exercices</Button>
                </div>
            )}
        </div>
    );
}

export default ExerciseGeneratorPlan;