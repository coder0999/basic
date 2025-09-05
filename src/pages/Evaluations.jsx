import React from 'react';
import useSubjects from '../hooks/useSubjects';

const Evaluations = () => {
  const { subjects, loading } = useSubjects();

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 my-8">التقييمات الاسبوعية محلولة</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex-grow">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 my-8">التقييمات الاسبوعية محلولة</h1>
      <div id="subjects-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">لا توجد مواد متاحة.</p>
        ) : (
          subjects.map((subject, index) => (
            <a key={index} href={subject.link || '#'} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer no-underline">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{subject.name}</h3>
              <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 space-x-reverse">
                <i className="fas fa-download"></i>
                <span>تنزيل</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default Evaluations;