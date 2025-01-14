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
import { Tax } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TaxService } from '../tax.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const taxType = [
  {
    value: "PERCENT",
    label: "Percent",
  },
  {
    value: "FLAT",
    label: "Flat",
  }
]

const formSchema = z.object({
  code: z.string(),
  title: z.string(),
  value: z.string(),
  taxType: z.string()
});

export default function TaxForm({
  initialData,
}: {
  initialData: Tax | null;
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    code: initialData?.code || '',
    title: initialData?.code || '',
    value: initialData?.code || '',
    taxType: initialData?.code || '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const title = initialData ? 'Edit Tax' : 'Create Tax';
  const description = initialData ? 'Update Tax.' : 'Add Tax';
  const toastMessage = initialData ? 'Tax updated.' : 'Tax created.';
  const action = initialData ? 'Save changes' : 'Create';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData) {
      var response = await TaxService.putTax(initialData.id, values);
      if (response.status !== 200) {
        toast.error("Something went wrong");
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../tax-rule`);

    } else {
      var response = await TaxService.postTax(values);
      if (response.status !== 201) {
        toast.error("Something went wrong");
        return;
      }

      toast.success(toastMessage);
      router.refresh();
      router.push(`../tax-rule`);

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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value <span className="text-red-600">*</span></FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Enter value" {...field} />
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
                name="taxType"
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
                        {taxType.map((tax) => (
                          <SelectItem key={tax.value} value={tax.value}>{tax.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
      </CardContent>
    </Card>
  );
}
