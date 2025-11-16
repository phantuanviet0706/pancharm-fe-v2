import { useEffect, useState } from "react";
import { fetchData, Order, OrderQuery } from "../api/orderService";

export function useOrders(query: OrderQuery = {}) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchData(query)
            .then((res) => {
                const mock_data = res.result;

                setOrders(mock_data.content || []);
                setTotal(mock_data.totalElements || 0);
                setTotalPages(mock_data.totalPages || 1);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [query]);

    return { orders, setOrders, loading, error, total, totalPages };
} 