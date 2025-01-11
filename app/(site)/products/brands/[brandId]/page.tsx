"use client";

import { useState, useEffect } from "react";
import BrandForm from "./_form";
import { BrandService } from "../brand.service";
import FormCardSkeleton from "@/components/form-card-skeleton";

const ProfileForm = ({
    params
}: {
    params: { brandId: string }
}) => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {

            if (params.brandId != 'new') {
                const response = await BrandService.getBrandById(params.brandId);
                setData(response.data)
            }

            setLoading(false);
        })()
    }, [params.brandId])




    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4">
                {
                    loading ? <FormCardSkeleton /> : <BrandForm initialData={data} />
                }
            </div>
        </div>
    );
}

export default ProfileForm;
