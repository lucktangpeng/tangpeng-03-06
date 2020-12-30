import request from '@/utils/request'
interface Resource {
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: number|string
  endCreateTime?: string
  current?: number
  size?: number
}

export const getResourcePages = (data: Resource) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getCategoryAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const getResourceAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// /boss/resource/allocateRoleResources
export const AllocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}