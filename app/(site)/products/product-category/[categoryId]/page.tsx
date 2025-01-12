"use client";

import { useState, useEffect } from "react";
import ProductCategoryForm from "./_form";
import { CategoryService } from "../category.service";
import FormCardSkeleton from "@/components/form-card-skeleton";
import { ProductCategory } from "@/types/product";

const ProfileForm = ({
    params
}: {
    params: { categoryId: string }
}) => {

    const [data, setData] = useState(null);
    const [categories, setCategories] = useState<ProductCategory[]>([]);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {

            if (params.categoryId != 'new') {
                const response = await CategoryService.getProductCategoryById(params.categoryId);
                setData(response.data)
            }

            const response = await CategoryService.getProductCategory();
            setCategories(response.data.content)

            setLoading(false);
        })()
    }, [params.categoryId])

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4">
                {
                    loading ? <FormCardSkeleton /> : <ProductCategoryForm initialData={data} categories={categories} />
                }
            </div>
        </div>
    );
}

export default ProfileForm;
