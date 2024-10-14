// ExamExercise.js
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { BlockMath } from 'react-katex';

const ExamExercise = ({ exercise, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="exam-exercise">
      <Typography variant="h6">
        Exercice {index + 1} : ({exercise.points} points)
      </Typography>
      <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
        {exercise.questionText}
      </Typography>
      {exercise.questions.map((q, idx) => (
        <div key={idx} className="exam-question">
          {q.expression && <BlockMath math={q.expression} />}
          {q.text && <Typography>{q.text}</Typography>}
        </div>
      ))}
      <Button
        variant="outlined"
        onClick={() => setShowAnswer(!showAnswer)}
        style={{ marginTop: '10px' }}
      >
        {showAnswer ? 'Cacher la Réponse' : 'Afficher la Réponse'}
      </Button>
      {showAnswer && (
        <div className="exam-answer">
          {exercise.answers.map((ans, idx) => (
            <div key={idx}>
              {ans.expression && <BlockMath math={ans.expression} />}
              {ans.text && (
                <Typography style={{ whiteSpace: 'pre-wrap' }}>
                  {ans.text}
                </Typography>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamExercise;
