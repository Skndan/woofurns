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
  image: FileInfo
}

export interface FileInfo {
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

export interface Tax {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  code: string
  title: string
  value: number
  taxType: string
}

export interface Attribute {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  code: string
  name: string
  style: string
}

export interface AttributeValue {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  attribute: Attribute
  code: string
  name: string
}