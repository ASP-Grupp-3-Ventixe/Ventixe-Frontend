import { useState, useEffect } from 'react';

function useFetchResource(fetchFunction, resourceId, options) {
    const { keepPreviousData = false } = options || {};
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!resourceId) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }
        if (typeof fetchFunction !== 'function') {
            if (!keepPreviousData) setData(null);
            setError(new Error("Provided fetchFunction is not a valid function."));
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        if (!keepPreviousData) setData(null);

        const executeFetch = async () => {
            try {
                const result = await fetchFunction(resourceId);
                setData(result);
            } catch (err) {
                setError(err);
                if (!keepPreviousData) setData(null);
            } finally {
                setLoading(false);
            }
        };
        executeFetch();
    }, [resourceId, fetchFunction, keepPreviousData]);

    return { data, loading, error };
}

export default useFetchResource;