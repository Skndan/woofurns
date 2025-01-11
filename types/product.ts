export interface Brand {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  code: string
  name: string
  slug: string
  status: string
  featured: boolean
}

export interface Product {
  id: string
}

export interface ProductCategory {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  active: boolean
  code: string
  name: string
  slug: string
  metaTitle: string
  metaKeyword: string
  metaDescription: string
  showInFooter: boolean
  status: string
  featured: boolean
  children: ProductCategory[]
  image: Image
}

export interface Image {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  active: boolean
  fileName: string
  hash: any
  fileUrl: string
}
