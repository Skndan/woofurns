'use client';
import { SidebarNav } from "@/components/side-bar-nav"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from "next/navigation";

const sidebarNavItems = [
  {
    label: "General",
    tab: "general",
  },
  {
    label: "Inventory",
    tab: "inventory",
  },
  {
    label: "Setup",
    tab: "setup",
  },
  {
    label: "Images",
    tab: "images",
  },
  {
    label: "SEO",
    tab: "seo",
  },
  {
    label: "Shipping & Tax",
    tab: "shipping",
  },
  {
    label: "Status",
    tab: "status",
  },

]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()
  return (
    <>
      <Card className='mx-auto w-full'>
        <CardHeader>
          <CardTitle className='text-left text-2xl font-bold'>
            {pathname.match("new") ? 'Add Product' : 'Update Product'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}