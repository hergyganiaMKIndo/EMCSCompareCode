var $table = $('#tableMapping');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();
$(function () {
    enableLink(false);

    var partNumber = new mySelect2({
        id: 'selPartsList_Ids',
        url: '/Picker/SelectToPartNumber'
    }).load();

    //var partName = new mySelect2({
    //	id: 'selPartsList_Names',
    //	url: '/Picker/SelectToPartName',
    //	minimumInputLength: 2,
    //}).load();

    //var hsCode = new mySelect2({
    //    id: 'selHSCodeList_Ids',
    //    url: '/Picker/Select2HsCode'
    //}).load();

    var hscode_iud = new mySelect2({
        id: 'selHSCodeList_Ids',
        url: '/Picker/Select2HSCode',
        minimumInputLength: 1
    }).load();

    //helpers.buildDropdown('/Picker/GetListHSCodeId', $('#selHSCodeList_Ids'), true, null);
    //helpers.buildDropdown('/Picker/GetListHSCodeNameCode?addCode=false', $('#selHSCodeLists_Names'), true, null);

    $('#selOrderMethods').select2();

    $table.bootstrapTable({
        cache: false,
        pagination: true,
        search: false,
        //url: '/imex/PartsMappingPage',
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        toolbar: '.toolbar',
        toolbarAlign: 'left',
        onClickRow: selectRow,
        sidePagination: 'server',
        showColumns: true,
        showRefresh: false,

        //queryParams: function (p) {
        //    debugger;
        //    return {
        //        pagesize: p.limit,
        //        offset: p.offset,
        //        Status: $('#Status').val(),
        //        selPartsList_Ids: $('#selPartsList_Ids').val(),
        //        PartsName: $('#PartsName').val(),
        //        selHSCodeList_Ids: $('#selHSCodeList_Ids').val(),
        //        HSDescription: $('#HSDescription').val(),
        //        selOrderMethods: $('#selOrderMethods').val()
        //    }
        //},
        smartDisplay: false,
        pageSize: '5',
        formatNoMatches: function () {
            return '<span class="noMatches">-</span>';
        },
        columns: [{
            field: 'action',
            title: 'Action',
            width: '180px',
            align: 'center',
            formatter: operateFormatter({ Edit: Boolean($AllowUpdate), Info: Boolean($AllowDelete) }),
            events: operateEvents,
            class: 'noExl',
            switchable: false
        }, {
            field: 'No',
            title: 'No',
            halign: 'center',
            align: 'right',
            width: '3%',
            formatter: runningFormatter,
            switchable: false
        }, {
            field: 'ManufacturingCode',
            title: 'Manufacturing<br/>Code',
            halign: 'center',
            align: 'left',
            sortable: true,
            switchable: false,
            width: '5%'
        }, {
            field: 'PartsNumber',
            title: 'Part Number',
            halign: 'center',
            align: 'left',
            sortable: true,
            switchable: false
        },
        {
            field: 'PartsName',
            title: 'Parts Description',
            halign: 'center',
            align: 'left',
            sortable: true,
            switchable: false
        }, {
            field: 'Description_Bahasa',
            title: 'Description Bahasa',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'HSCode',
            title: 'HS Code',
            halign: 'center',
            align: 'left',
            sortable: true,
            switchable: false
        }, {
            field: 'HSDescription',
            title: 'HS Description',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'BeaMasuk',
            title: 'Bea<br/>Masuk (Duty)',
            halign: 'center',
            align: 'right',
            sortable: true,
            width: '5%'
        }, {
            field: 'PPNBM',
            title: 'PPNBM',
            halign: 'center',
            align: 'right',
            sortable: true
        }, {
            field: 'Pref_Tarif',
            title: 'Pref Tarif',
            halign: 'center',
            align: 'right',
            sortable: true
        }, {
            field: 'Add_Change',
            title: 'Add Charge',
            halign: 'center',
            align: 'right',
            sortable: true
        }, {
            field: 'OMCode',
            title: 'OM',
            halign: 'center',
            align: 'left',
            sortable: true
        },
        {
            field: 'Status',
            title: '<div style="white-space:nowrap;">Status</div>',
            halign: 'center',
            align: 'center',
            sortable: false,
            width: '3%',
            formatter: statusFormatter,
            switchable: false
        },
        {
            field: 'ModifiedBy',
            title: 'ModifiedBy',
            halign: 'center',
            align: 'left',
            sortable: true,
            visible: false
        }, {
            field: 'ModifiedDate',
            title: 'ModifiedDate',
            halign: 'center',
            align: 'left',
            sortable: true,
            formatter: 'dateFormatter',
            visible: false
        }, {
            field: 'PartsMappingID',
            title: 'Id',
            sortable: true,
            visible: false
        }
            //, {
            //	field: 'machine',
            //	title: 'Machine',
            //	halign: 'center',
            //	align: 'left',
            //	sortable: false
            //}
        ]
    });

    $("form#submitExcel").submit(function () {
        enableLink(false);
        var dt = { "rows": {}, "total": 0 };
        $table.bootstrapTable('load', dt);
        $('#uploadResult').empty();

        var formData = new FormData($(this)[0]);

        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: formData,
            //async: false,
            success: function (result) {
                enableLink(true);

                if (result.Status == 0) {
                    if (result.Msg != undefined) sAlert('Success', result.Msg, 'success');
                    //$("#btnFilter").trigger('click');
                    //window.pis.table({
                    //    objTable: $table,
                    //    urlSearch: '/imex/PartsMappingPage',
                    //    urlPaging: '/imex/PartsMappingPageXt',
                    //    searchParams: {
                    //        Status: $('#Status').val(),
                    //        selPartsList_Ids: $('#selPartsList_Ids').val(),
                    //        PartsName: $('#PartsName').val(),
                    //        selHSCodeList_Ids: $('#selHSCodeList_Ids').val(),
                    //        HSDescription: $('#HSDescription').val(),
                    //        selOrderMethods: $('#selOrderMethods').val(),
                    //        ManufacturingCode: $("#ManufacturingCode").val()
                    //        //limit: p.limit,
                    //        //offset: p.offset,
                    //    },
                    //    autoLoad: true
                    //});
                }
                else {
                    if (result.Msg != undefined) sAlert('Failed', result.Msg, 'error');
                    if (result.Data != undefined) {
                        $('#uploadResult').html(result.Data);
                        $('#uploadResult').show();
                        $('#divResult').show();
                    }
                }

            },
            cache: false,
            contentType: false,
            processData: false
        });

        return false;
    });

    $('#btn-clear').click(function () {
        $('#PartsName').val('');
        $('#HSDescription').val('');
        $('#ManufacturingCode').val('');
        $('#selOrderMethods').val('val', '').change();
        $('#selPartsList_Ids').val('val', '').change();
        $('#selHSCodeList_Ids').val('val', '').change();
        $('#Status').val('1').change();
    });

    $("#btnFilter").click(function () {
        $('#divResult').hide();
        $('#uploadResult').hide();
        $('#uploadResult').empty();

        window.pis.table({
            objTable: $table,
            urlSearch: '/imex/PartsMappingPage',
            urlPaging: '/imex/PartsMappingPageXt',
            searchParams: {
                Status: $('#Status').val(),
                selPartsList_Ids: $('#selPartsList_Ids').val(),
                PartsName: $('#PartsName').val(),
                selHSCodeList_Ids: $('#selHSCodeList_Ids').val(),
                HSDescription: $('#HSDescription').val(),
                selOrderMethods: $('#selOrderMethods').val(),
                ManufacturingCode: $("#ManufacturingCode").val(),
                IsNullHSCode: $('#isNullHS').is(':checked')
                //limit: p.limit,
                //offset: p.offset,
            },
            autoLoad: true
        });

        //createtable();

    });

    $(".downloadExcel").click(function () {
        //$(".table2excel").table2excel({
        //    exclude: ".noExl",
        //    name: "partMapping",
        //    filename: "partMapping.xls"
        //});
        var opt = $table.bootstrapTable("getOptions");
        console.log(opt);
        data = {
            Status: $('#Status').val(),
            selPartsList_Ids: $('#selPartsList_Ids').val(),
            PartsName: $('#PartsName').val(),
            selHSCodeList_Ids: $('#selHSCodeList_Ids').val(),
            HSDescription: $('#HSDescription').val(),
            selOrderMethods: $('#selOrderMethods').val(),
            ManufacturingCode: $("#ManufacturingCode").val(),
            IsNullHSCode: $('#isNullHS').is(':checked'),
            limit: opt.pageSize,
            offset: opt.pageNumber
        };

        data = JSON.stringify(data);
        console.log("Posted data");
        console.log(data);

        enableLink(false);
        $.ajax({
            url: "DownloadPartsMapingToExcel",
            type: 'GET',
            data: {params: data},
            success: function (guid) {
                enableLink(true);
                window.open('DownloadToExcel?guid=' + guid, '_blank');
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });

    $(".downloadExcel2").click(function () { $(".table2excel2").table2excel({ filename: "unMapping.xls" }); });

    $("#mySearch").insertBefore($("[name=refresh]"))
    enableLink(true);
});


//function operateFormatter(value, row, index) {
//	return [
//			'<div class="btn-group" style="width:125px;white-space:nowrap; text-align:center">',
//					'<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-pencil"></i> Edit</button>',
//					'<button type="button" class="btn btn-xs btn-info detail" title="Detail"><i class="fa fa-search-plus"></i> Detail</button>',
//			'</div>'
//	].join('');
//}

function operateFormatter(options) {
    var btn = [];

    btn.push('<div  class="btn-group" style="width:123px;white-space:nowrap; text-align:center">');
    if (options.Add == true)
        btn.push('<button type="button" class="btn btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
    if (options.Edit == true)
        btn.push('<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-pencil"></i> Edit</button>');
    if (options.Delete == true)
        btn.push('<button type="button" class="btn btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
    if (options.Info == true)
        btn.push('<button type="button" class="btn btn-xs btn-info detail" title="Detail"><i class="fa fa-search-plus"></i> Detail</button>')

    btn.push('</div>');

    return btn.join('');
}


window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        
        if ($('#isNullHS').is(':checked')) {
            loadModal('/imex/PartsMappingEditUnmapping?id=' + row.PartsMappingID)
        }
        else {
            loadModal('/imex/PartsMappingEdit?id=' + row.PartsMappingID);
        }
    },
    'click .detail': function (e, value, row, index) {
        enableLink(false);
        $('.fixed-table-loading').show();
        if ($('#isNullHS').is(':checked')) {
            loadModal('/imex/PartsMappingViewUnmapping?id=' + row.PartsMappingID);
        }
        else {
            loadModal('/imex/PartsMappingView?id=' + row.PartsMappingID);
        }
    }
};



$(function () {

    $.ajaxSetup({ cache: false });

    $("#myModalPlace").on('hide.bs.modal', function () {
        //recall select2 ajax after return from modal (bugs)
        var _partNumber = new mySelect2({ id: 'selPartsList_Ids', url: '/Picker/SelectToPartNumber' }).load();
        var _hsCode = new mySelect2({ id: 'selHSCodeList_Ids', url: '/Picker/Select2HsCode', minimumInputLength: 1 }).load();
    });

    $("a[data-modal]").on("click", function (e) {
        enableLink(false);

        $('#myModalContent').load(this.href, function () {

            $('#myModalPlace').modal({ keyboard: true }, 'show');
            bindForm(this);
            enableLink(true);
        });

        return false;
    });


});

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        $('#progress').show();
        enableLink(false);
        debugger
        //if ($('#isNullHS').is(':checked')) {
        //    this.action = this.action.toString().replace('&IsNullHS=' + $('#isNullHS').is(':checked'), '')
        //}
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (result) {

                enableLink(true);

                if (result.Status == 0) {
                    if (result.Msg != undefined) sAlert('Success', result.Msg, 'success');
                    $('#myModalPlace').modal('hide');
                    $('#progress').hide();
                    $("#btnFilter").trigger('click');
                }
                else {
                    if (result.Msg != undefined) sAlert('Failed', result.Msg, 'error');
                    $('#progress').hide();
                    //$('#myModalContent').html(result);
                    //bindForm(dialog);
                }
            }
        });
        return false;
    });
};
