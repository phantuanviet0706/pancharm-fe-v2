const menuItems = {
	items: [
		{
			id: "navigation",
			name: "Điều hướng",
			subtitle: "",
			type: "group",
			children: [
				{
					id: "dashboard",
					title: "Bảng điều khiển",
					type: "item",
					url: "/admin",
					icon: "home",
				},
			],
		},
		{
			id: "system",
			name: "Hệ thống",
			subtitle: "Quản lý người dùng & thông tin công ty",
			type: "group",
			children: [
				{
					id: "user",
					title: "Người dùng",
					type: "item",
					url: "/users",
					icon: "person",
				},
				{
					id: "company",
					title: "Công ty",
					type: "item",
					url: "/company",
					icon: "business",
				},
			],
		},
		{
			id: "management",
			name: "Quản lý",
			subtitle: "Sản phẩm, Danh mục và nhiều hơn thế",
			type: "group",
			children: [
				{
					id: "categories",
					title: "Danh mục",
					type: "item",
					url: "/categories",
					icon: "category",
				},
				{
					id: "products",
					title: "Sản phẩm",
					type: "item",
					url: "/products",
					icon: "shopping_bag",
				},
				{
					id: "collections",
					title: "Bộ sưu tập",
					type: "item",
					url: "/collections",
					icon: "collections_bookmark",
				},
			],
		},
		{},
	],
};

export default menuItems;
