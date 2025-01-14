interface SubHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export const SubHeading: React.FC<SubHeadingProps> = ({
  title,
  description,
  className
}) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold tracking-tight ${className}`}>{title}</h2>
      {description && <p className="text-muted-foreground text-sm pt-2">
        {description}
      </p>} 
    </div>
  );
};
