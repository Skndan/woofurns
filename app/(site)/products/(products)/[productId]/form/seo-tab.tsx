'use client';

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product, Seo } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
  metaTitle: z.string().min(1),
  metaKeyword: z.string().min(1),
  metaDescription: z.string().min(1),
});

type SeoFormValues = z.infer<typeof formSchema>

export default function SeoForm({
  initialData,
}: {
  initialData: Seo | null;
}) {

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      metaTitle: initialData?.metaTitle ?? '',
      metaKeyword: initialData?.metaKeyword ?? '',
      metaDescription: initialData?.metaDescription ?? '',
    }
  });

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData ? 'Update Brand.' : 'Add Brand';
  const toastMessage = initialData ? 'Brand updated.' : 'Brand created.';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = async (data: SeoFormValues) => {

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

        <div className="grid md:grid-cols-1 gap-x-8 gap-y-4">

          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter meta title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaKeyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keyword <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter meta keyword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your meta description here..."
                    editorClassName="focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
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
  );
}
