/** 
 * api管理
*/
import request from '../utils/request'

export default {
    login(params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params
        })
    },
    getNoticeCount(params) {
        return request({
            url: '/leave/count',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getMenuList(params) {
        return request({
            url: '/menu/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
}