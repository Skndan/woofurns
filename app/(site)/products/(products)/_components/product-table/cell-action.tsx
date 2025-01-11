'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { StateModal } from '@/components/modal/state-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product';
import { Edit, MoonIcon, MoreHorizontal, PauseCircleIcon, PlayCircleIcon, RotateCcwIcon, Trash, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ProductService } from '../../product.service';

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, showDialog] = useState(false);
  const [state, setState] = useState('');
  const router = useRouter();

  const onConfirm = async () => {
    try {
      // setLoading(true);
      // var response = await product.changeStatus({
      //   instanceId: data.instanceId,
      //   state: state
      // });

      // if (response.data.code === 200) {
      //   toast.success(response.data.message);
      // }

      // if (response.data.code === 400) {
      //   toast.error(response.data.message);
      // }

      router.refresh();
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    } finally {
      showDialog(false);
      setLoading(false);
    }
  };



  return (
    <>
      <StateModal
        isOpen={open}
        onClose={() => showDialog(false)}
        onConfirm={onConfirm}
        loading={loading}
        state={state} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change state</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled={(data.state == 'RUNNING') || (data.state == 'PENDING') || (data.state == 'TERMINATED') || (data.state == 'SHUTTING DOWN')} onClick={() => {
                    setState('START');
                    showDialog(true);
                  }}>
                    <PlayCircleIcon className="mr-2 h-4 w-4 text-green-500" /> Start
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={(data.state == 'STOPPED') || (data.state == 'PENDING') || (data.state == 'TERMINATED') || (data.state == 'SHUTTING DOWN')} onClick={() => {
                    setState('STOP');
                    showDialog(true);
                  }}>
                    <PauseCircleIcon className="mr-2 h-4 w-4 text-red-500" /> Stop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={(data.state == 'STOPPED') || (data.state == 'PENDING') || (data.state == 'TERMINATED') || (data.state == 'SHUTTING DOWN')} onClick={() => {
                    setState('HIBERNATE');
                    showDialog(true);
                  }}>
                    <MoonIcon className="mr-2 h-4 w-4 text-purple-500" /> Hibernate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={(data.state == 'RUNNING') || (data.state == 'PENDING') || (data.state == 'TERMINATED') || (data.state == 'SHUTTING DOWN')} onClick={() => {
                    setState('REBOOT');
                    showDialog(true);
                  }}>
                    <RotateCcwIcon className="mr-2 h-4 w-4 text-blue-500" /> Reboot
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={(data.state == 'TERMINATED') || (data.state == 'PENDING') || (data.state == 'TERMINATED') || (data.state == 'SHUTTING DOWN')} onClick={() => {
                    setState('TERMINATE');
                    showDialog(true);
                  }}>
                    <TrashIcon className="mr-2 h-4 w-4 text-gray-500" /> Terminate
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem  
            onClick={() => router.push(`/products/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled onClick={() => showDialog(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
