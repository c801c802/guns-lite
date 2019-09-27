/**
 * 男孩管理初始化
 */
var Boy = {
    id: "BoyTable",
    seItem: null,
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Boy.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'name', visible: true, align: 'center', valign: 'middle'},
        {title: '年龄', field: 'age', visible: true, align: 'center', valign: 'middle'},
        {title: '生日', field: 'birthday', visible: true, align: 'center', valign: 'middle'},
        {title: '是否有女朋友', field: 'hasGirFriend', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 检查是否选中
 */
Boy.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Boy.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加男孩
 */
Boy.openAddBoy = function () {
    var index = layer.open({
        type: 2,
        title: '添加男孩',
        area: ['85%', '85%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/test/boy/add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看男孩详情
 */
Boy.openBoyDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '系统参数详情',
            area: ['85%', '85%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/test/boy/edit/' + Boy.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除男孩
 */
Boy.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/test/boy/delete", function (data) {
            Feng.success("删除成功!");
            Boy.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询男孩列表
 */
Boy.search = function () {
    var queryData = {};
    queryData['name'] = $("#name").val();
    Boy.table.refresh({query: queryData});
};
/**
 * 重置查询条件
 */
Boy.reset = function () {
    $('#name').val('');
    this.search();
};

$(function () {
    var defaultColunms = Boy.initColumn();
    var table = new BSTable(Boy.id, "/test/boy/list", defaultColunms);
    table.setPaginationType("server");
    Boy.table = table.init();
});
