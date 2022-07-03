const env = import.meta.env.MODE || 'prod'
const envConfig = {
    dev: {
        baseApi: '/api',
        // mockApi:'https://www.fastmock.site/mock/7a3b97196100744a91a696329fc2bbb4/manage'
        mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: '/test.future.com/api',
        mockApi:''
    },
    prod: {
        baseApi: '//future.com/api',
        mockApi:''
    }
}

export default {
   env,
   mock: false,
   ...envConfig[env]
}