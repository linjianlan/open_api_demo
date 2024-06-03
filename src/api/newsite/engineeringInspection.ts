import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/engineeringInspection/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/engineeringInspection',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/engineeringInspection/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/engineeringInspection',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/engineeringInspection',
    method: 'put',
    data: obj
  })
}

