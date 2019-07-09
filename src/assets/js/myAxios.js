import axios from 'axios';

export default function (apiArray) {
    function MyAxios() {
        this.vueObj = null;
        this.status = true;
    }

    MyAxios.prototype.view = function (obj) {
        this.vueObj = obj;
    }

    // 生成请求
    MyAxios.prototype.getAxios = function (config) {
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
    MyAxios.prototype.sendAxios = function (config) {
        if (this.status || !config.isBlock) {
            config.isBlock ? this.status = false : '';
            var _axios = this.getAxios(config);
            _axios().then(res => {
                this.status = true;
                config.success === 'default' ? this.handleAxios(config.dataname, res.data) : config.success.call(this.vueObj, res);
            })
        }
    }

    // 处理请求
    MyAxios.prototype.handleAxios = function (dataname, data) {
        this.vueObj[dataname] = data;
    }

    var myAxios = new MyAxios();

    apiArray.forEach(item => {
        myAxios[item.name] = config => {
            myAxios.sendAxios({
                url: item.url,
                type: config && config.type || 'get',
                data: config && config.data || {},
                success: config && config.success || 'default',
                dataname: config && config.dataname || item.name,
                isBlock: config && config.isBlock || true
            })
        }
    });

    return myAxios;
}