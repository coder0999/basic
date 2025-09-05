import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ExamView = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchExam = async () => {
      const appId = 'tanya-thanawey';
      const examRef = doc(db, `artifacts/${appId}/public/data/exams`, examId);
      const docSnap = await getDoc(examRef);

      if (docSnap.exists()) {
        const examData = { id: docSnap.id, ...docSnap.data() };
        setExam(examData);
        setUserAnswers(new Array(examData.questions.length).fill(null));
        setTimeLeft((examData.duration || 30) * 60);
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === 0 && exam) {
      handleSubmit();
    }
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex, option) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    navigate(`/results/${examId}`, { state: { userAnswers, exam } });
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!exam) {
    return <div>Exam not found</div>;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="py-4 flex-grow">
      <div id="exam-timer" className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded-lg shadow-lg">
        {formatTime(timeLeft)}
      </div>
      <h2 id="exam-title" className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">{exam.name}</h2>
      <div id="questions-container" className="space-y-8">
        {exam.questions.map((question, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md relative w-full md:h-[80vh]">
            <div className="question-number-box">
              <span>{index + 1}</span>
            </div>
            <div className="question-points-box">
              <span>{question.points || 1} نقطة</span>
            </div>
            <p className="text-lg md:text-3xl text-gray-800 mb-4 break-words pt-16">{question.text}</p>
            <div className="space-y-3 md:space-y-8">
              {question.options.map((option, optIndex) => {
                const optionText = typeof option === 'string' ? option : option.text;
                const optionId = `option-${index}-${optIndex}`;
                return (
                  <div key={optIndex} className="custom-radio p-2 rounded-lg">
                    <input
                      type="radio"
                      id={optionId}
                      name={`question-${index}`}
                      value={optionText}
                      onChange={() => handleAnswerChange(index, optionText)}
                      className="form-radio"
                    />
                    <label htmlFor={optionId} className="text-gray-700 text-base md:text-2xl">{optionText}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={handleSubmit} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform">
          تسليم
        </button>
      </div>
    </div>
  );
};

export default ExamView;