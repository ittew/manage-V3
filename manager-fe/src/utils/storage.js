/**
 * storage 二次封装
 */
const NAMESPACED = 'manager'
export default {
    setItem (key, val) {
        let stroage = this.getStorage()
        stroage[key] = val
        window.localStorage.setItem(NAMESPACED, JSON.stringify(stroage))
    },
    getItem (key) {
        return this.getStorage()[key]
    },
    getStorage () {
        return JSON.parse(window.localStorage.getItem(NAMESPACED) || '{}')
    },
    clearItem (key) {
        let stroage = this.getStorage()
        delete stroage[key]
        window.localStorage.setItem(NAMESPACED, JSON.stringify(stroage))
    },
    clearAll () {
        window.localStorage.clear()
    }
}