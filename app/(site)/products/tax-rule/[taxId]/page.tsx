"use client";

import { useState, useEffect } from "react";
import TaxForm from "./_form";
import { TaxService } from "../tax.service";
import FormCardSkeleton from "@/components/form-card-skeleton";

const ProfileForm = ({
    params
}: {
    params: { taxId: string }
}) => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {

            if (params.taxId != 'new') {
                const response = await TaxService.getTaxById(params.taxId);
                setData(response.data)
            }

            setLoading(false);
        })()
    }, [params.taxId])




    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4">
                {
                    loading ? <FormCardSkeleton /> : <TaxForm initialData={data} />
                }
            </div>
        </div>
    );
}

export default ProfileForm;
