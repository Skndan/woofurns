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
import { Brand } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { BrandService } from '../brand.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const status = [
  {
    value: "PRIVATE",
    label: "Private",
  },
  {
    value: "PUBLIC",
    label: "Public",
  }
]

const formSchema = z.object({
  // image: z
  //   .any()
  //   .refine((files) => files?.length == 1, 'Image is required.')
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.'
  //   ),
  code: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.'
  }),
  name: z.string(),
  slug: z.string(),
  featured: z.boolean(),
  status: z.string()
});

export default function BrandForm({
  initialData,
}: {
  initialData: Brand | null;
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    code: initialData?.code || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    status: initialData?.status || '',
    featured: initialData?.featured || false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData ? 'Update Brand.' : 'Add Brand';
  const toastMessage = initialData ? 'Brand updated.' : 'Brand created.';
  const action = initialData ? 'Save changes' : 'Create';

  async function onSubmit(values: z.infer<typeof formSchema>) { 
    if (initialData) {
      var response = await BrandService.putBrand(initialData.id, values);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../brands`);

    } else {
      var response = await BrandService.postBrand(values);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../brands`);

    }
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
            {/* <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                        // disabled={loading}
                        // progresses={progresses}
                        // pass the onUpload function here for direct upload
                        // onUpload={uploadFiles}
                        // disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            /> */}


            <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter brand name" {...field} />
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
                    <FormLabel>code <span className="text-red-600">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((category) => (
                          <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <div className="flex h-9 items-center space-x-2   border rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={(s) => {
                            field.onChange(s);
                          }}
                        />
                        <FormLabel htmlFor="terms">
                          Is Featured?
                        </FormLabel>
                      </div>


                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
