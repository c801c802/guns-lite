/**
 * 初始化系统参数详情对话框
 */
var BoyInfoDlg = {
    boyInfoData : {}
};

/**
 * 清除数据
 */
BoyInfoDlg.clearData = function() {
    this.boyInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
BoyInfoDlg.set = function(key, val) {
    this.boyInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
BoyInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
BoyInfoDlg.close = function() {
    parent.layer.close(window.parent.Boy.layerIndex);
}

/**
 * 收集数据
 */
BoyInfoDlg.collectData = function() {
    this
        .set('id')
        .set('name')
        .set('age')
        .set('birthday')
        .set('hasGirFriend')
    ;
}

/**
 * 提交添加
 */
BoyInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/test/boy/add", function(data){
        Feng.success("添加成功!");
        window.parent.Boy.table.refresh();
        BoyInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.boyInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
BoyInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/test/boy/update", function(data){
        Feng.success("修改成功!");
        window.parent.Boy.table.refresh();
        BoyInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.boyInfoData);
    ajax.start();
}

$(function() {

});
