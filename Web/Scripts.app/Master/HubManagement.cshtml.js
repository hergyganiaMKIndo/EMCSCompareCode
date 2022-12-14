var $table = $('#tableHub');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();

$(function() {

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
        formatNoMatches: function() {
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
            //    field: 'HubID',
            //    title: 'Hub ID',
            //    halign: 'center',
            //    align: 'left',
            //    sortable: true
            //},
            {
                field: 'Name',
                title: 'Name',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'Description',
                title: 'Description',
                halign: 'center',
                align: 'left',
                sortable: true
            }]
    });


    window.pis.table({
        objTable: $table,
        urlSearch: '/master/HubManagementPage',
        urlPaging: '/master/HubManagementPageXt',
        autoLoad: true
    });


    $("#mySearch").insertBefore($("[name=refresh]"));
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
    'click .edit': function(e, value, row, index) {
        loadModal('/master/HubManagementEdit/' + row.HubID);
        //alert('You click edit icon, row: ' + JSON.stringify(row.UserID) + ' row.UserID:' + row.UserID);
        //console.log(value, row, index);
    },
    'click .remove': function(e, value, row, index) {
        //$(".editRecord").attr('href', '/master/UserManagementDelete/' + row.UserID).trigger('click');
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
            }, function(isConfirm) {
                if (isConfirm) {
                    sweetAlert.close();
                    return deleteThis(row.HubID);
                }
            });
    }
};

function deleteThis(id) {
    $.ajax({
        type: "POST",
        url: myApp.root + 'Master/HubManagementDeleteById',
        beforeSend: function() {
            $('.fixed-table-toolbar').hide();
            $('.fixed-table-loading').show();
        },
        complete: function() {
            $('.fixed-table-toolbar').show();
            $('.fixed-table-loading').hide();
        },
        data: { HubId: id },
        dataType: "json",
        success: function(d) {
            if (d.Msg != undefined) {
                sAlert('Success', d.Msg, 'success');
            }

            $("[name=refresh]").trigger('click');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
        }
    });

}

;


$(function() {
    $.ajaxSetup({ cache: false });
    $("a[data-modal]").on("click", function(e) {
        enableLink(false);

        $('#myModalContent').load(this.href, function() {

            $('#myModalPlace').modal({ keyboard: true }, 'show');

            bindForm(this);

            enableLink(true);
        });
        return false;
    });


});

function bindForm(dialog) {
    $('form', dialog).submit(function() {
        $('#progress').show();
        enableLink(false);

        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function(result) {

                enableLink(true);

                if (result.Status == 0) {
                    if (result.Msg != undefined) sAlert('Success', result.Msg, 'success');
                    $('#myModalPlace').modal('hide');
                    $('#progress').hide();
                    $("[name=refresh]").trigger('click');
                } else {
                    if (result.Msg != undefined) sAlert('Failed', result.Msg, 'error');
                    $('#progress').hide();
                    //$('#myModalContent').html(result);
                    //bindForm(dialog);
                }
            }
        });
        return false;
    });
}

;