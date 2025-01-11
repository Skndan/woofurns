export interface Profile {
  id: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  active: boolean
  firstName: string
  lastName: string
  email: string
  mobile?: string
  roleId: string
  userId: string
  fcm: any
}

export interface Role {
  id: string
  name: string
  description: string
  scopeParamRequired: any
  composite: boolean
  composites: any
  clientRole: boolean
  containerId: string
  attributes: any
}