import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import {
    createExpansionExercise,
    createFactorizationExercise,
    irExpansion,
    irFactorization,
  } from './ExerciseGenerator';
  

  const Quiz = ({ difficulty, onFinish }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
  
    useEffect(() => {
      const generatedQuestions = generateQuestions(difficulty);
      setQuestions(generatedQuestions);
    }, [difficulty]);
  
    const generateQuestions = (difficulty) => {
      const numQuestions = 20;
      const generatedQuestions = [];
    
      for (let i = 0; i < numQuestions; i++) {
        let exercise;
        let questionText;
        let options = [];
        let correctAnswer;
    
        // Determine the level based on difficulty
        let level;
        if (difficulty === 'easy') {
          level = 2; // Levels 1-2
        } else if (difficulty === 'normal') {
          level = 3; // Level 3
        } else if (difficulty === 'hard') {
          level = 5; // Level 5 and IR
        }
    
        // Randomly decide whether to generate an expansion or factorization exercise
        const exerciseType = Math.random() < 0.5 ? 'expand' : 'factor';
    
        if (difficulty === 'hard' && Math.random() < 0.5) {
          // For hard difficulty, include IR exercises
          exercise = exerciseType === 'expand' ? irExpansion() : irFactorization();
          questionText = exerciseType === 'expand' ? 'Développer et simplifier :' : 'Factoriser :';
        } else {
          // Generate regular exercises
          if (exerciseType === 'expand') {
            exercise = createExpansionExercise(level);
            questionText = 'Développer et simplifier :';
          } else {
            exercise = createFactorizationExercise(level);
            questionText = 'Factoriser :';
          }
        }
        
    
        correctAnswer = exercise.answer;
    
        // Generate options with tricky distractors
        options = generateOptions(correctAnswer, exerciseType, level, exercise);
    
        // Shuffle the options
        options = shuffleArray(options);
    
        generatedQuestions.push({
          question: {
            instruction: questionText,
            expression: exercise.question
          },
          options: options,
          correctAnswer: correctAnswer,
        });
      }
    
      return generatedQuestions;
    };
    
    function randInt(min, max) {
      if (min > max) {
        // Swap min and max values
        [min, max] = [max, min];
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
      const generateOptions = (correctAnswer, exerciseType, level, correctExercise) => {
        const options = [correctAnswer];
      
        // Generate 3 incorrect answers
        while (options.length < 4) {
          let incorrectAnswer;
      
          if (exerciseType === 'expand') {
            // Create distractors for expansion exercises
            incorrectAnswer = createExpansionDistractor(correctExercise);
          } else {
            // Create distractors for factorization exercises
            incorrectAnswer = createFactorizationDistractor(correctExercise);
          }
      
          // Ensure the incorrect answer is not the same as the correct one and not already in options
          if (incorrectAnswer !== correctAnswer && !options.includes(incorrectAnswer)) {
            options.push(incorrectAnswer);
          }
        }
      
        return options;
      };
      const createExpansionDistractor = (correctExercise) => {
        let { answer } = correctExercise;
    
        // Properly parse the answer into terms
        let terms = answer.match(/([+-]?[^+-]+)/g).map(term => term.trim());
        let indexToAlter = randInt(0, terms.length - 1);
    
        let term = terms[indexToAlter];
    
        // Only alter numerical coefficients
        let newTerm = term.replace(/([+-]?)(\d*)([a-zA-Z][\^]?\d*)?/, (match, sign, coeff, variablePart) => {
            coeff = coeff === '' ? '1' : coeff;
            let newCoeff = parseInt(coeff) + randInt(-2, 2);
            if (newCoeff === 0) newCoeff = 1; // Avoid zero coefficient
            return `${sign}${newCoeff}${variablePart || ''}`;
        });
    
        terms[indexToAlter] = newTerm;
    
        return terms.join(' ').replace(/\s+/g, ' ').trim();
    };
    
      
      
      const createFactorizationDistractor = (correctExercise) => {
        let { answer } = correctExercise;
        
        let alteredAnswer = answer;
        
        if (Math.random() < 0.5) {
          alteredAnswer = alteredAnswer.replace(/\d+/g, (match) => {
            let num = parseInt(match) || 1;
            num += randInt(-2, 2);
            if (num === 0) num = 1;
            return num.toString();
          });
        } else {
          alteredAnswer = alteredAnswer.replace(/\+|-/g, (match) => (match === '+' ? '-' : '+'));
        }
        
        return alteredAnswer;
      };
      
            
  
    const shuffleArray = (array) => {
      // Simple Fisher-Yates shuffle
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const handleAnswerChange = (event) => {
      setSelectedAnswer(event.target.value);
    };
  
    const handleNextQuestion = () => {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer('');
      } else {
        setShowScore(true);
      }
    };
    const handleAnswerClick = (answer) => {
        if (isAnswered) return;
        
        setSelectedAnswer(answer);
        setIsAnswered(true);
    
        if (answer === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
    
        setTimeout(() => {
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setIsAnswered(false);
          } else {
            setShowScore(true);
          }
        }, 1000);
      };
    
      const getRatingMessage = (score) => {
        if (score <= 5) {
          return "Continuez à pratiquer ! Avec de la persévérance, vous vous améliorerez.";
        } else if (score <= 10) {
          return "Bon effort ! Vous êtes sur la bonne voie. Continuez à travailler dur !";
        } else if (score <= 15) {
          return "Très bien ! Vous avez une bonne compréhension des concepts. Continuez comme ça !";
        } else {
          return "Excellent travail ! Votre maîtrise des mathématiques est impressionnante. Continuez à exceller !";
        }
      };
      
    
      return (
        <MathJaxContext>
        <Card sx={{ mt: 4, mb: 4, p: 2, backgroundColor: '#f0f4f8' }}>
          <CardContent>
          {showScore ? (
            <Box>
              <Typography variant="h5">Votre score : {score} sur {questions.length}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{getRatingMessage(score)}</Typography>
              <Button onClick={onFinish} variant="contained" sx={{ mt: 2 }}>Terminer le quiz</Button>
            </Box>
          ) : (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Question {currentQuestion + 1}/{questions.length}</Typography>
                <Typography variant="h6">Score : {score}/20</Typography>
              </Box>
              <Typography variant="h5" gutterBottom>
                {questions[currentQuestion]?.question.instruction}
                <MathJax inline>{`\\(${questions[currentQuestion]?.question.expression}\\)`}</MathJax>
              </Typography>


              <Grid container spacing={2} mt={2}>
                {questions[currentQuestion]?.options.map((option, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleAnswerClick(option)}
                      sx={{
                        height: '100px',
                        backgroundColor: isAnswered
                          ? option === questions[currentQuestion].correctAnswer
                            ? '#0aff2f'
                            : selectedAnswer === option
                            ? '#ff1749'
                            : 'white'
                          : 'white',
                        color: isAnswered
                          ? option === questions[currentQuestion].correctAnswer || selectedAnswer === option
                            ? 'white'
                            : 'black'
                          : 'black',
                        '&:hover': {
                          backgroundColor: isAnswered ? undefined : '#e0e0e0',
                        },
                      }}
                    >
                      <MathJax inline>{`\\(${option}\\)`}</MathJax>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};

export default Quiz;