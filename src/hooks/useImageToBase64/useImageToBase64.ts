import { useState, useCallback } from 'react';

interface UseImageToBase64Result {
  convertFile: (file: File) => Promise<string>;
  isPending: boolean;
  error: string | null;
}

export const useImageToBase64 = (): UseImageToBase64Result => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertFile = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsPending(true);
      setError(null);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setIsPending(false);
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        setIsPending(false);
        setError('Failed to read file');
        reject(new Error('Failed to read file'));
      };
    });
  }, []);

  return { convertFile, isPending, error };
};
