'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProductStatus } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import FlexBox from '@/components/ui/flex-box';
import { SubHeading } from '@/components/ui/sub-heading';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';

const formSchema = z.object({
  refundable: z.boolean(),
  warranty: z.boolean(),
  featured: z.boolean(),
  trending: z.boolean(),
  returnable: z.boolean(),
  status: z.string().min(1),
  saleStatus: z.string().min(1),
});

type SeoFormValues = z.infer<typeof formSchema>

export default function StatusForm({
  initialData,
}: {
  initialData: ProductStatus | null;
}) {

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      refundable: initialData?.refundable ?? false,
      warranty: initialData?.warranty ?? false,
      featured: initialData?.featured ?? false,
      trending: initialData?.trending ?? false,
      returnable: initialData?.returnable ?? false,
      status: initialData?.status ?? '',
      saleStatus: initialData?.saleStatus ?? '',
    }
  });

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData ? 'Update Brand.' : 'Add Brand';
  const toastMessage = initialData ? 'Brand updated.' : 'Brand created.';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = async (data: SeoFormValues) => {

  };

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

  const saleStatus = [
    {
      value: "ON_SALE",
      label: "On sale",
    },
    {
      value: "NOT_ON_SALE",
      label: "Not on sale",
    },
    {
      value: "SCHEDULED",
      label: "Scheduled",
    }
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">
          <div className="col-span-3 pb-2">
            <SubHeading title='Status' />
          </div>

          <FormField
            control={form.control}
            name="refundable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is refundable?</FormLabel>
                <FormControl>
                  <FlexBox>
                    <Checkbox
                      id="refundable"
                      checked={field.value}
                      onCheckedChange={(s) => {
                        field.onChange(s);
                      }}
                    />
                    <FormLabel htmlFor="refundable">
                      Refundable
                    </FormLabel>
                  </FlexBox>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have warranty?</FormLabel>
                <FormControl>
                  <FlexBox>
                    <Checkbox
                      id="warranty"
                      checked={field.value}
                      onCheckedChange={(s) => {
                        field.onChange(s);
                      }}
                    />
                    <FormLabel htmlFor="warranty">
                      Warranty
                    </FormLabel>
                  </FlexBox>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is featured?</FormLabel>
                <FormControl>
                  <FlexBox>
                    <Checkbox
                      id="featured"
                      checked={field.value}
                      onCheckedChange={(s) => {
                        field.onChange(s);
                      }}
                    />
                    <FormLabel htmlFor="featured">
                      Featured
                    </FormLabel>
                  </FlexBox>
                </FormControl>
                <FormDescription>
                  Enabling this option will display a Featured tag on the product
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is trending?</FormLabel>
                <FormControl>
                  <FlexBox>
                    <Checkbox
                      id="trending"
                      checked={field.value}
                      onCheckedChange={(s) => {
                        field.onChange(s);
                      }}
                    />
                    <FormLabel htmlFor="trending">
                      Trending
                    </FormLabel>
                  </FlexBox>
                </FormControl>
                <FormDescription>
                <div className='flex flex-row '>
                  <InfoIcon className={'h-4 w-4'}/>
                  <Label className={"text-muted-foreground"}>Enabling this will showcase the product in the sidebar of the product page as a trending item</Label>
                </div>
                </FormDescription>
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="returnable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is returnable?</FormLabel>
                <FormControl>
                  <FlexBox>
                    <Checkbox
                      id="returnable"
                      checked={field.value}
                      onCheckedChange={(s) => {
                        field.onChange(s);
                      }}
                    />
                    <FormLabel htmlFor="returnable">
                      Returnable
                    </FormLabel>
                  </FlexBox>
                </FormControl>
                <FormDescription>
                  Enabling this option will display a Featured tag on the product
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="col-span-3 pt-6">
            <SubHeading title='Availability' />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value} defaultValue={field.value}
                  onValueChange={field.onChange} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {status.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saleStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Status</FormLabel>
                <Select value={field.value} defaultValue={field.value}
                  onValueChange={field.onChange} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder="Select Sale Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {saleStatus.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
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
  );
}
