import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import DateTimeCell from '@/components/ui/cells/date-time-cell';
import { Tax } from '@/types/product';
import StatusCell from '@/components/ui/cells/status-cell';
import BoolCell from '@/components/ui/cells/bool-cell';

export const columns: ColumnDef<Tax>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  }, 
  {
    accessorKey: 'taxType',
    header: 'Type',
    cell: ({ row }) => <StatusCell status={row.getValue("taxType") ?? ""} />
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
