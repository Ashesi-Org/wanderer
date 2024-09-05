// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface SensorData {
  temperature: string;
  humidity: string;
  ldr_value: string;
  Co2: string;
  reading_time: string;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('An error occured fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
