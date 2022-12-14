$(function () {
    function deleteThisFlowNext(id) {
        $.ajax({
            type: "POST",
            url: myApp.root + 'EMCS/FlowNextDelete',
            beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
            complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
            data: { ID: id },
            dataType: "json",
            success: function (d) {
                if (d.Msg !== undefined) {
                    sAlert('Success', d.Msg, 'success');
                }

                $("[name=refresh]").trigger('click');
            },
            error: function (jqXhr) {
                sAlert('Error', jqXhr.status + " " + jqXhr.statusText, "error");
            }
        });

    }

    function operateFormatterFlowNextStep(options) {
        var btn = [];
        btn.push('<div class="">');
        if (options.Add === true)
            btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>');
        if (options.Edit === true)
            btn.push('<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
        if (options.Upload === true)
            btn.push('<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
        if (options.Delete === true)
            btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
        btn.push('</div>');
        return btn.join(' ');
    }

    operateFormatterFlowNextStep.DEFAULTS = {
        Add: false,
        Edit: false,
        Delete: false,
        Info: false,
        View: false,
        History: false,
        Preview: false,
        Upload: false
    };

    window.operateEventsFlowNextStep = {
        'click .edit': function (e, value, row) {
            $("#LinkShowModal").attr("href", "/EMCS/FlowNextEdit?Id=" + row.Id).trigger("click");
        },
        'click .remove': function (e, value, row) {
            swal({
                text: "Warning",
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
                    return deleteThisFlowNext(row.Id);
                }
                return false;
            });
        }
    };

    $tableFlowNext.bootstrapTable({
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        toolbar: '.toolbarFlowNext',
        toolbarAlign: 'left',
        sidePagination: 'server',
        showColumns: false,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        url: '/EMCS/GetDataFlowNext',
        autoLoad: false,
        queryParams: function (params) {
            params.IdStatus = $idStatus;
            return params;
        },
        responseHandler: function (resp) {
            var data = {};
            $.map(resp, function (value) {
                data[value.Key] = value.Value;
            });
            return data;
        },
        onClickRow: function (row) {
            console.log(row);
        },
        formatNoMatches: function() {
            return '<span class="noMatches">Please Select Status data by click the Step Status Table</span>';
        },
        columns: [
            {
                field: "Id",
                title: "Action",
                width: "100px",
                align: "center",
                formatter: operateFormatterFlowNextStep({ Edit: true, Delete: true, Preview: true }),
                events: operateEventsFlowNextStep
            },
            {
                field: "CurrentStep",
                title: "Step Name",
                halign: "center",
                align: "left",
                sortable: true
            },
            {
                field: "CurrentStatus",
                title: "Status Name",
                halign: "center",
                align: "left",
                sortable: true
            },
            {
                field: "NextStep",
                title: "Next Step Name",
                halign: "center",
                align: "left",
                sortable: true
            }
        ]
    });
});
