import request from '/@/utils/request';

export function fetchList(query?: Object) {
	return request({
		url: '/newsite/solve/page',
		method: 'get',
		params: query,
	});
}

export function addObj(obj?: Object) {
	return request({
		url: '/newsite/solve',
		method: 'post',
		data: obj,
	});
}

export function getObj(id?: string) {
	return request({
		url: '/newsite/solve/' + id,
		method: 'get',
	});
}

export function delObjs(ids?: Object) {
	return request({
		url: '/newsite/solve',
		method: 'delete',
		data: ids,
	});
}

export function putObj(obj?: Object) {
	return request({
		url: '/newsite/solve',
		method: 'put',
		data: obj,
	});
}

//父级标签查询
export function seleTitleByid(obj?: object) {
	return request({
		url: '/newsite/titleManage/seleTitleByid',
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: obj,
	});
}
