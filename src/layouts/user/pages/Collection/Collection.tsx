import React from "react";
import Card from "./Card/Card";
import BaseLayout from "../../components/BaseLayout";

const Collection = () => {
	return (
		<BaseLayout>
			<div className="collection-container">
				<div className="collection-wrapper">
					<div className="collection-list flex justify-center">
						<div className="grid grid-cols-2 gap-5">
							{[1, 1, 1, 1].map((item) => (
								<Card
									item={item}
									src="https://helios.vn/cdn/shop/files/ontario-lotus-helios-black-silver_3_1296x.jpg?v=1754845293"
								></Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Collection;
