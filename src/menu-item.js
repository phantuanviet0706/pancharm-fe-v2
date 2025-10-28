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
					url: "/admin/users",
					icon: "person",
				},
				{
					id: "company",
					title: "Công ty",
					type: "item",
					url: "/admin/company",
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
					url: "/admin/categories",
					icon: "category",
				},
				{
					id: "products",
					title: "Sản phẩm",
					type: "item",
					url: "/admin/products",
					icon: "shopping_bag",
				},
				{
					id: "collections",
					title: "Bộ sưu tập",
					type: "item",
					url: "/admin/collections",
					icon: "collections_bookmark",
				},
			],
		},
		{
			id: "other",
			name: "Khác",
			subtitle: "Quản lý dữ liệu tùy chỉnh",
			type: "group",
			children: [
				{
					id: "custom_footer",
					title: "Danh mục khác",
					type: "item",
					url: "/admin/others",
					icon: "widgets"
				}
			]
		},
	],
};

export default menuItems;
