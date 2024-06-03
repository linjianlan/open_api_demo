import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pig-demo/demo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pig-demo/demo',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pig-demo/demo/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pig-demo/demo',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pig-demo/demo',
    method: 'put',
    data: obj
  })
}

