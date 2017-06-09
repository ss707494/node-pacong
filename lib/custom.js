/**
 * Created by Administrator on 2017/6/9.
 */

window.__nightmare = {};
__nightmare.ipc = require('electron').ipcRenderer;

window.storeData = (name, data) => {
    var _name = '__caData'
    var _data = JSON.parse(window.localStorage.getItem(_name)) || {};
    if(_data[name]) {
        return window.storeData(name + '1', data);
    }
    _data[name] = data;
    window.localStorage.setItem(_name, JSON.stringify(_data));
}

window.getData__ = () => {
    var _name = '__caData'
    return JSON.parse(window.localStorage.getItem(_name))
}

