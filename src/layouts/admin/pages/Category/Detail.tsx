import React from "react";
import { Category } from "../../../../api/categoryService";
import FieldDisplay from "../../../../components/FieldDisplay";
import Icon from "../../../../components/Icon";

interface DetailProps {
	object: Category;
}

const Detail = ({ object }: DetailProps) => {
	return (
		<>
			<div className="object-detail">
				<div className="grid grid-cols-1 gap-4">
					<FieldDisplay
						label="Tên danh mục"
						value={object?.name || ""}
						icon={<Icon name="catName" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Mã danh mục"
						value={object?.slug || ""}
						icon={<Icon name="catSlug" />}
						inline
					></FieldDisplay>
					{object?.parentId && object.parentId > 0 && (
						<FieldDisplay
							label="Danh mục cha"
							value={object?.parentName || ""}
							icon={<Icon name="catParent" />}
							inline
						></FieldDisplay>
					)}
				</div>
			</div>
		</>
	);
};

export default Detail;
