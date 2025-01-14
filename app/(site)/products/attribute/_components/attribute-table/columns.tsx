import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import DateTimeCell from '@/components/ui/cells/date-time-cell';
import { Attribute } from '@/types/product';
import StatusCell from '@/components/ui/cells/status-cell';
import BoolCell from '@/components/ui/cells/bool-cell';
import StyleCell from '@/components/ui/cells/style-cell';

export const columns: ColumnDef<Attribute>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'style',
    header: 'Style',
    cell: ({ row }) => <StyleCell status={row.getValue("style")} />
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
