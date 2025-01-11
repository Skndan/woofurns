'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import DateTimeCell from '@/components/ui/cells/date-time-cell';
import { ProductCategory } from '@/types/product';
import StatusCell from '@/components/ui/cells/status-cell';
import BoolCell from '@/components/ui/cells/bool-cell';
import Image from 'next/image';
import NetworkImage from '@/components/ui/cells/network-image-cell';

export const columns: ColumnDef<ProductCategory>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const category = row.original;
      return <NetworkImage src={category.image.fileUrl} hash={category.image.hash} alt={row.getValue("name")} />;
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => <BoolCell status={row.getValue("featured") ?? ""} />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusCell status={row.getValue("status") ?? ""} />
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => <DateTimeCell dateStr={row.getValue("updatedAt")} isTime={2} />
  },
  {
    id: 'actions',
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
