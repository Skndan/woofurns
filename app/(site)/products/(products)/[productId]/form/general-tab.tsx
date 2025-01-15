'use client';

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
  title: z.string().min(1),
  overview: z.string().min(1),
  description: z.string().min(1),
});

type GeneralFormValues = z.infer<typeof formSchema>

export default function GeneralForm({
  initialData,
}: {
  initialData: Product | null;
}) {

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      title: initialData?.title ?? '',
      overview: initialData?.overview ?? '',
      description: initialData?.description ?? '',
    }
  });

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData ? 'Update Brand.' : 'Add Brand';
  const toastMessage = initialData ? 'Brand updated.' : 'Brand created.';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = async (data: GeneralFormValues) => {

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

        <div className="grid md:grid-cols-1 gap-x-8 gap-y-4">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overview <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter overview" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your description here..." 
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
