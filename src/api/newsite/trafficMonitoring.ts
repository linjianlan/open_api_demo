import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/trafficMonitoring/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/trafficMonitoring',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/trafficMonitoring/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/trafficMonitoring',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/trafficMonitoring',
    method: 'put',
    data: obj
  })
}

