var $table = $('#tableImportGate');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();

$(function () {

    $(".js-states").select2({ width: 'resolve', dropdownAutoWidth: 'false' });

    //Date picker
    $('#datePicker').daterangepicker();
    $('.date').datepicker({
        container: '#boxdate'
    });

    var width = $(".select2-container--default").width() - 5;
    $(".select2-container--default").css('width', width + 'px');


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
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        //fixedColumns: true,
        //fixedNumber: '5',
        formatNoMatches: function () {
            return '<span class="noMatches">-</span>';
        },
        columns: [{
            field: 'action',
            title: 'Action',
            width: '180px',
            align: 'center',
            formatter: operateFormatter({ Edit: Boolean($AllowUpdate), Delete: Boolean($AllowDelete) }),
            events: operateEvents
        },
            //{
            //    field: 'GateID',
            //    title: 'Gate ID',
            //    halign: 'center',
            //    align: 'left',
            //    sortable: true
            //},
            {
                field: 'JCode',
                title: 'J Code',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'StoreName',
                title: 'StoreName',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'C3Code',
                title: '3 Code',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'SeaPortCode',
                title: 'Sea Port',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'AirPortCode',
                title: 'AirPort',
                halign: 'center',
                align: 'left',
                sortable: true
            },
             {
                 field: 'Status',
                 title: 'Status',
                 halign: 'center',
                 align: 'center',
                 sortable: false,
                 formatter: statusFormatter
             }
        ]
    });

    window.pis.table({
        objTable: $table,
        urlSearch: '/master/ImportGateManagementPage',
        urlPaging: '/master/ImportGateManagementPageXt',
        autoLoad: true
    });
    $("#mySearch").insertBefore($("[name=refresh]"))

});


function operateFormatter(options) {
    var btn = [];

    btn.push('<div class="btn-group">');
    if (options.Add == true)
        btn.push('<button type="button" class="btn btn-success new" title="Add"><i class="fa fa-plus"></i></button>');
    if (options.Edit == true)
        btn.push('<button type="button" class="btn btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
    if (options.Delete == true)
        btn.push('<button type="button" class="btn btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
    if (options.Info == true)
        btn.push('<button type="button" class="btn btn-info info" title="Info"><i class="fa fa-info-circle"></i></button>');
    btn.push('</div>');

    return btn.join('');
}

operateFormatter.DEFAULTS = {
    Add: false,
    Edit: false,
    Delete: false,
    Info: false,
    View: false,
    History: false
};
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
        //alert('You click edit icon, row: ' + JSON.stringify(row.AreaID) + ' row.AreaID:' + row.AreaID);
        //console.log(value, row, index);
        loadModal('/master/ImportGateManagementEdit/' + row.GateID);
    },
    'click .remove': function (e, value, row, index) {
        //$(".editRecord").attr('href', '/master/AreaManagementDelete/' + row.AreaID).trigger('click');
        //console.log(value, row, index);
        swal({
            title: "Are you sure want to delete this data?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F56954",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                sweetAlert.close();
                return deleteThis(row.GateID);
            }
        });
    }
};

function deleteThis(id) {
    $.ajax({
        type: "POST",
        url: myApp.root + 'Master/ImportGateManagementDeleteById',
        beforeSend: function () {
            $('.fixed-table-toolbar').hide();
            $('.fixed-table-loading').show();
        },
        complete: function () {
            $('.fixed-table-toolbar').show();
            $('.fixed-table-loading').hide();
        },
        data: { gateId: id },
        dataType: "json",
        success: function (d) {
            if (d.Msg != undefined) {
                sAlert('Success', d.Msg, 'success');
            }

            $("[name=refresh]").trigger('click');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
        }
    });

}

;

$(function () {
    $.ajaxSetup({ cache: false });
    $("a[data-modal]").on("click", function (e) {
        $('#myModalContent').load(this.href, function () {
            $('#myModalPlace').modal({
                keyboard: true
            }, 'show');

            bindForm(this);
        });
        return false;
    });


});

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        $('#progress').show();
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (result) {

                if (result.Status == 0) {
                    if (result.Msg != undefined) sAlert('Success', result.Msg, 'success');
                    $('#myModalPlace').modal('hide');
                    $('#progress').hide();
                    $("[name=refresh]").trigger('click');
                } else {
                    if (result.Msg != undefined) sAlert('Failed', result.Msg, 'error');
                    $('#progress').hide();
                }
            }
        });
        return false;
    });
}

;

function responseHandler(res) {
    var flatArray = [];
    $.each(res, function (i, element) {
        flatArray.push(JSON.flatten(element));
    });
    return flatArray;
}

function numberOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}
function addReformatNumber() {
    var partNumber = $('#HSCode').val();
    // var partNumberReformat = partNumber.slice(0, 3) + "-" + partNumber.slice(3, partNumber.length);
    $('#HSCodeReformat').val(partNumber);
}