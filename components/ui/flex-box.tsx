import React from 'react';

interface CellActionProps {
  children?: React.ReactNode;
}

const FlexBox: React.FC<CellActionProps> = ({ children }) => {
  return (
    <div
      className="flex h-9 items-center space-x-2 border rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </div>
  );
};

export default FlexBox;
