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
 
export interface Product {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  code: string
  title: string
  overview: string
  description: string
  slug: string
  purchased: number
  selling: number
  offered: number
  status: string
  brand: Brand
  saleStartAt: string
  saleEndAt: string
  categories: ProductCategory[]
  type: string
  collections: Collection[]
  attributes: ProductAttribute[]
  seo: Seo
  productStatus: ProductStatus
  freeShipping: boolean
  taxRule: TaxRule
  estimatedDeliveryText: string
  returnPolicyText: string
}
 
export interface Collection {
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
  products: string[]
  featured: boolean
}

export interface ProductAttribute {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  name: string
  values: string[]
  product: string
}

export interface Seo {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  metaTitle: string
  metaKeyword: string
  metaDescription: string
}

export interface ProductStatus {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  active: boolean
  refundable: boolean
  warranty: boolean
  featured: boolean
  trending: boolean
  returnable: boolean
  status: string
  saleStatus: string
}

export interface TaxRule {
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
