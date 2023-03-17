import { useCallback, useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState({});
  const [error,setError]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const fetchRequest =useCallback ( (requestConfig,applyData)=>{ return (async () => {
      setIsLoading(true);

    try {
      const response = await fetch(
        "https://react-http-c8937-default-rtdb.firebaseio.coms/meals",
        {
          method: requestConfig.method ? requestConfig.method :"GET",
          body: requestConfig.body ? requestConfig.body : null,
          header: requestConfig.header ? requestConfig.header : null,
        }
      );

      if (!response.ok) {
        
        throw new Error("fetching not succesful");
      }

      const fetchData = await response.json();
     applyData(fetchData);
      setData(fetchData);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);

  })},[])
 
useEffect(()=>{

  fetchRequest()
},[fetchRequest]);
  return {isLoading,error,data, fetchRequest};
};
export default useFetch;
