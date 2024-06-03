import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/waterQualityInfo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/waterQualityInfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/waterQualityInfo/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/waterQualityInfo',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/waterQualityInfo',
    method: 'put',
    data: obj
  })
}

