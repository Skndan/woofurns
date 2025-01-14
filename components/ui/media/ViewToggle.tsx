import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Grid, List } from 'lucide-react'

type ViewToggleProps = {
  value: 'grid' | 'list'
  onChange: (value: 'grid' | 'list') => void
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onChange}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

