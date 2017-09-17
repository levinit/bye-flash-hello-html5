// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 某些网站啊，明明有html5视频播放，就是不提供给你用呢，mac就可以是几个意思？对，说的就是你！flash?手动再见!支持优酷-乐视-爱奇艺等
// @include     *://*.le.com/*
<<<<<<< HEAD:bye-flash-hello-html5.js
// @include     *://*iqiyi.com/*html*
// @include     *://*youku.com/*
// @include     *://*cctv.com/*
// @include     *://*mgtv.com/*
// @include     *://v.qq.com/*
// @include     *://*icourse163.org/*
// @include     *://*open.163.com/movie*
// @include     *://study.163.com/course/courseLearn*
// @include     *://mooc.study.163.com/learn/*
// @run-at      document-start
// @version     1.6.4
=======
// @include     *://*.iqiyi.com/*html*
// @include     *://*.youku.com/*
// @include     *://*.cctv.com/*
// @include     *://*.mgtv.com/*
// @include     *://v.qq.com/*
// @include     *://*.icourse163.org/*
// @include     *://open.163.com/movie*
// @include     *://study.163.com/course/courseLearn*
// @include     *://mooc.study.163.com/learn/*
// @include     *://live.bilibili.com/*
// @run-at      document-start
// @version     1.6.4.1
>>>>>>> 3f41e66f40c0ab4c5c525a3d297e43de0b4ee9f7:bye-flash-hello-html5.user.js
// @grant       none
// ==/UserScript==
//'use strict';
var ua = null; //user-agent取值
var isPhone = false; //是否使用移动ua
var ele = function (element) {
    return document.querySelector(element);
};
var changeUA = function (ua) { //更改ua的方法
    Object.defineProperty(navigator, 'userAgent', {
        value: ua,
        writable: false,
        configurable: false,
        enumerable: true
    });
};
(function () { //判断移动ua相关信息
    //不会使用移动ua的页面url的正则
    var urlReg = /www.mgtv.com\/\w+\/$|www.mgtv.com\/$/; //www.mgtv.com(首页)和www.mgtv.com/xx/(分类页 xx是分类)
    if (location.href.match(urlReg) !== null) {
        return null; //能够匹配urlReg的页面，禁止使用移动ua
    } else {
        //不满足if中的条件，并且url中包含这些关键字的页面会被使用移动ua
        var phone = [
            'cctv',
            '.163',
            'mgtv'
        ]; //这些网站用移动ua
        for (var i = 0; i < phone.length; i++) {
            if (location.host.indexOf(phone[i]) >= 0) {
                isPhone = true;
            }
        }
    }
})();
<<<<<<< HEAD:bye-flash-hello-html5.js
if (location.host.indexOf('youku') >= 0) { //优酷youku
    (function () {
        window.sessionStorage.setItem('P_l_h5', true);
    })();
=======
if (location.host.indexOf('youku') >= 0) { //优酷youku 
    (function () {
        window.sessionStorage.setItem('P_l_h5', true); 
    })(); 
>>>>>>> 3f41e66f40c0ab4c5c525a3d297e43de0b4ee9f7:bye-flash-hello-html5.user.js
} else if (isPhone) { //isPhone为true时 使用移动ua 默认用android
    ua = 'Mozilla/5.0 (Linux; U; Android 4.0.4; GT-I9300 Build/IMM76D) AppleWebKit/601.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/601.1.46';
    changeUA(ua);
} else { //使用chrome、mac、safari等ua
    if (location.host.indexOf('le.com') >= 0) { //le.com乐视网对mac+safari情有独钟
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8';
    } else { //使用mac ua
        ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/603.3.8';
    }
    changeUA(ua);
}
if (location.href.search('open.163') >= 0) {//网易公开课
    setTimeout(function () {
        var v = ele('.video-wrapper video');
        ele('body').style.backgroundColor = '#e4f0eb';
        if (!!v === true) {//设置视频播放区域的高度
            v.setAttribute('style', 'height:100%');
        }
    }, 2333);
}

window.onload = function () {
<<<<<<< HEAD:bye-flash-hello-html5.js
    if (location.href.search('study.163') >= 0 || location.href.search('iqiyi.com') >= 0) {
=======
    if (location.href.search('study.163') >= 0) {
>>>>>>> 3f41e66f40c0ab4c5c525a3d297e43de0b4ee9f7:bye-flash-hello-html5.user.js
        var videoElement = ele('video'); //视频元素
        if (!!videoElement === true) {
            videoElement.setAttribute('controls', 'controls'); //显示播放控制条
        }
    }
};
