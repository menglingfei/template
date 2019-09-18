"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const params_1 = require("./params");
const Loading_1 = require("../../components/Loading/Loading");
class DataStore {
    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchData(api, data, param, net) {
        let newApi = param ? api + param : api;
        return new Promise((resolve, reject) => {
            this.fetchLocalData(newApi).then((wrapData) => {
                if ((wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) && !net) {
                    resolve(wrapData);
                }
                else {
                    this.fetchNetData(api, data).then((_data) => {
                        resolve(this._wrapData(_data));
                    }).catch((error) => {
                        reject(error);
                    });
                }
            }).catch((error) => {
                this.fetchNetData(api, data).then((_data) => {
                    resolve(this._wrapData(_data));
                }).catch((error => {
                    reject(error);
                }));
            });
        });
    }
    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback, param) {
        let newUrl = '';
        if (!data || !url)
            return;
        newUrl = param ? url + param : url;
        react_native_1.AsyncStorage.setItem(newUrl, JSON.stringify(this._wrapData(data)), callback);
    }
    /**
     * 删除数据
     * @param url
     * @param data
     * @param callback
     */
    deleteData(callback) {
        react_native_1.AsyncStorage.clear(callback);
    }
    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            react_native_1.AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    }
                    catch (e) {
                        reject(e);
                        console.error(e);
                    }
                }
                else {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }
    /**
     * 获取网络数据
     * @param url
     * @returns {Promise}
     */
    fetchNetData(api, data) {
        Loading_1.Loading.show();
        return new Promise((resolve, reject) => {
            fetch(`${params_1.URL}${api}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `${params_1.TOKEN}` || ''
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                Loading_1.Loading.hide();
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
                .then((responseData) => {
                // this.saveData(api, responseData, null, param)
                resolve(responseData);
            })
                .catch((error) => {
                Loading_1.Loading.hide();
                reject(error);
            });
        });
    }
    fetchNetDataWithProgress(api, data) {
        return new Promise((resolve, reject) => {
            fetch(`${params_1.URL}${api}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `${params_1.TOKEN}` || ''
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                // Loading.hide();
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
                .then((responseData) => {
                // this.saveData(api, responseData, null, param)
                resolve(responseData);
            })
                .catch((error) => {
                // Loading.hide();
                reject(error);
            });
        });
    }
    _wrapData(data) {
        return { data: data, timestamp: new Date().getTime() };
    }
    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth())
            return false;
        if (currentDate.getDate() !== targetDate.getDate())
            return false;
        if (currentDate.getHours() - targetDate.getHours() > 0.5)
            return false; //有效期0.5个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}
exports.default = DataStore;
