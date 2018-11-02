export const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

export const isChrome = !!window.chrome && !!window.chrome.webstore

function commafy(num) {
  num = num + "";
  var re = /(-?\d+)(\d{3})/
  while (re.test(num)) {
    num = num.replace(re, "$1,$2")
  }
  return num;
}

export { commafy };