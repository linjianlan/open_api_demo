import request from '/@/utils/request';

export function fetchList(query?: Object) {
	return request({
		url: '/newsite/information/page',
		method: 'get',
		params: query,
	});
}

export function addObj(obj?: Object) {
	return request({
		url: '/newsite/information',
		method: 'post',
		data: obj,
	});
}

export function getObj(id?: string) {
	return request({
		url: '/newsite/information/' + id,
		method: 'get',
	});
}

export function delObjs(ids?: Object) {
	return request({
		url: '/newsite/information',
		method: 'delete',
		data: ids,
	});
}

export function putObj(obj?: Object) {
	return request({
		url: '/newsite/information',
		method: 'put',
		data: obj,
	});
}

//查询全部标题
export function selectinfoVoAll(obj?: object) {
	return request({
		url: '/newsite/informationTag/selectinfoVoAll',
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: obj,
	});
}
