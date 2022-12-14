$(function () {
    // #region table flow status
    function operateFormatterFlowStatus(options) {
        var btn = [];
        btn.push('<div class="">');
        if (options.Add === true)
            btn.push(
                '<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>');
        if (options.Edit === true)
            btn.push(
                '<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
        if (options.Upload === true)
            btn.push(
                '<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
        if (options.Delete === true)
            btn.push(
                '<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
        btn.push("</div>");
        return btn.join(" ");
    }

    operateFormatterFlowStatus.DEFAULTS = {
        Add: false,
        Edit: false,
        Delete: false,
        Info: false,
        View: false,
        History: false,
        Preview: false,
        Upload: false
    };

    window.operateEventsFlowStatus = {
        'click .edit': function (e, value, row) {
            $("#LinkShowModal").attr("href", `/EMCS/FlowStatusEdit?Id=${row.Id}`).trigger("click");
        },
        'click .remove': function (e, value, row) {
            swal({
                title: "Warning",
                text: "Are you sure want to delete this data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F56954",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            },
                function (isConfirm) {
                    if (isConfirm) {
                        sweetAlert.close();
                        return deleteThisFlowStatus(row.Id);
                    }
                    return false;
                });
        }
    };

    function deleteThisFlowStatus(id) {
        $.ajax({
            type: "POST",
            url: myApp.root + 'EMCS/FlowStatusDeleteById',
            beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
            complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
            data: { IdStatus: id },
            dataType: "json",
            success: function (d) {
                if (d.Msg !== undefined) {
                    sAlert('Success', d.Msg, 'success');
                }

                $("[name=refresh]").trigger('click');
            },
            error: function (jqXhr) {
                sAlert("Error", jqXhr.status + " " + jqXhr.statusText, "error");
            }
        });

    };

    $tableFlowStatus.bootstrapTable({
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        toolbar: '.toolbarFlowStatus',
        toolbarAlign: 'left',
        sidePagination: 'server',
        showColumns: false,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        url: '/EMCS/GetDataFlowStatus',
        autoLoad: false,
        queryParams: function (params) {
            params.IdStep = $idStep;
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
            $idStatus = row.Id;
            $tableFlowNext.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowNext/?IdStatus=" + $idStatus });
        },
        formatNoMatches: function () {
            return '<span class="noMatches">Please Select Step data by click the Step Flow Table</span>';
        },
        columns: [
            {
                field: 'Id',
                title: 'Action',
                width: '100px',
                align: 'center',
                formatter: operateFormatterFlowStatus({ Edit: true, Delete: true, Preview: true }),
                events: operateEventsFlowStatus
            }, {
                field: 'Id',
                title: 'Status Id',
                align: 'center'
            },
            {
                field: 'StepName',
                title: 'Step Name',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'Status',
                title: 'Status Name',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'ViewByUser',
                title: 'View By User',
                halign: 'center',
                align: 'left',
                sortable: true
            }]
    });
    // #endregion
});