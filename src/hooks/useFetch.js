import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Network Error");

        const result = await response.json();

        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
        throw new Error("Failed to fetch:", { cause: error });
      } finally {
        setIsLoaded(true);
      }
    }

    setIsLoaded(false);
    fetchData();
  }, [url]);

  return [data, isLoaded, error];
}
