import React from "react";
import FieldDisplay from "../../../../components/FieldDisplay";
import Icon from "../../../../components/Icon";
import SwipeSlider from "../../../user/components/SwipeSlider";
import { Product } from "../../../../api/productService";

interface DetailProps {
    object: Product;
}

const Detail = ({ object }: DetailProps) => {
    const productImages = object.productImages || [];
    let slides = productImages.map((img) => {
        return {
            kind: "image",
            src: img.path,
            content: `Product Image ${img.id}`,
        };
    });

    return (
        <>
            <div className="object-detail w-full flex">
                <div className="w-[60%] h-fit">
                    {/* Common Info */}
                    <div className="label-content uppercase text-xl font-medium mb-4">
                        Thông tin chung
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <FieldDisplay
                            label="Tên sản phẩm"
                            value={object?.name || ""}
                            icon={<Icon name="catName" />}
                            inline
                        ></FieldDisplay>
                        <FieldDisplay
                            label="Mã sản phẩm"
                            value={object?.slug || ""}
                            icon={<Icon name="catSlug" />}
                            inline
                        ></FieldDisplay>
                    </div>

                </div>
                <div className="image-preview w-[40%] mr-3">
                    <SwipeSlider showThumbs width="30rem" height="40rem" slides={slides} />
                </div>
            </div>
        </>
    );
};

export default Detail;
