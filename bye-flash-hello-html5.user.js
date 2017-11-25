// ==UserScript==
// @name        bye-flash-hello-html5 | 再见flash 你好html5
// @namespace   https://greasyfork.org/en/users/131965-levinit
// @author      levinit
// @description 国内主流视频网站的HTML5播放
// @include     *://*.le.com/*
// @include     *://*.iqiyi.com/*html*
// @include     *://v.qq.com/*
// @include     *://y.qq.com/*
// @include     *://tv.cctv.com/*
// @include     *://*.cntv.cn/video/*
// @include     *://*.icourse163.org/*
// @include     *://open.163.com/movie*
// @include     *://m.open.163.com/movie*
// @include     *://study.163.com/course/courseLearn*
// @include     *://mooc.study.163.com/learn/*
// @include     *://*.sohu.com/*html*
// @include     *://live.bilibili.com/*
// @run-at      document-start
// @version     1.7.5
// @grant       none
// ==/UserScript==
//'use strict';
var ua = null; //user-agent
var isMobile = false; //是否使用移动ua
//获取元素对象的函数
function ele(element) {
  return document.querySelector(element);
}
//更改ua的函数
function changeUA(ua) {
  Object.defineProperty(navigator, "userAgent", {
    value: ua,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
//判断移动ua相关信息
(function() {
  //这些网站使用移动ua
  var names = ["cctv", ".163", "iqiyi", "cntv", "sohu"];

  if (
    location.host.indexOf("iqiyi") >= 0 &&
    navigator.userAgent.indexOf("Firefox") === -1
  ) {
    console.log("路过"); //爱奇艺的html5不支持firefox（非firefox酱油路过）
  } else {
    for (var i = 0; i < names.length; i++) {
      if (location.host.indexOf(names[i]) >= 0) {
        isMobile = true;
      }
    }
  }
})();

if (isMobile) {
  //ipad2
  //ua ="Mozilla/5.0 (iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5";
 
  //Android7 ua
  ua ="Mozilla/5.0 (Linux; Android 7.0; PLUS Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.98 Mobile Safari/537.36";
  changeUA(ua);
} else {
  //使用chrome、mac、safari等ua
  if (
    (location.host === "v.qq.com" ||
      location.host === "y.qq.com" ||
      location.host === "live.bilibil.com") &&
    navigator.userAgent.indexOf("Edge") === -1
  ) {
    console.log("路过"); //Edge的腾讯视频、QQ音乐MV和b站直播不支持html5（不是Edge就打酱油路过吧）
  } else if (location.href.indexOf("iqiyi") >= 0) {
    console.log("路过"); //非Firefox的酱油路过（若是firefox，则已经在前面进入了isMobile===true分支啦）
  } else if (location.host.indexOf("le.com") >= 0) {
    //尊贵的le.com对mac+safari情有独钟……单独提出来吧
    ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8";
    changeUA(ua);
  } else {
    //其余诸位通通进入披上这顶伪装衣
    ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/603.3.8";
    changeUA(ua);
  }
}

//网易公开课设置视频播放区域的高度
if (location.href.search("open.163") >= 0) {
  setTimeout(function() {
    var v = ele(".video-wrapper video");
    ele("body").style.backgroundColor = "#e4f0eb";
    if (v) {
      v.setAttribute("style", "height:100%");
    }
  }, 2333);
}

window.onload = function() {
  //显示播放控制条 stuyd.163 iqiyi
  if (
    isMobile === true &&
    (location.href.search("study.163") >= 0 ||
      location.href.search("iqiyi.com") >= 0)
  ) {
    var videoElement = ele("video");
    if (videoElement) {
      videoElement.setAttribute("controls", "controls");
      if (location.href.search("iqiyi.com") >= 0) {
        iqiyi();
      }
    }
  }
  //爱奇艺的相关调整
  function iqiyi() {
    var defaultProcess = ele(".process-response"); //爱奇艺默认的进度条
    var control2 = ele(".bottom"); //播放下一个视频和调整画质的控制条
    if (control2) {
      control2.style.bottom = "25px"; //播放下一个视频和调整画质的控制条往上放
      if (defaultProcess) {
        defaultProcess.style.display = "none"; //让默认进度条消失
      }
    }
  }
};
