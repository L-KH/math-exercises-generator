// ExamData.js
export function generateExam() {
    return {
      exercises: [
        generateExercise1(),
        generateExercise2(),
        generateExercise3(),
        generateExercise4(),
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
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  export default { generateExam };
  