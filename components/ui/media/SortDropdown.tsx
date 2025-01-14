import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SortDropdownProps = {
  value: 'name' | 'type'
  onChange: (value: 'name' | 'type') => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Sort by Name</SelectItem>
        <SelectItem value="type">Sort by Type</SelectItem>
      </SelectContent>
    </Select>
  )
}

