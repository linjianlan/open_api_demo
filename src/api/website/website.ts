import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/website/website/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/website/website',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/website/website/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/website/website',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/website/website',
    method: 'put',
    data: obj
  })
}

