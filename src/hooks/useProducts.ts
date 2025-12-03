import { fetchData, Product, ProductQuery } from "../api/productService";
import { useEffect, useState } from "react";

export function useProducts(query: ProductQuery = {}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetchData(query)
			.then((res) => {
				const mock_data = res.result;
				let products = mock_data.content || [];

				products.length > 0 &&
					products.map((p: Product) => {
						const defaultImage = p.productImages?.find((img) => {
							return img.isDefault == true ? img : null;
						});

						if (defaultImage) {
							p.src = defaultImage.path;
						}
					});

				setProducts(products);
				setTotal(mock_data.totalElements || 0);
				setTotalPages(mock_data.totalPages || 1);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [query]);

	return { products, setProducts, loading, error, total, totalPages };
}
