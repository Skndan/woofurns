'use client';

import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
  name: z.string().min(1),
});

type GeneralFormValues = z.infer<typeof formSchema>

export default function GeneralForm({
  initialData,
}: {
  initialData: null;
}) {

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: ''
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <span className="text-red-600">*</span></FormLabel>
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
