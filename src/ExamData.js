// ExamData.js
export function generateExam() {
    return {
      exercises: [
        generateExercise1(),
        generateExercise2(),
        generateExercise3(),
        generateExercise4(),
        generateExercise5(),
      ],
    };
  }
  
  function generateExercise1() {
    // Exercise 1: Simplify expressions involving radicals
    const expressions = [];
    const answers = [];
    const numQuestions = 5;
  
    for (let i = 0; i < numQuestions; i++) {
      const n = getRandomInt(2, 9);
      const m = getRandomInt(2, 9);
      const type = getRandomInt(1, 3);
  
      let question;
      let answer;
  
      if (type === 1) {
        // Simplify sqrt(n^2)
        question = `A_{${i + 1}} = \\sqrt{${n}^2}`;
        answer = `A_{${i + 1}} = ${n}`;
      } else if (type === 2) {
        // Simplify n * sqrt(m)
        const product = n * Math.sqrt(m);
        question = `A_{${i + 1}} = ${n} \\times \\sqrt{${m}}`;
        answer = `A_{${i + 1}} = ${n} \\sqrt{${m}}`;
      } else {
        // Simplify sqrt(n*m)
        const product = n * m;
        question = `A_{${i + 1}} = \\sqrt{${n} \\times ${m}}`;
        answer = `A_{${i + 1}} = \\sqrt{${product}}`;
      }
  
      expressions.push({ expression: question });
      answers.push({ expression: answer });
    }
  
    return {
      questionText: '1) Calculer et simplifier : (5 × 1 pts)',
      questions: expressions,
      answers: answers,
      points: 5,
    };
  }
  
  function generateExercise2() {
    // Exercise 2: Solve equations
    const expressions = [];
    const answers = [];
  
    // First equation
    const a = getRandomInt(1, 10);
    const question1 = `(F): \\quad x^{2} = ${a ** 2}`;
    const answer1 = `x = \\pm ${a}`;
  
    // Second equation with no real solution
    const b = getRandomInt(-10, -1);
    const question2 = `(G): \\quad x^{2} = ${b}`;
    const answer2 = `Pas de solution réelle, car un carré est toujours positif ou nul.`;
  
    expressions.push({ expression: question1 });
    answers.push({ expression: answer1 });
  
    expressions.push({ expression: question2 });
    answers.push({ text: answer2 });
  
    return {
      questionText: '2) Résoudre les équations suivantes : (2 × 1 pts)',
      questions: expressions,
      answers: answers,
      points: 2,
    };
  }
  
  function generateExercise3() {
    // Exercise 3: Eliminate radicals from denominator
    const expressions = [];
    const answers = [];
  
    // First fraction
    const n = getRandomInt(2, 9);
    const question1 = `H = \\dfrac{${n}}{\\sqrt{${n ** 2}}}`;
    const answer1 = `H = \\dfrac{${n}}{${n}} = 1`;
  
    // Second fraction
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    const question2 = `I = \\dfrac{1}{${a} - \\sqrt{${b}}}`;
    const denominator = `${a ** 2} - ${b}`;
    const answer2 = `
      I = \\dfrac{1 \\times (${a} + \\sqrt{${b}})}{(${a})^2 - (\\sqrt{${b}})^2} = \\dfrac{${a} + \\sqrt{${b}}}{${denominator}}
    `;
  
    expressions.push({ expression: question1 });
    answers.push({ expression: answer1 });
  
    expressions.push({ expression: question2 });
    answers.push({ expression: answer2 });
  
    return {
      questionText:
        '3) Éliminer la racine carrée du dénominateur : (2 × 1 pts)',
      questions: expressions,
      answers: answers,
      points: 2,
    };
  }
  
  function generateExercise4() {
    // Exercise 4: Identities and factorization
    const expressions = [];
    const answers = [];
  
    // Part a) Develop using identities
    const a1 = getRandomInt(1, 5);
    const b1 = getRandomInt(1, 5);
    const questionA1 = `(a)\\quad A = (${a1}x + ${b1})^{2}`;
    const answerA1 = `A = ${a1 ** 2}x^{2} + ${2 * a1 * b1}x + ${b1 ** 2}`;
  
    const a2 = getRandomInt(1, 5);
    const b2 = getRandomInt(1, 5);
    const questionA2 = `(b)\\quad B = (${a2}x - ${b2})^{2}`;
    const answerA2 = `B = ${a2 ** 2}x^{2} - ${2 * a2 * b2}x + ${b2 ** 2}`;
  
    expressions.push({ expression: questionA1 });
    answers.push({ expression: answerA1 });
  
    expressions.push({ expression: questionA2 });
    answers.push({ expression: answerA2 });
  
    // Part b) Factorize using identities
    const a3 = getRandomInt(2, 6);
    const b3 = getRandomInt(2, 6);
    const questionB1 = `(c)\\quad C = ${a3 ** 2}x^{2} - ${b3 ** 2}`;
    const answerB1 = `C = (${a3}x + ${b3})(${a3}x - ${b3})`;
  
    const a4 = getRandomInt(1, 5);
    const b4 = getRandomInt(1, 5);
    const questionB2 = `(d)\\quad D = ${a4 ** 2}x^{2} + ${2 * a4 * b4}x + ${b4 ** 2}`;
    const answerB2 = `D = (${a4}x + ${b4})^{2}`;
  
    expressions.push({ expression: questionB1 });
    answers.push({ expression: answerB1 });
  
    expressions.push({ expression: questionB2 });
    answers.push({ expression: answerB2 });
  
    return {
      questionText:
        '4) a) Développer en utilisant les identités remarquables : (2 × 1 pts)\n\nb) Factoriser en utilisant les identités remarquables : (2 × 1 pts)',
      questions: expressions,
      answers: answers,
      points: 4,
    };
  }
  
  function generateExercise5() {
    // Exercise 5: Linear equations and their graphs
    const expressions = [];
    const answers = [];
    
    // Question 1: Find the equation of a line passing through two points
    const x1 = getRandomInt(-5, 5);
    const y1 = getRandomInt(-5, 5);
    const x2 = getRandomInt(-5, 5);
    let y2 = getRandomInt(-5, 5);
    
    // Ensure x2 ≠ x1 (avoiding vertical lines)
    while (x2 === x1) {
      y2 = getRandomInt(-5, 5);
    }
    
    // Calculate slope
    const numerator = y2 - y1;
    const denominator = x2 - x1;
    const { numerator: slopeNum, denominator: slopeDenom } = simplifyFraction(numerator, denominator);
    
    // Calculate y-intercept
    const slope = slopeNum / slopeDenom;
    const b = y1 - slope * x1;
    const { numerator: interceptNum, denominator: interceptDenom } = simplifyFraction(Math.round(b * slopeDenom), slopeDenom);
    
    const formattedSlope = slopeDenom === 1 ? slopeNum : formatFractionLatex(slopeNum, slopeDenom);
    const formattedIntercept = interceptDenom === 1 ? interceptNum : formatFractionLatex(interceptNum, interceptDenom);
    
    // Construct the equation
    const signIntercept = interceptNum >= 0 ? '+' : '';
    const finalIntercept = interceptNum === 0 ? '' : `${signIntercept} ${formattedIntercept}`;
    
    const questionText = `(a)\\quad \\text{Déterminer l'équation de la droite passant par les points } A${formatPoint(x1, y1)} \\text{ et } B${formatPoint(x2, y2)}`;
    const answerText = `\\text{La pente est } m = ${formattedSlope} \\\\\n        \\text{Utilisant l'équation } y - y_1 = m(x - x_1): \\\\\n        y - ${y1} = ${formattedSlope}(x - ${x1}) \\\\\n        y = ${formattedSlope}x ${finalIntercept}`;
    
    expressions.push({ expression: questionText });
    answers.push({ expression: answerText });
    
    // Question 2: Convert general form to slope-intercept form
    const a2 = getRandomInt(-5, 5);
    const c2 = getRandomInt(-5, 5);
    const d2 = getRandomInt(-5, 5);
    
    // Create general form equation ax + by + c = 0
    // Ensure b is not 0 to avoid vertical lines
    const b2 = getRandomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
    
    // Calculate slope and y-intercept for the answer
    const slope2 = -a2 / b2;
    const yIntercept = -c2 / b2;
    
    // Simplify the slope and y-intercept fractions
    const { numerator: slopeNum2, denominator: slopeDenom2 } = simplifyFraction(-a2, b2);
    const { numerator: interceptNum2, denominator: interceptDenom2 } = simplifyFraction(-c2, b2);
    
    const formattedSlope2 = slopeDenom2 === 1 ? slopeNum2 : formatFractionLatex(slopeNum2, slopeDenom2);
    const formattedIntercept2 = interceptDenom2 === 1 ? interceptNum2 : formatFractionLatex(interceptNum2, interceptDenom2);
    
    const signB2 = b2 > 0 ? '+' : '';
    const signC2 = c2 > 0 ? '+' : '';
    const question2Text = `(b)\\quad \\text{Convertir l'équation } ${a2}x ${signB2} ${b2}y ${signC2} ${c2} = 0 \\text{ sous la forme } y = mx + n`;
    
    // Construct the answer
    const signIntercept2 = interceptNum2 >= 0 ? '+' : '';
    const finalIntercept2 = interceptNum2 === 0 ? '' : `${signIntercept2} ${formattedIntercept2}`;
    
    const answer2Text = `${a2}x ${signB2} ${b2}y ${signC2} ${c2} = 0 \\\\\n        ${b2}y = -${a2}x - ${c2} \\\\\n        y = ${formattedSlope2}x ${finalIntercept2}`;
    
    expressions.push({ expression: question2Text });
    answers.push({ expression: answer2Text });
    
    return {
      questionText: '5) Équation d\'une droite : (2 × 2 pts)',
      questions: expressions,
      answers: answers,
      points: 4,
    };
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // Helper function to format a point
  function formatPoint(x, y) {
    return `(${x}, ${y})`;
  }
  
  // Helper function to simplify fractions
  function simplifyFraction(numerator, denominator) {
    // Calculate GCD
    const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
    const divisor = gcd(numerator, denominator);
    
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  }
  
  // Helper function to format a fraction for display
  function formatFractionLatex(numerator, denominator) {
    if (denominator === 1) return `${numerator}`;
    if (numerator === 0) return '0';
    
    return `\\frac{${numerator}}{${denominator}}`;
  }
  
  export default { generateExam };