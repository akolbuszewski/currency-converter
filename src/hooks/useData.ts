import {useEffect, useState} from "react";
import {isAxiosError} from "axios";

export function useData<T>(promise: Promise<T>): [T | null, boolean, string | null] | [] {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async function fetchData() {
            try {
                setLoading(true);
                const data = await promise;
                setData(data);
                setError(null);
                setLoading(false);
            } catch (e) {
                if (isAxiosError(e) && e.response?.data) {
                    setLoading(false);
                    setError(e.message);
                }
            }
        })();
    }, [promise]);

    return [data, loading, error];
}