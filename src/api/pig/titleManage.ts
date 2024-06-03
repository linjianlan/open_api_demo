import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pig/titleManage/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pig/titleManage',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pig/titleManage/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pig/titleManage',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pig/titleManage',
    method: 'put',
    data: obj
  })
}

