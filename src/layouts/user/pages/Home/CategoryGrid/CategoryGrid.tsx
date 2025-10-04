import React from "react";

const DEFAULT_ITEMS = [
	// {
	// 	img: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg",
	// 	alt: "Category 1",
	// 	title: "Category 1",
	// 	subtitle: "Subtitle",
	// 	href: "#",
	// },
	// {
	// 	img: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg",
	// 	alt: "Category 2",
	// 	title: "Category 2",
	// 	subtitle: "Subtitle",
	// 	href: "#",
	// },
	// {
	// 	img: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg",
	// 	alt: "Category 3",
	// 	title: "Category 3",
	// 	subtitle: "Subtitle",
	// 	href: "#",
	// },
	// {
	// 	img: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23807268/2023/6/29/9930b235-5318-4755-abbe-08f99e969e781688026636544LehengaCholi7.jpg",
	// 	alt: "Category 4",
	// 	title: "Category 4",
	// 	subtitle: "Subtitle",
	// 	href: "#",
	// },
];

const CategoryGrid = ({ items = DEFAULT_ITEMS }) => {
	return (
		<div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
			{items.map((item, idx) => (
				<div className="col-span-3 row-span-12 text-white">
					<img src={item.img} alt={item.alt || item.title || `category-${idx + 1}`} />
				</div>
			))}
		</div>
	);
};

export default CategoryGrid;
