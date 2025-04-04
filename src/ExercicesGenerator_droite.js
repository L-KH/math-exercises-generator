// ExercicesGenerator_droite.js - Created for graphing linear equations
import React, { useState, useCallback, useEffect } from 'react';
import Exercise from './Exercise';
import { Button, TextField, Grid, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';
import ReactGA from 'react-ga4';
import './ResponsiveMath.css';

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
    // If either is 0, handle specially
    if (numerator === 0) return { numerator: 0, denominator: 1 };
    if (denominator === 0) return { numerator: numerator > 0 ? 1 : -1, denominator: 0 };
    
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

// Format text in LaTeX to preserve spaces
function formatText(text) {
    return `\\text{${text}}`;
}

// ================ Linear Equation Graphing Functions ================

// Function to generate points for plotting (simplified version)
function generatePoints(a, b, minX = -10, maxX = 10, numPoints = 2) {
    const points = [];
    const x1 = minX;
    const y1 = a * x1 + b;
    const x2 = maxX;
    const y2 = a * x2 + b;
    
    return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
}

// Function to format linear equation
function formatEquation(a, b) {
    if (a === 0) return `y = ${b}`;
    
    const formattedB = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
    
    if (a === 1) return `y = x${formattedB}`;
    if (a === -1) return `y = -x${formattedB}`;
    
    return `y = ${a}x${formattedB}`;
}

// Optimized graph SVG generator with reduced complexity
function generateGraph(a, b, minX = -10, maxX = 10, minY = -10, maxY = 10, pointToHighlight = null) {
    const width = 400;
    const height = 400;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Scaling functions
    const scaleX = (x) => padding + ((x - minX) / (maxX - minX)) * graphWidth;
    const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * graphHeight;
    
    // Generate points for the line (just 2 endpoints instead of 100)
    const points = generatePoints(a, b, minX, maxX);
    
    // Create path string - just a simple line
    const pathString = `M ${scaleX(points[0].x)},${scaleY(points[0].y)} L ${scaleX(points[1].x)},${scaleY(points[1].y)}`;
    
    // Add fewer key points - just the y-intercept and maybe one more
    const keyPoints = [];
    
    // Add y-intercept (when x = 0)
    if (minY <= b && b <= maxY) {
        keyPoints.push({ x: 0, y: b, label: `(0, ${b})` });
    }
    
    // Add x-intercept only if reasonable
    if (a !== 0) {
        const xIntercept = -b / a;
        if (minX <= xIntercept && xIntercept <= maxX && Math.abs(xIntercept) < 100) {
            // Format x-intercept as a fraction if needed
            const { numerator, denominator } = simplifyFraction(-b, a);
            const interceptLabel = denominator === 1 ? 
                `(${numerator}, 0)` : 
                `(${formatFraction(numerator, denominator)}, 0)`;
            
            keyPoints.push({ 
                x: xIntercept, 
                y: 0, 
                label: interceptLabel 
            });
        }
    }
    
    // Add point to highlight if provided
    let pointHighlightSVG = '';
    if (pointToHighlight) {
        const { x, y, belongs } = pointToHighlight;
        // Only add if the point is within the visible range
        if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
            pointHighlightSVG = `
                <circle cx="${scaleX(x)}" cy="${scaleY(y)}" r="6" fill="${belongs ? '#4CAF50' : '#f44336'}" stroke="#fff" stroke-width="2" />
                <text x="${scaleX(x) + 10}" y="${scaleY(y) - 10}" font-size="14" fill="${belongs ? '#4CAF50' : '#f44336'}" font-weight="bold">M(${x}, ${y})</text>
            `;
        }
    }
    
    // Format slope and y-intercept for title
    let slopeDisplay = a;
    let interceptDisplay = b;
    
    // If a or b are not integers, try to format them as fractions
    if (a !== Math.floor(a)) {
        const { numerator: num, denominator: den } = simplifyFraction(Math.round(a * 1000), 1000);
        if (den !== 1) {
            slopeDisplay = `\\frac{${num}}{${den}}`;
        }
    }
    
    if (b !== Math.floor(b)) {
        const { numerator: num, denominator: den } = simplifyFraction(Math.round(b * 1000), 1000);
        if (den !== 1) {
            interceptDisplay = `\\frac{${num}}{${den}}`;
        }
    }
    
    // Simplified SVG with fewer elements
    return `
    <div class="svg-container" style="text-align: center;">
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#f8f9fa" />
        
        <!-- Major grid lines only -->
        <line x1="${padding}" y1="${scaleY(0)}" x2="${width - padding}" y2="${scaleY(0)}" stroke="#ccc" stroke-width="1" />
        <line x1="${scaleX(0)}" y1="${padding}" x2="${scaleX(0)}" y2="${height - padding}" stroke="#ccc" stroke-width="1" />
        
        <!-- Reduced tick marks - only every 5 units -->
        ${[-10, -5, 0, 5, 10].map(tick => 
            `<line x1="${scaleX(tick)}" y1="${scaleY(0) - 5}" x2="${scaleX(tick)}" y2="${scaleY(0) + 5}" stroke="#444" stroke-width="1.5" />
             <text x="${scaleX(tick)}" y="${scaleY(0) + 20}" font-size="12" text-anchor="middle" fill="#444">${tick}</text>`
        ).join('')}
        
        ${[-10, -5, 0, 5, 10].map(tick => 
            `<line x1="${scaleX(0) - 5}" y1="${scaleY(tick)}" x2="${scaleX(0) + 5}" y2="${scaleY(tick)}" stroke="#444" stroke-width="1.5" />
             <text x="${scaleX(0) - 15}" y="${scaleY(tick) + 5}" font-size="12" text-anchor="end" fill="#444">${tick}</text>`
        ).join('')}
        
        <!-- Line representing the equation -->
        <path d="${pathString}" stroke="#4285f4" stroke-width="3" fill="none" />
        
        <!-- Key points (limited to 2) -->
        ${keyPoints.slice(0, 2).map((point, index) => `
            <circle cx="${scaleX(point.x)}" cy="${scaleY(point.y)}" r="5" fill="#ea4335" stroke="#fff" stroke-width="1.5" />
            <text x="${scaleX(point.x) + 8}" y="${scaleY(point.y) - 8}" font-size="12" fill="#ea4335" font-weight="bold">${point.label}</text>
        `).join('')}
        
        <!-- Point to highlight if provided -->
        ${pointHighlightSVG}
        
        <!-- Title of the graph -->
        <text x="${width / 2}" y="${padding / 2}" font-size="16" text-anchor="middle" font-weight="bold" fill="#1a73e8">y = ${a > 0 ? a : a === 0 ? 0 : `(${a})`}x ${b > 0 ? `+ ${b}` : b < 0 ? `- ${Math.abs(b)}` : ''}</text>
      </svg>
    </div>
    `.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Optimized vertical line graph
function generateVerticalLineGraph(a, minX = -10, maxX = 10, minY = -10, maxY = 10) {
    const width = 400;
    const height = 400;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Scaling functions
    const scaleX = (x) => padding + ((x - minX) / (maxX - minX)) * graphWidth;
    const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * graphHeight;
    
    // Simplified SVG with fewer elements
    return `
    <div class="svg-container" style="text-align: center;">
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="${width}" height="${height}" fill="#f8f9fa" />
        
        <!-- Major grid lines only -->
        <line x1="${padding}" y1="${scaleY(0)}" x2="${width - padding}" y2="${scaleY(0)}" stroke="#ccc" stroke-width="1" />
        <line x1="${scaleX(0)}" y1="${padding}" x2="${scaleX(0)}" y2="${height - padding}" stroke="#ccc" stroke-width="1" />
        
        <!-- Reduced tick marks - only every 5 units -->
        ${[-10, -5, 0, 5, 10].map(tick => 
            `<line x1="${scaleX(tick)}" y1="${scaleY(0) - 5}" x2="${scaleX(tick)}" y2="${scaleY(0) + 5}" stroke="#444" stroke-width="1.5" />
             <text x="${scaleX(tick)}" y="${scaleY(0) + 20}" font-size="12" text-anchor="middle" fill="#444">${tick}</text>`
        ).join('')}
        
        ${[-10, -5, 0, 5, 10].map(tick => 
            `<line x1="${scaleX(0) - 5}" y1="${scaleY(tick)}" x2="${scaleX(0) + 5}" y2="${scaleY(tick)}" stroke="#444" stroke-width="1.5" />
             <text x="${scaleX(0) - 15}" y="${scaleY(tick) + 5}" font-size="12" text-anchor="end" fill="#444">${tick}</text>`
        ).join('')}
        
        <!-- Vertical line -->
        <line x1="${scaleX(a)}" y1="${padding}" x2="${scaleX(a)}" y2="${height - padding}" stroke="#4285f4" stroke-width="3" />
        
        <!-- Key points -->
        ${[0, 5].map(y => 
            `<circle cx="${scaleX(a)}" cy="${scaleY(y)}" r="5" fill="#ea4335" stroke="#fff" stroke-width="1.5" />
             <text x="${scaleX(a) + 8}" y="${scaleY(y) - 8}" font-size="12" fill="#ea4335" font-weight="bold">(${a}, ${y})</text>`
        ).join('')}
        
        <!-- Title of the graph -->
        <text x="${width / 2}" y="${padding / 2}" font-size="16" text-anchor="middle" font-weight="bold" fill="#1a73e8">x = ${a}</text>
      </svg>
    </div>
    `.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ================ Exercise Creation Functions ================

// Level 1: Basic Linear Equations (y = ax + b) with Integer Coefficients
function level1() {
    const a = randInt(-5, 5);
    const b = randInt(-5, 5);
    
    // Create linear equation in the form y = ax + b
    const equation = formatEquation(a, b);
    
    // Generate graph SVG
    const graph = generateGraph(a, b);
    
    return {
        question: `${equation}`,
        answer: `${formatText("Graphique de l'équation:")} \\\\${graph}`,
        questionText: `${formatText("Représenter graphiquement l'équation:")}` 
    };
}

// Level 2: Vertical and Horizontal Lines - Including x = c and y = d
function level2() {
    // 50% chance of horizontal line (y = b) or vertical line (x = a)
    const isHorizontal = Math.random() < 0.5;
    
    if (isHorizontal) {
        const b = randInt(-8, 8);
        const equation = `y = ${b}`;
        const graph = generateGraph(0, b); // Using slope 0 for horizontal line
        
        return {
            question: `${equation}`,
            answer: `${formatText("Graphique de l'équation:")} \\\\${graph}`,
            questionText: `${formatText("Représenter graphiquement l'équation (ligne horizontale):")}`
        };
    } else {
        const a = randInt(-8, 8);
        const equation = `x = ${a}`;
        
        // Use optimized vertical line graph
        const graph = generateVerticalLineGraph(a);
        
        return {
            question: `${equation}`,
            answer: `${formatText("Graphique de l'équation:")} \\\\${graph}`,
            questionText: `${formatText("Représenter graphiquement l'équation (ligne verticale):")}`
        };
    }
}

// Level 3: Linear Equations with Fractional Coefficients
function level3() {
    const numerator = randNonZeroInt(-6, 6);
    const denominator = randNonZeroInt(2, 4);
    const { numerator: simplifiedNum, denominator: simplifiedDenom } = simplifyFraction(numerator, denominator);
    const b = randInt(-5, 5);
    
    // Create equation
    const formattedA = formatFraction(simplifiedNum, simplifiedDenom);
    const equation = `y = ${formattedA}x${b > 0 ? ` + ${b}` : b < 0 ? ` - ${Math.abs(b)}` : ''}`;
    
    // Calculate actual slope value for graphing
    const a = simplifiedNum / simplifiedDenom;
    
    // Generate graph SVG
    const graph = generateGraph(a, b);
    
    return {
        question: `${equation}`,
        answer: `${formatText("Graphique de l'équation:")} \\\\${graph}`,
        questionText: `${formatText("Représenter graphiquement l'équation:")}`
    };
}

// Level 4: Find Equation from Points (optimized)
function level4() {
    // Use smaller range of integers to reduce complexity
    const x1 = randInt(-3, 3);
    const y1 = randInt(-3, 3);
    
    // Generate second point with limited complexity
    let x2 = randInt(-3, 3);
    let y2 = randInt(-3, 3);
    
    // Ensure x2 ≠ x1 (avoiding vertical lines)
    while (x2 === x1) {
        x2 = randInt(-3, 3);
    }
    
    // Calculate slope with simplified values
    const numerator = y2 - y1;
    const denominator = x2 - x1;
    const { numerator: simplifiedNum, denominator: simplifiedDenom } = simplifyFraction(numerator, denominator);
    
    // Format the fraction for display
    let formattedA;
    if (simplifiedDenom === 1) {
        formattedA = simplifiedNum.toString();
    } else {
        formattedA = formatFraction(simplifiedNum, simplifiedDenom);
    }
    
    // Calculate actual slope value for graphing
    const a = simplifiedNum / simplifiedDenom;
    
    // Calculate y-intercept using the formula b = y - mx
    const b = y1 - a * x1;
    
    // Convert y-intercept to a fraction if needed
    let { numerator: bNum, denominator: bDenom } = simplifyFraction(
        y1 * denominator - numerator * x1, 
        denominator
    );
    
    // Format the y-intercept for display
    let formattedB;
    if (bDenom === 1) {
        formattedB = bNum === 0 ? '' : 
                    bNum > 0 ? ` + ${bNum}` : 
                    ` - ${Math.abs(bNum)}`;
    } else {
        formattedB = bNum === 0 ? '' : 
                    bNum > 0 ? ` + ${formatFraction(bNum, bDenom)}` : 
                    ` - ${formatFraction(Math.abs(bNum), bDenom)}`;
    }
    
    const equation = `y = ${formattedA}x${formattedB}`;
    
    // Only generate graph if within reasonable bounds
    const graph = (Math.abs(a) < 100 && Math.abs(b) < 100) ? 
        generateGraph(a, b) : 
        formatText("Le graphique n'est pas affiché car les valeurs sont trop grandes");
    
    return {
        question: `${formatText("Trouver l'équation de la droite passant par les points")} (${x1}, ${y1}) ${formatText("et")} (${x2}, ${y2})`,
        answer: `${equation} \\\\${graph}`,
        questionText: `${formatText("Déterminer l'équation de la droite et représenter la graphiquement:")}`
    };
}

// Level 5: Parallel and Perpendicular Lines (NEW)
function level5() {
    // Generate random line parameters
    const a1 = randNonZeroInt(-4, 4); // First line slope (avoid 0)
    const b1 = randInt(-5, 5);        // First line y-intercept
    
    // Create a point that the second line will pass through
    const pointX = randInt(-3, 3);
    const pointY = randInt(-3, 3);
    
    // 50% chance of generating parallel or perpendicular line
    const isParallel = Math.random() < 0.5;
    
    let a2, b2; // Second line parameters
    
    if (isParallel) {
        // Parallel line has the same slope (a1)
        a2 = a1;
        // Calculate y-intercept: y = a2*x + b2 => b2 = y - a2*x
        b2 = pointY - a2 * pointX;
        
        // Format the first equation
        const eq1 = `y = ${a1 === 1 ? '' : a1 === -1 ? '-' : a1}x${b1 > 0 ? ` + ${b1}` : b1 < 0 ? ` - ${Math.abs(b1)}` : b1 === 0 ? '' : ` + ${b1}`}`;
        
        // Calculate b2 as a fraction if needed
        const { numerator: b2Num, denominator: b2Denom } = simplifyFraction(
            pointY * 1 - a1 * pointX * 1, 
            1
        );
        
        // Format b2 for display
        let formattedB2;
        if (b2Denom === 1) {
            formattedB2 = b2Num === 0 ? '' : 
                     b2Num > 0 ? ` + ${b2Num}` : 
                     ` - ${Math.abs(b2Num)}`;
        } else {
            formattedB2 = b2Num === 0 ? '' : 
                     b2Num > 0 ? ` + ${formatFraction(b2Num, b2Denom)}` : 
                     ` - ${formatFraction(Math.abs(b2Num), b2Denom)}`;
        }
        
        // Create question and answer
        return {
            question: `${formatText("La droite")} (d_1): ${eq1} ${formatText("et la droite")} (d_2) ${formatText("passant par le point")} (${pointX}, ${pointY}) ${formatText("sont parallèles. Déterminer l'équation de")} (d_2).`,
            answer: `${formatText("Pour les droites parallèles, les pentes sont égales:")} m_1 = m_2 = ${a1} \\\\
                    ${formatText("En utilisant le point")} (${pointX}, ${pointY}) ${formatText("et la pente")} m_2 = ${a1}: \\\\
                    y - ${pointY} = ${a1}(x - ${pointX}) \\\\
                    y - ${pointY} = ${a1}x - ${a1 * pointX} \\\\
                    y = ${a1}x - ${a1 * pointX} + ${pointY} \\\\
                    ${formatText("L'équation de la droite")} (d_2) ${formatText("est:")} y = ${a1}x${formattedB2}`,
            questionText: `${formatText("Droites parallèles:")}`
        };
    } else {
        // Perpendicular line has negative reciprocal slope: a2 = -1/a1
        const { numerator: perpNum, denominator: perpDenom } = simplifyFraction(-1, a1);
        a2 = perpNum / perpDenom;
        
        // Calculate y-intercept
        b2 = pointY - a2 * pointX;
        
        // Format the first equation
        const eq1 = `y = ${a1 === 1 ? '' : a1 === -1 ? '-' : a1}x${b1 > 0 ? ` + ${b1}` : b1 < 0 ? ` - ${Math.abs(b1)}` : b1 === 0 ? '' : ` + ${b1}`}`;
        
        // Format perpendicular slope as fraction
        let formattedA2 = formatFraction(perpNum, perpDenom);
        
        // Calculate b2 as a fraction if needed
        let b2Frac = { numerator: 0, denominator: 1 };
        
        if (pointX === 0) {
            b2Frac = { numerator: pointY, denominator: 1 };
        } else {
            b2Frac = simplifyFraction(
                pointY * perpDenom - perpNum * pointX, 
                perpDenom
            );
        }
        
        // Format b2 for display
        let formattedB2;
        if (b2Frac.denominator === 1) {
            formattedB2 = b2Frac.numerator === 0 ? '' : 
                      b2Frac.numerator > 0 ? ` + ${b2Frac.numerator}` : 
                      ` - ${Math.abs(b2Frac.numerator)}`;
        } else {
            formattedB2 = b2Frac.numerator === 0 ? '' : 
                      b2Frac.numerator > 0 ? ` + ${formatFraction(b2Frac.numerator, b2Frac.denominator)}` : 
                      ` - ${formatFraction(Math.abs(b2Frac.numerator), b2Frac.denominator)}`;
        }
        
        // Create question and answer
        return {
            question: `${formatText("La droite")} (d_1): ${eq1} ${formatText("et la droite")} (d_2) ${formatText("passant par le point")} (${pointX}, ${pointY}) ${formatText("sont perpendiculaires. Déterminer l'équation de")} (d_2).`,
            answer: `${formatText("Pour les droites perpendiculaires, le produit des pentes est")} -1: m_1 \\cdot m_2 = -1 \\\\
                    ${formatText("Donc")} m_2 = -\\frac{1}{${a1}} = ${formattedA2} \\\\
                    ${formatText("En utilisant le point")} (${pointX}, ${pointY}) ${formatText("et la pente")} m_2 = ${formattedA2}: \\\\
                    y - ${pointY} = ${formattedA2}(x - ${pointX}) \\\\
                    ${formatText("Après simplification, l'équation de la droite")} (d_2) ${formatText("est:")} \\\\
                    y = ${formattedA2}x${formattedB2}`,
            questionText: `${formatText("Droites perpendiculaires:")}`
        };
    }
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
        default:
            exercise = level1();
    }

    return {
        ...exercise,
        level // Add level to help with re-rendering
    };
}

// ================ Main Component ================
function ExerciseGeneratorDroite() {
    const [exercises, setExercises] = useState([]);
    const [numExercises, setNumExercises] = useState(5); // Default to 5 due to SVG graphics
    const [level, setLevel] = useState(1);
    const [exerciseKey, setExerciseKey] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const startTime = new Date();
        
        // This will render the MathJax formulas on load and when exercises change
        window.MathJax && window.MathJax.typeset && window.MathJax.typeset();
        
        return () => {
            const endTime = new Date();
            const timeSpent = (endTime - startTime) / 1000;
            ReactGA.event({
                category: 'User Engagement',
                action: 'Time Spent',
                label: 'Equation d\'une droite',
                value: Math.round(timeSpent)
            });
        };
    }, [exercises]);

    // Memoize exercise generation to improve performance
    const generateExercises = useCallback((selectedLevel) => {
        const newExercises = [];
        const currentLevel = selectedLevel || level;
        
        // Limit number of exercises for higher levels to prevent performance issues
        const adjustedNumExercises = currentLevel >= 4 ? Math.min(numExercises, 5) : numExercises;
        
        for (let i = 0; i < adjustedNumExercises; i++) {
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
            value: adjustedNumExercises
        });
    }, [numExercises, level]);

    const handleLevelChange = useCallback((newLevel) => {
        setLevel(newLevel);
        generateExercises(newLevel);
    }, [generateExercises]);

    // Add description text for each level
    const levelDescriptions = {
        1: "Équations linéaires basiques (y = ax + b)",
        2: "Lignes horizontales et verticales",
        3: "Équations avec coefficients fractionnaires",
        4: "Trouver l'équation à partir de points",
        5: "Droites parallèles et perpendiculaires"
    };

    const levelColors = {
        1: '#E8F5E9', // Lightest green
        2: '#C8E6C9',
        3: '#A5D6A7',
        4: '#81C784',
        5: '#66BB6A' // Darker green
    };

    return (
        <div className="container container_droite responsive-container">
            <Card sx={{ 
                mb: 0.4, 
                p: 0.2,
                fontFamily: 'Arial, sans-serif',
                overflow: 'hidden' 
            }}>
                <CardContent style={{ 
                    backgroundColor: 'rgba(102, 187, 106, 0.1)',
                    wordWrap: 'break-word' 
                }}>
                    <h1 className="responsive-heading" style={{ color: '#2E7D32' }}>
                        {formatText('Générateur d\'Exercices - Équation d\'une droite')}
                    </h1>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                value={numExercises}
                                onChange={(e) => setNumExercises(Number(e.target.value))}
                                label="Nombre d'Exercices"
                                inputProps={{ min: 1, max: 10 }}
                                helperText="Maximum 5 pour niveaux 4-5"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: '#4CAF50',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#4CAF50',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="level-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
                                {[1, 2, 3, 4, 5].map((lvl) => (
                                    <Button
                                        key={lvl}
                                        onClick={() => handleLevelChange(lvl)}
                                        variant="contained"
                                        style={{
                                            margin: isMobile ? '3px' : '5px',
                                            padding: isMobile ? '6px 12px' : '10px 20px',
                                            backgroundColor: levelColors[lvl],
                                            color: '#000',
                                            fontSize: isMobile ? '0.85rem' : '1rem',
                                        }}
                                        title={levelDescriptions[lvl]}
                                    >
                                        Niveau {lvl}
                                    </Button>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>
                                {levelDescriptions[level]}
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: '20px' }}>
                        <Button 
                            variant="contained" 
                            onClick={() => generateExercises()}
                            className="generate-button"
                            style={{
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                            }}
                        >
                            Générer les Exercices
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div id="exercise-container" className="responsive-exercise-container" key={exerciseKey}>
                {exercises.map((exercise, index) => (
                    <Exercise 
                        key={`${exercise.id}-${exercise.level}`}
                        exercise={exercise} 
                        index={index}
                        className="responsive-exercise" 
                    />
                ))}
            </div>
            {exercises.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button 
                        variant="outlined" 
                        onClick={() => window.print()}
                        style={{
                            color: '#4CAF50',
                            borderColor: '#4CAF50',
                        }}
                    >
                        Imprimer les Exercices
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ExerciseGeneratorDroite;