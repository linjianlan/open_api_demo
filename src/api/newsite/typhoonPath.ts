import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/newsite/typhoonPath/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/newsite/typhoonPath',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/newsite/typhoonPath/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/newsite/typhoonPath',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/newsite/typhoonPath',
    method: 'put',
    data: obj
  })
}

