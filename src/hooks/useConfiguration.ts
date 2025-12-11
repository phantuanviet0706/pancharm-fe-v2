import { useEffect, useState } from 'react';
import { Configuration, getConfiguration } from '../api/configurationService';

export function useConfiguration() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<Configuration>();

    useEffect(() => {
        setLoading(true);

        getConfiguration()
            .then((res) => {
                const mock_data = res.result;

                setData(mock_data);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { loading, error, data, setData };
}
