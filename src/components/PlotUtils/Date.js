export function getDate(seperator) {
    // 获取当前日期
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate =date.getDate();

    // 添加分隔符“-”
    // var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    return nowDate;
}
export function timestampToDate(timestamp) {
    let date = new Date(timestamp * 1000);  // 参数需要毫秒数，所以这里将秒数乘于 1000
    let Y = date.getFullYear() + '-';
    let M = transformNum(date.getMonth() + 1) + '-';
    let D = transformNum(date.getDate()) + ' ';
    let h = transformNum(date.getHours()) + ':';
    let m = transformNum(date.getMinutes()) + ':';
    let s = transformNum(date.getSeconds());
    return Y + M + D + h + m + s
}
function transformNum(num) {
    return num < 10 ? '0' + num : num
}
// console.log(getDate(''))
