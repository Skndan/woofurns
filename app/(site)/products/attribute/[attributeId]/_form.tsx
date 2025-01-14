'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/constants/mock-api';
import { Attribute, AttributeValue } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AttributeService } from '../attribute.service';
import { PackageOpen, Plus, Trash } from 'lucide-react';
import { SubHeading } from '@/components/ui/sub-heading';
import { ChevronDown, Circle, Palette, Radio, RectangleHorizontal, Square, Image } from "lucide-react";


const status = [
  {
    value: "RECTANGLE",
    label: "Rectangle",
    icon: <RectangleHorizontal className={"size-4"} />
  },
  {
    value: "CIRCLE",
    label: "Circle",
    icon: <Circle className={"size-4"} />
  },
  {
    value: "RADIO",
    label: "Radio",
    icon: <Radio className={"size-4"} />
  },
  {
    value: "SQUARE",
    label: "Square",
    icon: <Square className={"size-4"} />
  },
  {
    value: "DROPDOWN",
    label: "Dropdown",
    icon: <ChevronDown className={"size-4"} />
  },
  {
    value: "IMAGE",
    label: "Image",
    icon: <Image className={"size-4"} />
  },
  {
    value: "COLOR",
    label: "Color",
    icon: <Palette className={"size-4"} />
  }
]

const valueSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  attribute: z.object({
    id: z.string(),
  })
});

const formSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  style: z.string(),
  values: z.array(valueSchema),
});

export default function AttributeForm({
  initialData,
  initialValue,
  id
}: {
  initialData: Attribute | null;
  initialValue: AttributeValue[];
  id: string | null
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    id: initialData?.id ?? '',
    code: initialData?.code ?? '',
    name: initialData?.name ?? '',
    style: initialData?.style ?? '',
    values: initialValue
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const products = useWatch({
    control,
    name: "values", // Specify the field to watch
  });


  const title = id ? 'Edit Attribute' : 'Create Attribute';
  const description = id ? 'Update Attribute.' : 'Add Attribute';
  const toastMessage = id ? 'Attribute updated.' : 'Attribute created.';
  const action = id ? 'Save changes' : 'Create';

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values);

    var data = {
      attribute: {
        id: values.id,
        code: values.code,
        name: values.name,
        style: values.style,
        status: 'PUBLISH'
      },
      values: values.values
    }

    var response = await AttributeService.putAttribute(initialData?.id, data);
    if (response.status !== 200) {
      toast.error("Something went wrong");
      return;
    }

    toast.success(toastMessage);
    router.refresh();
    router.push(`../attribute`);
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

            <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter attribute name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code <span className="text-red-600">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style <span className="text-red-600">*</span></FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((category) => (
                          <SelectItem key={category.value} value={category.value}><div className='flex flex-row items-center gap-2'>
                            {category.icon}{category.label}
                          </div></SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubHeading title={"Variants"} className="text-muted-foreground" />
            {fields.map((field, index) => (
              <div key={`item${index}${field.id}`} className="grid md:grid-cols-3 gap-x-4 gap-y-4">
                <FormField
                  control={form.control}
                  name={`values.${index}.code`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code <span className="text-red-600">*</span></FormLabel>
                      <div className="relative">
                        <PackageOpen className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input disabled={loading} placeholder="Item name" className="pl-8" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`values.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                      <div className="relative">
                        <PackageOpen className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input disabled={loading} placeholder="Item name" className="pl-8" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" variant="destructive" size="icon" disabled={(fields.length == 1)} className="ml-2" onClick={async () => {

                  // var vendorOrderLine = line[index];

                  await AttributeService
                    .deleteAttributeValue("vendorOrderLine.id")
                    .then((res) => {
                      remove(index)
                    }).catch(error => {
                      if (error.response) {
                        if (error.response.status === 400) {
                          // toast.error("You already have payroll created for this time frame");
                          // setFormLoading(true);
                        } else {

                        }
                      } else {

                      }
                    });

                }}>
                  <Trash className="h-4 w-4" />
                </Button>

              </div>))}
            <Button type="button" variant={"secondary"} onClick={async () => {
              var data = {
                attribute: {
                  id: initialData?.id
                }
              }
              var response = await AttributeService.createAttributeValue(data);
              append(response.data)
            }}>
              <Plus className="h-4 w-4 mr-2" /> Add Variant
            </Button>
            <div className='flex flex-row gap-2'>
              <Button type='reset' variant={'secondary'}>Cancel</Button>
              <Button type='submit'>{action}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
