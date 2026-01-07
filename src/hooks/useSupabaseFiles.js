import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useSupabaseFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        // List files directly from the 'file' storage bucket
        const { data, error } = await supabase.storage.from('file').list('', {
          limit: 100, // Adjust as needed
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

        if (error) {
          throw error;
        }

        if (!data) {
          setFiles([]);
          setLoading(false);
          return;
        }
        
        // Filter out folders if any, and construct public URLs
        const filesWithUrls = data
          .filter(item => item.id !== null) // Basic filter to ensure it's likely a file/folder object
          .map(file => {
            const { data: publicURLData } = supabase.storage.from('file').getPublicUrl(file.name, { download: true });
            return { 
              name: file.name, 
              link: publicURLData.publicUrl,
              id: file.id, 
            };
        });
        
        setFiles(filesWithUrls);

      } catch (err) {
        console.error('Error fetching files from Supabase Storage:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return { files, loading, error };
};

export default useSupabaseFiles;
