"use client";

import { useState, useEffect } from "react";
// import ProductForm from "./_form";
import { ProductService } from "../product.service";
import FormCardSkeleton from "@/components/form-card-skeleton";

const ProfileForm = ({
    params
}: {
    params: { productId: string }
}) => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // (async () => {

        //     if (params.productId != 'new') {
        //         const response = await ProductService.getProductById(params.productId);
        //         setData(response.data)
        //     }

        //     setLoading(false);
        // })()
    }, [params.productId])




    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4">
                {/* {
                    loading ? <FormCardSkeleton /> : <ProductForm initialData={data} />
                } */}
            </div>
        </div>
    );
}

export default ProfileForm;
