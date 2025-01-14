"use client";

import { useState, useEffect } from "react";
import AttributeForm from "./_form";
import FormCardSkeleton from "@/components/form-card-skeleton";
import { AttributeService } from "../attribute.service";

const ProfileForm = ({
    params
}: {
    params: { attributeId: string }
}) => {

    const [data, setData] = useState(null);
    const [value, setValue] = useState([]);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {

            if (params.attributeId !== 'new') {
                const response = await AttributeService.getAttributeById(params.attributeId);
                setData(response.data.attribute)
                setValue(response.data.values)
            }

            if (params.attributeId === 'new') {
                const response = await AttributeService.createAttribute();
                setData(response.data.attribute)
                setValue(response.data.values)
            }

            setLoading(false);
        })()
    }, [params.attributeId])
 
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4">
                {
                    loading ? <FormCardSkeleton /> : <AttributeForm id={params.attributeId === 'new' ? null : params.attributeId} initialData={data} initialValue={value} />
                }
            </div>
        </div>
    );
}

export default ProfileForm;
