import { useCallback, useState } from "react";

const useFetch = (requestconfig,applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const fetchRequest = useCallback( async() => {
    setIsLoading(true);
    setError(null);
    try {
      const response=await fetch( requestconfig.url, {
        method: requestconfig.method? requestconfig.method: "GET",
        body: requestconfig.body? requestconfig.body: null,
        header: requestconfig.headers? requestconfig.headers: null 
      })
          if(!response.ok)
          {  throw new Error ("ERROR Getting meals")}
        const data=await response.json();
        
         applyData(data);
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
    setIsLoading(false);
    
  }, [applyData,requestconfig]);

  

  return { isLoading,error,fetchRequest }
};
export default useFetch;
