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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { columns } from './product-table/columns';
import { ProductService } from '../product.service';
import { useProductTableFilters } from './product-table/use-product-table-filters';

type TEmployeeListingPage = {
};

export default function ProductListingPage({ }: TEmployeeListingPage) {

  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const search = searchParams.get('q');
  const pageLimit = searchParams.get('limit');

  var filters = {
    ...(search && { search }),
  };

  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0); // Default page size  

  const fetchData = async () => {
    const response = await ProductService.getProduct();
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
  } = useProductTableFilters();


  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title={`Products (${total})`}
          description="Manage your Products"
        />

        <Link
          href={'/products/new?tab=general'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Link>
      </div>
      <Separator />
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
      <DataTable columns={columns} totalItems={total} totalPages={pages} fetchData={fetchData} />
    </div>
  );
}
