'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Plus } from 'lucide-react'
import { ProductCategory } from '@/types/product'
import NetworkImage from './ui/cells/network-image-cell'
import { Button } from './ui/button'

interface CategoryTreeProps {
  categories: ProductCategory[];
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  )
}

function CategoryItem({ category }: { category: ProductCategory }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = category.children && category.children.length > 0

  return (
    <li>
      <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-lg" onClick={() => setIsExpanded(!isExpanded)}>
        {hasChildren && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-500">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
        <NetworkImage
          src={category.image.fileUrl}
          hash={category.image.hash}
          alt={category.name} />
        <span className="flex-grow">{category.name}</span>

        <Button size={'icon'} variant={'outline'} asChild>
          <Link href={`/categories/${category.id}/add`} className="primary hover:primary">
            <Plus size={20} />
          </Link>
        </Button>

      </div>
      {hasChildren && isExpanded && (
        <ul className="ml-6 mt-2 space-y-2">
          {category.children!.map((child: ProductCategory) => (
            <CategoryItem key={child.id} category={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

