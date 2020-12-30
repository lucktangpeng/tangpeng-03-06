import request from '@/utils/request'
interface Role {
    code?: string
    id?: number
    name?: string
    startCreateTime?: string
    endCreateTime?: string
    current?: number
    size?: number
}

interface SaveOrUpdateRole {
  id: number
  code: string
  name: string
  description: string
}

export const getRolePages = (data: Role) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const saveOrUpdate = (data: SaveOrUpdateRole) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRoleID = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const deleteRoleID = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const getRolesWithUserPermission = (userId: number|null) => {
  return request({
    method: 'GET',
    url: '/boss/role/getRolesWithUserPermission',
    params: {
      userId
    }
  })
}

export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}