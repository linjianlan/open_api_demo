import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pig/demo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pig/demo',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pig/demo/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pig/demo',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pig/demo',
    method: 'put',
    data: obj
  })
}

