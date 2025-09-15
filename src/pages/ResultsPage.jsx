import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userAnswers, exam } = location.state || {};

  const { correctAnswersCount, earnedPoints, totalQuestions, percentage } = useMemo(() => {
    if (!exam) {
      return { correctAnswersCount: 0, earnedPoints: 0, totalQuestions: 0, percentage: 0 };
    }

    let correct = 0;
    let points = 0;
    const total = exam.questions.length;

    exam.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswerIndex = question.correctAnswer;
      const userAnswerIndex = question.options.findIndex(opt => (typeof opt === 'string' ? opt : opt.text) === userAnswer);

      if (userAnswerIndex === correctAnswerIndex) {
        correct++;
        points += question.points || 1;
      }
    });

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correctAnswersCount: correct, earnedPoints: points, totalQuestions: total, percentage };
  }, [exam, userAnswers]);

  useEffect(() => {
    if (user && exam) {
      const submissionRef = doc(db, "exam_results", exam.id, "submissions", user.uid);
      const submissionData = {
        email: user.email,
        userId: user.uid,
        percentage,
        correctAnswers: correctAnswersCount,
        totalQuestions,
        earnedPoints,
        userAnswers,
        submittedAt: new Date()
      };

      setDoc(submissionRef, submissionData, { merge: true })
        .then(() => console.log("Exam results saved successfully!"))
        .catch(e => console.error("Error saving exam results: ", e));

      // Update user's total points
      const updateUserPoints = async () => {
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          const currentPoints = userSnap.data()?.points || 0;
          const newPoints = currentPoints + earnedPoints;
          await setDoc(userRef, { points: newPoints }, { merge: true });
          console.log("User points updated successfully!");
        } catch (error) {
          console.error("Error updating user points: ", error);
        }
      };

      if (earnedPoints > 0) {
        updateUserPoints();
      }
    }
  }, [user, exam, percentage, correctAnswersCount, totalQuestions, earnedPoints, userAnswers]);

  if (!exam) {
    return <div>No results to display.</div>;
  }

  return (
    <div className="py-4 flex-grow">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6">نتائج الامتحان</h2>
      <div className="space-y-8">
        <div className="p-6 bg-blue-100 text-blue-800 rounded-lg shadow-md text-center mb-8">
          <p className="text-2xl md:text-3xl font-bold">لقد أجبت على {correctAnswersCount} من {totalQuestions} بشكل صحيح</p>
          <p className="text-xl md:text-2xl mt-2">لقد حصلت على <span className="font-bold text-green-600">{earnedPoints}</span> نقطة</p>
          <p className="text-4xl md:text-5xl font-bold mt-2">{percentage}%</p>
        </div>
        {exam.questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswerIndex = question.correctAnswer;
          const userAnswerIndex = question.options.findIndex(opt => (typeof opt === 'string' ? opt : opt.text) === userAnswer);
          const isCorrect = userAnswerIndex === correctAnswerIndex;
          const questionPoints = question.points || 1;

          return (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md relative w-full">
              <div className="question-number-box">
                <span>{index + 1}</span>
              </div>
              <div className="result-points-box">
                <span className={isCorrect ? 'text-black' : 'text-gray-500 line-through'}>
                  {questionPoints} نقطة
                </span>
              </div>
              <p className="text-lg md:text-xl text-gray-800 mb-4 break-words pt-16">{question.text}</p>
              <div className="space-y-3">
                {question.options.map((option, optIndex) => {
                  const optionText = typeof option === 'string' ? option : option.text;
                  let containerClass = 'flex justify-between items-center p-2 rounded-lg';
                  let labelClass = 'text-gray-700 text-base md:text-lg';
                  let icon = '';

                  if (optIndex === correctAnswerIndex) {
                    containerClass += ' bg-green-100';
                    labelClass = 'text-green-800 text-base md:text-lg font-bold';
                    icon = '<i class="fas fa-check-circle text-green-600 ml-2"></i>';
                  }

                  if (userAnswerIndex === optIndex && userAnswerIndex !== correctAnswerIndex) {
                    containerClass += ' bg-red-100';
                    labelClass = 'text-red-800 text-base md:text-lg font-bold';
                    icon = '<i class="fas fa-times-circle text-red-600 ml-2"></i>';
                  }

                  return (
                    <div key={optIndex} className={containerClass}>
                      <div className="custom-radio">
                        <input type="radio" id={`result-option-${index}-${optIndex}`} name={`result-question-${index}`} value={optionText} className="form-radio" checked={userAnswerIndex === optIndex} disabled />
                        <label htmlFor={`result-option-${index}-${optIndex}`} className={labelClass}>{optionText}</label>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: icon }} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={() => navigate('/')} className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform">
          العودة إلى الامتحانات
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
