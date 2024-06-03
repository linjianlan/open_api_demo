import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/flowRvaporationReport/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/flowRvaporationReport',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/flowRvaporationReport/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/flowRvaporationReport',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/flowRvaporationReport',
    method: 'put',
    data: obj
  })
}

