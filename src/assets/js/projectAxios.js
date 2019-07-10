import axios from 'axios';

// axios.defaults.timeout = 5000;

// let pending = []; //声明一个数组用于存储每一个请求的取消函数和请求标识
// let cancelToken = axios.CancelToken;
// let removPending = ever => {
//     for (let p of pending) {
//         if (pending[p] && pending[p].u === `${ever.url}&${ever.method}`) { // 当前请求在数组中存在时候执行
//             pending[p].f();  // 执行取消操作
//             pending.splice(p, 1) // 把这条记录从数组中移除
//         }
//     }
// }

// //http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         config.data = JSON.stringify(config.data);
//         config.headers = {
//             'Content-Type':'application/x-www-form-urlencoded'
//         }
//         removPending(config); // 在一个ajax发送前执行一下取消操作
//         config.cancelToken = new cancelToken(c => {
//             // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
//             pending.push({
//                 u: config.url + '&' + config.method,
//                 f: c                
//             })
//         });
//         return config;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// //http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         removPending(response.config);
//         return response;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();

export default function (apiList) {
    function ProjectAxios() {
        this.componentThis = null;
        this.reqStatus = true;
    }

    ProjectAxios.prototype.getComponentThis = function (obj) {
        this.componentThis = obj;
    }

    // 生成请求
    ProjectAxios.prototype.getAxios = function (config) {
        var _url = config.url,
            _type = config.type,
            _data = config.data;
        var factory = {
            get: function () {
                return axios.get(_url);
            },
            post: function () {
                return axios.post(_url, _data);
            }
        }
        return factory[_type];
    }

    // 发送请求
    ProjectAxios.prototype.sendAxios = function (config) {
        // if (this.reqStatus || !config.isBlock) {
        // config.isBlock ? this.reqStatus = false : '';
        var _axios = this.getAxios(config);
        _axios().then(res => {
            this.reqStatus = true;
            config.success === 'default' ? this.handleAxios(config.dataname, res.data) : config.success.call(this.componentThis, res.data);
        })
        // }
    }

    // 处理请求
    ProjectAxios.prototype.handleAxios = function (dataname, data) {
        this.componentThis[dataname] = data;
    }

    var axiosInstance = new ProjectAxios();

    apiList.forEach(item => {
        axiosInstance[item.name] = config => {
            axiosInstance.sendAxios({
                url: item.url,
                type: config && config.type || 'get',
                data: config && config.data || {},
                success: config && config.success || 'default',
                dataname: config && config.dataname || item.name,
                // isBlock: (config && config.isBlock === false) ? false : true // 是否阻塞
            })
        }
    });

    return axiosInstance;
}