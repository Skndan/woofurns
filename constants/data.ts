import { NavItem } from '@/types';


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Products',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Products',
        url: '/products',
        icon: 'pizza',
      },
      {
        title: 'Brands',
        url: '/products/brands',
        icon: 'pizza'
      },
      {
        title: 'Category',
        url: '/products/product-category',
        icon: 'pizza'
      },
      {
        title: 'Tax',
        url: '/products/tax-rule',
        icon: 'pizza'
      },
      {
        title: 'Attributes',
        url: '/products/attribute',
        icon: 'pizza'
      },
    ]
  },
];

export const navScanItems: NavItem[] = [
  {
    title: 'Profile',
    url: '/profile',
    icon: 'user2',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Raise Ticket',
    url: '/raise-ticket',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  }
];
