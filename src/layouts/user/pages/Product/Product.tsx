import React from "react";
import BaseLayout from "../../components/BaseLayout";
import CardItem from "../../components/CardItem";
import { Pagination } from "@mui/material";

const Product = () => {
	return (
		<BaseLayout>
			<div className="flex justify-center gap-10 flex-wrap">
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
					<CardItem item={item}></CardItem>
				))}
			</div>
			<Pagination className="flex justify-center" size="large" count={10}></Pagination>
		</BaseLayout>
	);
};

export default Product;
