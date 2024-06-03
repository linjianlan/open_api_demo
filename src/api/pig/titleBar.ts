import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pig/titleBar/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pig/titleBar',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pig/titleBar/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pig/titleBar',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pig/titleBar',
    method: 'put',
    data: obj
  })
}

