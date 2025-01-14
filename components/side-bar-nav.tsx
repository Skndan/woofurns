"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Options } from "nuqs"
import { useProductFormFilters } from "@/app/(site)/products/(products)/_components/product-table/use-product-form-filters"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {

  items: {
    label: string
    tab: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {

  const {
    tab,
    setTab
  } = useProductFormFilters();


  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          variant={"ghost"}
          key={item.tab}
          onClick={(s) => {
            setTab(item.tab);
          }}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            tab === item.tab
              ? "bg-muted hover:bg-muted"
              : "hover:bg-muted",
            "justify-start whitespace-nowrap"
          )}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )
}
