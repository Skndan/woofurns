'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { toStateDescription } from '@/lib/utils/string-utils';
import { Loader } from 'lucide-react';

interface StateModalProps {
  isOpen: boolean;
  state: string
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const StateModal: React.FC<StateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  state,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description={`${toStateDescription(state)}`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="default" onClick={onConfirm}>
          {loading &&
            <Loader className="animate-spin h-5 w-5 mr-3" />}
          Proceed
        </Button>
      </div>
    </Modal>
  );
};
