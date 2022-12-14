var $table = $('#tableRMHeader');

$(function () {
    $table.bootstrapTable({
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        onClickRow: selectRow,
        sidePagination: 'server',
        showColumns: false,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        showExport: true,
        exportTypes: ['excel'],
        exportOptions: {
            ignoreColumn: [0],
            fileName: 'file.xls'
        },
        formatNoMatches: function () { return '<span class="noMatches">-</span>'; },
        columns: [
            { field: 'Action', title: 'Action', halign: 'center', width: '10%', align: 'center', events: operateEvents, formatter: operateFormatter },
            { field: 'NoPermitCategory', title: 'No', halign: 'center', width: '10%', align: 'center', sortable: true },
            { field: 'CodePermitCategory', title: 'Permit Category', halign: 'center', width: '70%', align: 'left', formatter: permitCategoryFormater, sortable: true },
            { field: 'QTY', title: 'Quantity', halign: 'center', width: '10%', align: 'center', formatter: qtyCategoryFormater, sortable: true, }
        ]
    });

    window.pis.table({
        objTable: $table,
        urlSearch: '/imex/RegulationManagementPage',
        urlPaging: '/imex/RegulationManagementPageXt',
        autoLoad: true
    });

    $(".downloadExcel").click(function () {
        enableLink(false);
        $.ajax({
            url: "DownloadRegulationToExcel",
            type: 'GET',
            success: function (guid) {
                enableLink(true);
                window.open('DownloadToExcel?guid=' + guid, '_blank');
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
});

window.operateEvents = {
    'click .detail': function (e, value, row, index) {
        enableLink(false);
        ShowDetail('/imex/RegulationManagementDetail/' + row.NoPermitCategory);
    }
};

function operateFormatter() {
    var btn = [];

    btn.push('<div  class="btn-group" style="white-space:nowrap; text-align:center">');
    btn.push('<button type="button" class="btn btn-xs btn-info detail" title="Detail"><i class="fa fa-search-plus"></i> Detail</button>')
    btn.push('</div>');

    return btn.join('');
}

function permitCategoryFormater(value, row, index) {
    return value + " " + row.PermitCategoryName;
}

function qtyCategoryFormater(value, row, index) {
    return value + " items";
}

function ShowDetail(url, NoPermitCategory) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        data: { "NoPermitCategory": NoPermitCategory },
        async: true,
        cache: false,
        beforeSend: function () {
            //enableLink(false);
            //$("#panelHeader").html("<div style=\"text-align:center;color:red\"><img src='/Content/images/ajax-loading.gif' style=\"padding-right:3px\">...Loading page...</div>");
        },
        success: function (data) {
            var _br = $('.box-header').length ? "" : "<br/>";
            $("#panelDetail").empty();
            $("#panelHeader").fadeToggle("fast", function () {
                $("#panelDetail").html(_br + data).fadeToggle("fast");
            });
        },
        error: function () {
            $("#panelHeader").show();
            $("#panelDetail").hide();
            enableLink(true)
        }
    });
}

function showHeader() {
    $("#panelDetail").fadeToggle("fast", function () {
        $("#panelDetail").html("");
        $table.bootstrapTable("refresh");
        $("#panelHeader").fadeToggle("fast");
    });          
}

$("form#submitExcel").submit(function () {
    var dt = { "rows": {}, "total": 0 };
    $table.bootstrapTable('load', dt);
    $('#uploadResult').empty();

    var formData = new FormData($(this)[0]);
    enableLink(false);

    $.ajax({
        url: $(this).attr("action"),
        type: 'POST',
        data: formData,
        async: true,
        success: function (result) {
            enableLink(true);

            if (result.Status == 0) {
                if (result.Msg != undefined) sAlert('Success', result.Msg, 'success');
                //$("#btnFilter").trigger('click');
                $("[name=refresh]").trigger('click');
            }
            else {
                if (result.Msg != undefined)
                    sAlert('Failed', result.Msg, 'error');
                if (result.Data != undefined) {
                    
                }
                $("[name=refresh]").trigger('click');
            }

            $("#filexls").val("");
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});