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
import { ProductCategory } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CategoryService } from '../category.service';
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
  file: z
    .any(),
  // .refine((files) => files?.length == 0, 'Image is required.')
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   '.jpg, .jpeg, .png and .webp files are accepted.'
  // ).optional(),
  code: z.string(),
  name: z.string(),
  slug: z.string(),
  featured: z.boolean(),
  status: z.string(),
  parent: z.any()
});

type CategoryFormValues = z.infer<typeof formSchema>

export default function ProductCategoryForm({
  initialData,
  categories
}: {
  initialData: ProductCategory | null;
  categories: ProductCategory[] | [];
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: initialData || {
      code: '',
      name: '',
      slug: '',
      featured: false,
      status: '',
    }
  });

  const fileRef = form.register('file', { required: true });

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData ? 'Update Category.' : 'Add Category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  async function onSubmit(data: CategoryFormValues) {
    setLoading(true);
    var formData = new FormData();

    var dd = {
      code: data.code,
      name: data.name,
      slug: data.slug,
      featured: data.featured,
      status: data.status,
      parent: data.parent 
    };
    formData.append('data', JSON.stringify(dd));
    formData.append("file", data.file);

    if (initialData) {
      var response = await CategoryService.putProductCategory(initialData.id, formData);
      if (response.status !== 201) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../product-category`);
      setLoading(false);
    } else {

      var response = await CategoryService.postProductCategory(formData);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../product-category`);
      setLoading(false);
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
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={1 * 1024 * 1024}
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
                      <Input disabled={loading} placeholder="Enter category name" {...field} />
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
                    <FormLabel>Slug <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel>Featured <span className="text-red-500">*</span></FormLabel>
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

              <FormField
                control={form.control}
                name="parent.id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select Categoy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category Image</FormLabel>
                      <FormControl>
                        <Input type="file" disabled={loading}
                          {...fileRef}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className='flex flex-row gap-2'>
              <Button type='reset' variant={'secondary'}>Cancel</Button>
              <Button type='submit'>

                {action}


              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
