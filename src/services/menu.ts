import request from '@/utils/request'
// import qs from 'qs'

interface MenuData {
  parentld: number
  name: string
  href: string
  id?: number
  icon?: string
  orderNum?: number
  description?: string
  shown?: boolean
}

export const saveOrUpdate = (data: MenuData) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}
// getEditMenuInfo

export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getMenuAll = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const getMenuEdit = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/menu/${id}`
  })
}

export const deleteMenuEdit = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

export const getRoleMenus = (roleId: string|number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}