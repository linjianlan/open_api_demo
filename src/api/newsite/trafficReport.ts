import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/trafficReport/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/trafficReport',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/trafficReport/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/trafficReport',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/trafficReport',
    method: 'put',
    data: obj
  })
}

