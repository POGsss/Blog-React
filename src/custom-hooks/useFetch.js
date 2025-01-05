import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then(response => {
                if(!response.ok) {
                    throw Error("Cannot fetch the data");
                }
                return response.json();
            })
            .then(data => { 
                console.log(data);
                setData(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === "AbortError") {
                    console.log("Fetch Aborted");
                } else {
                    setError(err.message);
                    setLoading(false);
                }
            });
        }, 250);

        return () => {
            abortCont.abort();
        }
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;