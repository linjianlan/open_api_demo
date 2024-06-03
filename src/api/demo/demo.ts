import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/demo/demo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/demo/demo',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/demo/demo/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/demo/demo',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/demo/demo',
    method: 'put',
    data: obj
  })
}

