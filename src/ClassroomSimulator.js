import React, { useState, useEffect } from 'react';
import './ClassroomSimulator.css';
import { useParams, Link } from 'react-router-dom';


//, "performance": "excellent"
//, "note": "10.00"

const ClassroomSimulator = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const { classNumber } = useParams();
  const numberOfColumns = 8;

  useEffect(() => {
    fetch(`/students_class${classNumber}.json`)
      .then(response => response.json())
      .then(data => {
        setStudents(data.students);
      })
      .catch(error => console.error('Error loading student data:', error));
  }, [classNumber]);

  const selectRandomStudent = () => {
    if (students.length === 0) return;

    setIsSelecting(true);
    let count = 0;
    const maxIterations = 10;
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * students.length);
      setSelectedStudent(students[randomIndex]);
      count++;
      if (count >= maxIterations) {
        clearInterval(intervalId);
        setIsSelecting(false);
      }
    }, 100);
  };

  const getStudentIcon = (gender) => {
    return gender === 'male' ? '👦' : '👧';
  };

  const getPerformanceClass = (performance) => {
    switch (performance) {
      case 'excellent':
        return 'student-excellent';
      case 'good':
        return 'student-good';
      default:
        return '';
    }
  };

  // Group students by column
  const groupedStudents = students.reduce((acc, student, index) => {
    const columnIndex = index % numberOfColumns;
    if (!acc[columnIndex]) acc[columnIndex] = [];
    acc[columnIndex].push(student);
    return acc;
  }, {});

  return (
    <div className="classroom">
      <h2>3 APIC {classNumber}</h2>
      <div className="desks">
        {Object.entries(groupedStudents).map(([col, columnStudents]) => (
          <div key={col} className="desk-column">
            {columnStudents.map((student, index) => (
              <div key={`${col}-${index}`} className="desk-pair">
                <div 
                  className={`student ${isSelecting ? 'selecting' : ''} 
                    ${selectedStudent === student ? 'selected' : ''} 
                    ${getPerformanceClass(student.performance)}`}
                >
                  <div className="student-icon">{getStudentIcon(student.gender)}</div>
                  <div className="student-name">{student.name}</div>
                  {/* <div className="student-note">Note: {student.note || 'N/A'}</div> */}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={selectRandomStudent} disabled={isSelecting}>
        اختر طالبًا عشوائيًا
      </button>
      <Link to="/simulator" className="back-button">العودة إلى اختيار الفصل</Link>
    </div>
  );
};

export default ClassroomSimulator;
