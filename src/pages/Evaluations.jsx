import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSubjects from '../hooks/useSubjects';
import useSupabaseFiles from '../hooks/useSupabaseFiles';

const Evaluations = () => {
  const { subjects, loading: subjectsLoading } = useSubjects();
  const { files: supabaseFiles, loading: filesLoading, error: filesError } = useSupabaseFiles();

  const [allEvaluations, setAllEvaluations] = useState([]);

  useEffect(() => {
    if (!subjectsLoading && !filesLoading) {
      const combined = [
        ...subjects.map(subject => ({ ...subject, type: 'subject' })),
        ...supabaseFiles.map(file => ({ ...file, type: 'supabaseFile' })),
      ];
      setAllEvaluations(combined);
    }
  }, [subjects, supabaseFiles, subjectsLoading, filesLoading]);

  const handleDownloadClick = () => {
    toast.success('تم التنزيل بنجاح');
  };

  if (subjectsLoading || filesLoading) {
    return (
      <div className="container mx-auto p-4 flex-grow">
        <div className="spinner"></div>
      </div>
    );
  }

  if (filesError) {
    return (
      <div className="container mx-auto p-4 flex-grow text-red-600">
        <p>Error loading files from Supabase: {filesError.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex-grow">
      
      <div id="subjects-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEvaluations.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">لا توجد مواد متاحة.</p>
        ) : (
          allEvaluations.map((item, index) => (
            <a 
              key={index} 
              href={item.link || '#'} 
              download={item.name} 
              rel="noopener noreferrer" 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer no-underline"
              onClick={handleDownloadClick}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center">{item.name}</h3>
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