import { useCallback, useEffect, useState } from "react";

let timer: any;

//hook to fetch api data
const useFetchApiData = (
  text: string,
  isAutoComplete: boolean,
  promise: (text: string) => Promise<Response>,
  dataToBeDisplayed: (data: any) => any[],
  debounceDelay: number
) => {
  const [data, setData] = useState([] as any);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = useCallback(
    async (text: string, dataToBeDisplayed: Function) => {
      try {
        setLoading(true);
        const res = await promise(text);
        if (!res) {
            throw new Error("Failed to fetch data");
          }
        const data = await res.json();
        setData(dataToBeDisplayed(data));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message || "Something went wrong");
        setData([]);
      }
    },
    [promise]
  );
  useEffect(() => {
    if (!text || !isAutoComplete) {
      setData([]);
      setError("");
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fetchData(text, dataToBeDisplayed);
    }, debounceDelay);

    return () => clearTimeout(timer);

  }, [text, isAutoComplete, fetchData,dataToBeDisplayed,debounceDelay]);

  return [data, error, loading];
};

export default useFetchApiData;
