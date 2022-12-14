var $table = $('#myTable');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();
var $AllowCreate = $('#AllowCreate').val();

$(function () {
    enableLink(false);

    helpers.buildDropdown('/Picker/GetListGroupLicense', $('#selGroup'), true, null);
    helpers.buildDropdown('/Picker/GetListPortsLicense', $('#selPorts'), true, null);
    helpers.buildDropdown('/Picker/GetListOM', $('#selOM'), true, null);

    $('.cal').click(function () {
        $('#ReleaseDate').datepicker('show');
    });

    $('.cal1').click(function () {
        $('#ExpiredDate').datepicker('show');
    });

    $table.bootstrapTable({
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        toolbar: '.toolbar',
        toolbarAlign: 'left',
        onClickRow: selectRow,
        sidePagination: 'server',
        showColumns: true,
        showRefresh: false,
        smartDisplay: false,
        pageSize: '5',
        formatNoMatches: function () {
            return '<span class="noMatches">-</span>';
        },
        rowStyle: rowStyle,
        columns: [{
            field: 'action',
            title: 'Action',
            align: 'center',
            formatter: operateFormatter({ Add: Boolean($AllowCreate), Edit: Boolean($AllowUpdate), Info: Boolean($AllowDelete) }),
            events: operateEvents,
            class: 'noExl',
            switchable: false
        }, {
            title: 'No',
            halign: 'center',
            align: 'right',
            width: '3%',
            formatter: runningFormatter,
            switchable: false
        }, {
            field: 'Serie',
            title: 'Serie',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'GroupName',
            title: 'Group',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'Description',
            title: 'Description',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'LicenseNumber',
            title: 'License Number',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'OMCode',
            title: 'Order Method',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'ReleaseDate',
            title: 'Issue Date',
            halign: 'center',
            align: 'left',
            sortable: true,
            formatter: 'dateFormatter'
        }, {
            field: 'ExpiredDate',
            title: 'Expired Date',
            halign: 'center',
            align: 'left',
            sortable: true,
            formatter: 'dateFormatter'
        }, {
            field: 'ValidityCalc',
            title: 'Validity',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'Quota',
            title: 'Quota',
            halign: 'center',
            align: 'left',
            sortable: true
        }, {
            field: 'DayRemain',
            title: 'Day Remain',
            halign: 'center',
            align: 'left',
            sortable: true
        },
        {
            //field: 'PortsName',
            field: 'Ports',
            title: 'Ports',
            halign: 'center',
            align: 'left',
            sortable: true,
        },
        {
            field: 'Status',
            title: '<div style="white-space:nowrap;">Status</div>',
            halign: 'center',
            align: 'center',
            sortable: false,
            width: '12px',
            formatter: statusFormatter
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
        }]
    });

    $('#btn-clear').click(function () {
        $('#LicenseNumber').val('');
        $('#Description').val('');
        $('#selGroup').val('val', '').change();
        $('#ReleaseDate').val('');
        $('#ExpiredDate').val('');
        $('#selPorts').val('val', '').change();
        $('#selOM').val('val', '').change();
        $('#Status').val('', 'ALL').change();
    });

    $("#btnFilter").click(function () {
        if ($('#ReleaseDate').val() != '' && $('#ExpiredDate').val() != '') {
            $.validator.addMethod("greaterThan",
                function (value, element, params) {
                    var prm = $('#' + params).val();

                    if (!/Invalid|NaN/.test(new Date(value))) {
                        return new Date(value) >= new Date(prm);
                    }
                    return isNaN(value) && isNaN(prm) || (Number(value) > Number(prm));
                }, 'Expired must be greater than Release.');
            $("#ExpiredDate").rules('add', { greaterThan: "ReleaseDate" });
        }

        if (!$("form#frmSrc").valid()) { $("#ExpiredDate").rules('remove'); return; }

        $('#divResult').hide();
        $('#uploadResult').hide();
        $('#uploadResult').empty();

        window.pis.table({
            objTable: $table,
            urlSearch: '/imex/LicensePage',
            urlPaging: '/imex/LicensePageXt',
            searchParams: {
                LicenseNumber: $('#LicenseNumber').val(),
                Description: $('#Description').val(),
                selSerie: $('#Serie').val(),
                ReleaseDate: $('#ReleaseDate').val(),
                ExpiredDate: $('#ExpiredDate').val(),
                Status: $('#Status').val(),
                selGroup: $('#selGroup').val(),
                selPorts: $('#selPorts').val(),
                selOM: $('#selOM').val()
            },
            autoLoad: true
        });
    });

    $(".downloadExcel").click(function () {
        //$(".table2excel").table2excel({
        //    exclude: ".noExl",
        //    name: "lincese",
        //    filename: "lincese.xls"
        //});
        enableLink(false);
        $.ajax({
            url: "DownloadLicenseToExcel",
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
    $(".downloadExcel2").click(function () { $(".table2excel2").table2excel({ filename: "unMapping.xls" }); });

    $("#mySearch").insertBefore($("[name=refresh]"))
    enableLink(true);
});


//function operateFormatter(value, row, index) {
//	return [
//			'<div class="btn-group" style="width:175px;white-space:nowrap; text-align:center">',
//					'<button type="button" class="btn btn-xs btn-danger extend" title="Extend"><i class="fa fa-check-circle"></i> Extend</button>',
//					'<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-pencil"></i> Edit</button>',
//					'<button type="button" class="btn btn-xs btn-info detail" title="Detail"><i class="fa fa-search-plus"></i> Detail</button>',
//			'</div>'
//	].join('');
//}


function operateFormatter(options) {
    var btn = [];

    btn.push('<div class="btn-group" style="width:175px;white-space:nowrap; text-align:center">');
    if (options.Add == true)
        btn.push('<button type="button" class="btn btn-xs btn-danger extend" title="Extend"><i class="fa fa-check-circle"></i> Extend</button>')
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
    'click .extend': function (e, value, row, index) {
        loadDetailPage('/imex/license-management-extend/' + row.LicenseManagementID);
        //window.location = '/imex/license-management-extend/' + row.LicenseManagementID;
    },
    'click .edit': function (e, value, row, index) {
        enableLink(false);
        loadModal('/imex/LicenseEdit?id=' + row.LicenseManagementID);
    },
    'click .detail': function (e, value, row, index) {
        enableLink(false);
        $('.fixed-table-loading').show();
        loadModal('/imex/LicenseView?id=' + row.LicenseManagementID);
    }
};

function detailFormatter(index, row) {
    enableLink(false);
    var html = [];
    html.push('<div id="_child' + index + '" class="bootstrap-table fixed-table-body"></div>')

    $.ajax({
        type: 'Get',
        url: '/Imex/LicenseDetail',
        data: { LicenseID: row.LicenseManagementID },
        success: function (d) {
            var tbl = [];
            if (d != null && d.Result.length > 0) {
                tbl.push('<table style="width:100%;" class="table table-bordered table-hover table-striped">' +
                    '<thead><tr style="text-align:center;font-weight: bold;">' +
                    ' <td>Regulation </td>' +
                    ' <td>HS Code </td>' +
                    ' <td>Part Number </td>' +
                    //' <td>Apply Date </td>' +
                    //' <td>NewRelease Date </td>' +
                    //' <td>NewExpired Date </td>' +
                    ' <td>Modified By</td>' +
                    ' <td>Modified Date</td>' +
                    '</tr></thead><tbody>');

                $.each(d.Result, function (i, v) {
                    tbl.push('<tr>' +
                        '<td style="text-align:center;">' + IsNull(v.RegulationCode) + '</td>' +
                        '<td style="text-align:center;">' + IsNull(v.HSCode) + '</td>' +
                        '<td style="text-align:center;">' + IsNull(v.PartNumber) + '</td>' +
                        //'<td style="text-align:right;">' + dateFormatter(v.ApplyDate) + '</td>' +
                        //'<td style="text-align:right;">' + dateFormatter(v.NewReleaseDate) + '</td>' +
                        //'<td style="text-align:right;">' + dateFormatter(v.NewExpiredDate) + '</td>' +
                        '<td style="text-align:center;">' + v.ModifiedBy + '</td>' +
                        '<td style="text-align:center;">' + dateFormatter(v.ModifiedDate) + '</td>' +
                        '</tr>');
                });

                //tbl.push('</tbody></table>');
                //tbl.push('<div id="_comment' + index + '"><button type="button" class="btn-xs btn-success" onclick="detailFormatComent(' + index + ',' + row.LicenseManagementID + ')"><i class="fa fa-search"></i>   View Comment</button></div>')
            }
            else {
                //tbl.push('<div>No record found ..!</div>');
                tbl.push('<div id="_comment' + index + '"></div>')
                detailFormatComent(index, row.LicenseManagementID)
            }
            $('#_child' + index + '').html(tbl.join(''));
        },
        complete: function () { enableLink(true); },
        error: function (xhr, error, errorThrown) { }
    });

    return html.join('');
}


function detailFormatComent(row, id) {
    enableLink(false);
    var html = [];

    $.ajax({
        type: 'Get',
        url: '/Imex/LicenseExtendCommentList',
        data: { id: id },
        success: function (d) {
            var tbl = [];
            if (d != null && d.Result.length > 0) {

                tbl.push('<div class="col-lg-6">');
                tbl.push('<ul class="chats">');

                $.each(d.Result, function (i, v) {
                    tbl.push('<li class="' + (i % 2 == 0 ? 'in' : 'out') + '">' +
                        '<img class="avatar img-responsive" alt="">' +
                        '<div class="message">' +
                        '	<span class="arrow"></span>' + v.StringId + '  -  ' + v.EntryBy +
                        '	&nbsp;<span class="datetime"><small><i>' + v.DayDesc + '</i></small></span>' +
                        '	<span class="body">' + v.Comment + '</span>' +
                        '</div>' +
                        '</li>');
                });

                tbl.push('</ul>');
                tbl.push('</div>');
            }
            else {
                tbl.push('<div>No record found ..!</div>');
            }

            $('#_comment' + row + '').html(tbl.join(''));
        },
        complete: function () { enableLink(true); }
    });

    return html.join('');
}

function IsNull(value) {
    return value != null ? value : " - ";
}

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        $('#progress').show();
        enableLink(false);

        if ($("[name='HSCode']").length <= 0 && $("[name='PartNumber']").length <= 0) {
            event.preventDefault();
            sAlert("Warning", "Please select HS Code or Part Number", "warning");
            enableLink(true);
            $('#progress').hide();

            return;
        }

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
                $("#btnFilter").trigger('click');
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

function rowStyle(row, index) {
    var expDate = moment(dateFormatter(row.ExpiredDate), "MM/DD/YYYY");
    var dateNow = moment(moment(new Date).format("MM/DD/YYYY"), "MM/DD/YYYY");

    if (dateDiff('d', dateNow, expDate) <= 60)
        return {
            css: { "background-color": "red" }
        };

    return {
        classes: 'text-nowrap'
    };
}

function dateDiff(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 600000,
        s: 1000
    };

    return Math.floor(diff/divideBy[datepart]);
}
