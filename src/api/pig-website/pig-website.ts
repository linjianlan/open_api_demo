import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/pig-website/pig-website/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/pig-website/pig-website',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/pig-website/pig-website/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/pig-website/pig-website',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/pig-website/pig-website',
    method: 'put',
    data: obj
  })
}

