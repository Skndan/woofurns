"use client";

import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useProductCategoryTableFilters } from './category-table/use-category-table-filters';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { columns } from './category-table/columns';
import { CategoryService } from '../category.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCategory } from '@/types/product';
import { CategoryTree } from '@/components/category-tree';

type TEmployeeListingPage = {
};

export default function ProductCategoryListingPage({ }: TEmployeeListingPage) {

  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const search = searchParams.get('q');
  const pageLimit = searchParams.get('limit');

  var filters = {
    ...(search && { search }),
  };

  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0); // Default page size  
  const [treeCategories, setTreeCategory] = useState<ProductCategory[]>([]);


  const fetchData = async () => {
    const response = await CategoryService.getProductCategory();
    const data = response.data;
    setPages(data.totalPages)
    setTotal(data.totalElements)
    return data.content;
  };

  useEffect(() => {
    const init = async () => {
      fetchData();
    };

    init();
  }, [])

  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useProductCategoryTableFilters();


  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title={`Product Category (${total})`}
          description="Manage your category"
        />

        <Link
          href={'/products/product-category/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Link>
      </div>
      <Separator />

      <Tabs defaultValue="list" className="space-y-4">

        <div className='flex flex-row justify-between'>
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="tree">Tree</TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-4">
            <DataTableSearch
              searchKey="name"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPage={setPage}
            />
            <DataTableResetFilter
              isFilterActive={isAnyFilterActive}
              onReset={resetFilters}
            />
          </div>
        </div>
        <TabsContent value="list" className="space-y-4">
          <DataTable columns={columns} totalItems={total} totalPages={pages} fetchData={fetchData} />
        </TabsContent>
        <TabsContent value="tree" className="space-y-4">
          <CategoryTree categories={treeCategories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
