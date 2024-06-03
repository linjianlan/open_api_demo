import request from '/@/utils/request';

export function fetchList(query?: Object) {
	return request({
		url: '/newsite/titleManage/page',
		method: 'get',
		params: query,
	});
}

export function addObj(obj?: Object) {
	return request({
		url: '/newsite/titleManage',
		method: 'post',
		data: obj,
	});
}

export function getObj(id?: string) {
	return request({
		url: '/newsite/titleManage/' + id,
		method: 'get',
	});
}

export function delObjs(ids?: Object) {
	return request({
		url: '/newsite/titleManage',
		method: 'delete',
		data: ids,
	});
}

export function putObj(obj?: Object) {
	return request({
		url: '/newsite/titleManage',
		method: 'put',
		data: obj,
	});
}

export function seleIdObj() {
	return request({
		url: '/newsite/titleManage/seleId',
		method: 'post',
		data: '',
	});
}
