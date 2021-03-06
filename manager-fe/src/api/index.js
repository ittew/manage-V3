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
            mock: false
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params,
            mock: false
        })
    },
    getRoleList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getDeptList() {
        return request({
            url: '/dept/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    createUser(params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params,
            mock: false
        })
    },
    menuOperate(params) {
        return request({
            url: '/menu/operate',
            method: 'post',
            data: params,
            mock: true
        })
    },
}