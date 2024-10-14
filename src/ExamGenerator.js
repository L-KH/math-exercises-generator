// ExamGenerator.js
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ExamExercise from './ExamExercise';
import './Exam.css';

function ExamGenerator() {
  const [examData, setExamData] = useState(null);

  const generateExam = () => {
    import('./ExamData').then(({ generateExam }) => {
      const exam = generateExam();
      setExamData(exam);
    });
  };

  return (
    <div className="exam-container">
      <Button variant="contained" color="primary" onClick={generateExam}>
        Générer un Nouvel Examen
      </Button>
      {examData && (
        <>
          <Typography variant="h4" gutterBottom>
            Examen de Mathématiques
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Durée : 1 heure | Total des points : 20
          </Typography>
          {examData.exercises.map((exercise, index) => (
            <ExamExercise
              key={index}
              exercise={exercise}
              index={index}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ExamGenerator;
