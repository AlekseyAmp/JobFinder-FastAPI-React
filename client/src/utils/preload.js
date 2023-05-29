import { useState, useEffect } from 'react';

export function useLoading(delay) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      let timeout = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeout);
    }, [delay]);

    return isLoading;
}