// #region table flow step
function operateFormatterFlowStep(options) {
    const btn = [];
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

operateFormatterFlowStep.DEFAULTS = {
    Add: false,
    Edit: false,
    Delete: false,
    Info: false,
    View: false,
    History: false,
    Preview: false,
    Upload: false
};

window.operateEventsFlowStep = {
    'click .edit': function (e, value, row) {
        $("#LinkShowModal").attr("href", `/EMCS/FlowStepEdit?IdFlow=${$idFlow}&IdStep=${row.Id}`).trigger("click");
    },
    'click .preview': function (e, value, row) {
        $(".previewImages").attr("href", `/EMCS/PreviewImage/${row.ID}`).trigger("click");
    },
    'click .upload': function (e, value, row) {
        $(".uploadRecord").attr("href", `/EMCS/BannerUpload/${row.ID}`).trigger("click");
    },
    'click .remove': function (e, value, row) {
        swal({
            title: "Are you sure want to delete this data?",
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
                    return deleteThisFlowStep(row.Id);
                }
                return false;
            });
    }
};

function deleteThisFlowStep(id) {
    $.ajax({
        type: "POST",
        url: myApp.root + 'EMCS/FlowStepDeleteById',
        beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
        complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
        data: { Id: id },
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

};

$tableFlowStep.bootstrapTable({
    cache: false,
    pagination: true,
    search: false,
    striped: true,
    clickToSelect: true,
    reorderableColumns: true,
    toolbar: '.toolbarFlowStep',
    toolbarAlign: 'left',
    sidePagination: 'server',
    showColumns: false,
    showRefresh: true,
    smartDisplay: false,
    pageSize: '5',
    url: '/EMCS/GetDataFlowStep',
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
        $idStep = row.Id;
        $tableFlowStatus.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStatus/?IdStep=" + row.Id });
        $tableFlowNext.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStep/?IdStatus=0" });
    },
    formatNoMatches: function () {
        return '<span class="noMatches">Please select flow data by click the Flow Table</span>';
    },
    columns: [
        {
            field: "ID",
            title: "Action",
            width: "100px",
            align: "center",
            formatter: operateFormatterFlowStep({ Edit: true, Delete: true, Preview: true }),
            events: operateEventsFlowStep
        }, {
            field: "Id",
            title: "Step Id",
            align: "center"
        },
        {
            field: "FlowName",
            title: "Flow Name",
            halign: "center",
            align: "center",
            sortable: true
        },
        {
            field: "FlowType",
            title: "Flow Type",
            halign: "center",
            align: "center",
            sortable: true,
            formatter: function (data) {
                if (data) {
                    return data;
                }
                return "-";
            }
        },
        {
            field: "StepName",
            title: "Step Name",
            halign: "center",
            align: "left",
            sortable: true
        },
        {
            field: "AssignType",
            title: "Assign Type",
            halign: "center",
            align: "left",
            sortable: true
        },
        {
            field: "AssignTo",
            title: "Assign To",
            halign: "center",
            align: "left",
            sortable: true
        }
    ]
});
    // #endregion table flow step

//var $tableFlow = $('#tableFlow');
//var $tableFlowStep = $('#tableFlowStep');
//var $tableFlowStatus = $('#tableFlowStatus');
//var $tableFlowNext = $('#tableFlowNext');
//var $idFlow = 0;
//var $idStep = 0;
//var $idStatus = 0;

//$(function () {

//    $(".js-states").select2({ width: 'resolve', dropdownAutoWidth: 'false' });

//    //Date picker
//    $('#datePicker').daterangepicker();
//    $('.date').datepicker({
//        container: '#boxdate'
//    });

//    var width = $(".select2-container--default").width() - 5;
//    $(".select2-container--default").css('width', width + 'px');

//    // #region table flow
//    function operateFormatterFlow(options) {
//        var btn = [];
//        btn.push('<div class="">');
//        if (options.Add === true)
//            btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
//        if (options.Edit === true)
//            btn.push('<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
//        if (options.Upload === true)
//            btn.push('<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
//        if (options.Delete === true)
//            btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
//        btn.push('</div>');
//        return btn.join('');
//    }

//    operateFormatterFlow.DEFAULTS = {
//        Add: false,
//        Edit: false,
//        Delete: false,
//        Info: false,
//        View: false,
//        History: false,
//        Preview: false,
//        Upload: false
//    }

//    window.operateEventsFlow = {
//        'click .edit': function (e, value, row, index) {
//            $(".editRecord").attr('href', '/EMCS/BannerEdit/' + row.ID).trigger('click');
//        },
//        'click .preview': function (e, value, row, index) {
//            $(".previewImages").attr('href', '/EMCS/PreviewImage/' + row.ID).trigger('click');
//        },
//        'click .upload': function (e, value, row, index) {
//            $(".uploadRecord").attr('href', '/EMCS/BannerUpload/' + row.ID).trigger('click');
//        },
//        'click .remove': function (e, value, row, index) {
//            swal({
//                title: "Are you sure want to delete this data?",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonColor: "#F56954",
//                confirmButtonText: "Yes",
//                cancelButtonText: "No",
//                closeOnConfirm: false,
//                closeOnCancel: true
//            }, function (isConfirm) {
//                if (isConfirm) {
//                    sweetAlert.close();
//                    return deleteThisFlow(row.Id);
//                }
//            });
//        }
//    };

//    $tableFlow.bootstrapTable({
//        url: '/EMCS/GetDataFlow',
//        cache: false,
//        pagination: true,
//        search: false,
//        striped: true,
//        clickToSelect: true,
//        checkbox: true,
//        checkboxEnabled: true,
//        reorderableColumns: true,
//        toolbar: '.toolbarFlow',
//        toolbarAlign: 'left',
//        sidePagination: 'server',
//        singleSelect: true,
//        showColumns: false,
//        showRefresh: true,
//        smartDisplay: false,
//        pageSize: '5',
//        onClickRow: function (row, event) {
//            console.log(row);
//            $idFlow = row.Id;
//            $idStep = 0;
//            $idStatus = 0;
//            $tableFlowStep.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStep/?IdFlow=" + row.Id });
//            $tableFlowStatus.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStep/?IdStep=" + $idStep });
//            $tableFlowNext.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStep/?IdStatus=" + $idStatus });
//        },
//        responseHandler: function (resp) {
//            var data = {};
//            $.map(resp, function (value, key) {
//                data[value.Key] = value.Value;
//            });
//            return data;
//        },
//        //fixedColumns: true,
//        //fixedNumber: '5',
//        formatNoMatches: function () {
//            return '<span class="noMatches">-</span>';
//        },
//        columns: [
//            {
//                field: 'ID',
//                title: 'Action',
//                width: '100px',
//                align: 'center',
//                formatter: operateFormatterFlow({ Edit: true, Delete: true, Preview: true }),
//                events: operateEventsFlow
//            }, {
//                field: 'Id',
//                title: 'Flow Id',
//                align: 'center'
//            },
//            {
//                field: 'Name',
//                title: 'Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'Type',
//                title: 'Type',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            }]
//    });
//    // #endregion table flow

//    // #region table flow step
//    function operateFormatterFlowStep(options) {
//        var btn = [];
//        btn.push('<div class="btn-group">');
//        if (options.Add === true)
//            btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
//        if (options.Edit === true)
//            btn.push('<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
//        if (options.Upload === true)
//            btn.push('<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
//        if (options.Delete === true)
//            btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
//        btn.push('</div>');
//        return btn.join('');
//    }

//    operateFormatterFlowStep.DEFAULTS = {
//        Add: false,
//        Edit: false,
//        Delete: false,
//        Info: false,
//        View: false,
//        History: false,
//        Preview: false,
//        Upload: false
//    }

//    window.operateEventsFlowStep = {
//        'click .edit': function (e, value, row, index) {
//            $(".editRecord").attr('href', '/EMCS/BannerEdit/' + row.ID).trigger('click');
//        },
//        'click .preview': function (e, value, row, index) {
//            $(".previewImages").attr('href', '/EMCS/PreviewImage/' + row.ID).trigger('click');
//        },
//        'click .upload': function (e, value, row, index) {
//            $(".uploadRecord").attr('href', '/EMCS/BannerUpload/' + row.ID).trigger('click');
//        },
//        'click .remove': function (e, value, row, index) {
//            swal({
//                title: "Are you sure want to delete this data?",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonColor: "#F56954",
//                confirmButtonText: "Yes",
//                cancelButtonText: "No",
//                closeOnConfirm: false,
//                closeOnCancel: true
//            }, function (isConfirm) {
//                if (isConfirm) {
//                    sweetAlert.close();
//                    return deleteThisFlowStep(row.Id);
//                }
//            });
//        }
//    };

//    function deleteThisFlowStep(id) {
//        $.ajax({
//            type: "POST",
//            url: myApp.root + 'EMCS/FlowDelete',
//            beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
//            complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
//            data: { ID: id },
//            dataType: "json",
//            success: function (d) {
//                if (d.Msg !== undefined) {
//                    sAlert('Success', d.Msg, 'success');
//                }

//                $("[name=refresh]").trigger('click');
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
//            }
//        });

//    };

//    $tableFlowStep.bootstrapTable({
//        cache: false,
//        pagination: true,
//        search: false,
//        striped: true,
//        clickToSelect: true,
//        reorderableColumns: true,
//        toolbar: '.toolbarFlowStep',
//        toolbarAlign: 'left',
//        sidePagination: 'server',
//        showColumns: false,
//        showRefresh: true,
//        smartDisplay: false,
//        pageSize: '5',
//        url: '/EMCS/GetDataFlowStep',
//        autoLoad: false,
//        queryParams: function (params) {
//            params.IdStep = $idStep;
//            return params;
//        },
//        responseHandler: function (resp) {
//            var data = {};
//            $.map(resp, function (value, key) {
//                data[value.Key] = value.Value;
//            });
//            return data;
//        },
//        onClickRow: function (row, event) {
//            console.log(row);
//            $idFlow = row.Id;
//            $tableFlowStatus.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStatus/?IdStep=" + row.Id });
//            $tableFlowNext.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowStep/?IdStatus=0" });

//        },
//        formatNoMatches: function () {
//            return '<span class="noMatches">Please select flow data by click the Flow Table</span>';
//        },
//        columns: [
//            {
//                field: 'ID',
//                title: 'Action',
//                width: '100px',
//                align: 'center',
//                formatter: operateFormatterFlowStep({ Edit: true, Delete: true, Preview: true }),
//                events: operateEventsFlowStep
//            }, {
//                field: 'Id',
//                title: 'Step Id',
//                align: 'center'
//            },
//            {
//                field: 'StepName',
//                title: 'Step Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'AssignType',
//                title: 'Assign Type',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'AssignTo',
//                title: 'Assign To',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            }]
//    });
//    // #endregion table flow step

//    // #region table flow status
//    function operateFormatterFlowStatus(options) {
//        var btn = [];
//        btn.push('<div class="btn-group">');
//        if (options.Add === true)
//            btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
//        if (options.Edit === true)
//            btn.push('<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
//        if (options.Upload === true)
//            btn.push('<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
//        if (options.Delete === true)
//            btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
//        btn.push('</div>');
//        return btn.join('');
//    }

//    operateFormatterFlowStatus.DEFAULTS = {
//        Add: false,
//        Edit: false,
//        Delete: false,
//        Info: false,
//        View: false,
//        History: false,
//        Preview: false,
//        Upload: false
//    }

//    window.operateEventsFlowStatus = {
//        'click .edit': function (e, value, row, index) {
//            $(".editRecord").attr('href', '/EMCS/BannerEdit/' + row.ID).trigger('click');
//        },
//        'click .preview': function (e, value, row, index) {
//            $(".previewImages").attr('href', '/EMCS/PreviewImage/' + row.ID).trigger('click');
//        },
//        'click .upload': function (e, value, row, index) {
//            $(".uploadRecord").attr('href', '/EMCS/BannerUpload/' + row.ID).trigger('click');
//        },
//        'click .remove': function (e, value, row, index) {
//            swal({
//                title: "Are you sure want to delete this data?",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonColor: "#F56954",
//                confirmButtonText: "Yes",
//                cancelButtonText: "No",
//                closeOnConfirm: false,
//                closeOnCancel: true
//            }, function (isConfirm) {
//                if (isConfirm) {
//                    sweetAlert.close();
//                    return deleteThisFlowStatus(row.Id);
//                }
//            });
//        }
//    };

//    function deleteThisFlowStatus(id) {
//        $.ajax({
//            type: "POST",
//            url: myApp.root + 'EMCS/FlowDelete',
//            beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
//            complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
//            data: { ID: id },
//            dataType: "json",
//            success: function (d) {
//                if (d.Msg !== undefined) {
//                    sAlert('Success', d.Msg, 'success');
//                }

//                $("[name=refresh]").trigger('click');
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
//            }
//        });

//    };

//    $tableFlowStatus.bootstrapTable({
//        cache: false,
//        pagination: true,
//        search: false,
//        striped: true,
//        clickToSelect: true,
//        reorderableColumns: true,
//        toolbar: '.toolbarFlowStatus',
//        toolbarAlign: 'left',
//        sidePagination: 'server',
//        showColumns: false,
//        showRefresh: true,
//        smartDisplay: false,
//        pageSize: '5',
//        url: '/EMCS/GetDataFlowStatus',
//        autoLoad: false,
//        queryParams: function (params) {
//            params.IdStep = $idStep;
//            return params;
//        },
//        responseHandler: function (resp) {
//            var data = {};
//            $.map(resp, function (value, key) {
//                data[value.Key] = value.Value;
//            });
//            return data;
//        },
//        onClickRow: function (row, event) {
//            console.log(row);
//            $idStatus = row.Id;
//            $tableFlowNext.bootstrapTable("refresh", { url: "/EMCS/GetDataFlowNext/?IdStatus=" + $idStatus });
//        },
//        formatNoMatches: function () {
//            return '<span class="noMatches">Please Select Step data by click the Step Flow Table</span>';
//        },
//        columns: [
//            {
//                field: 'Id',
//                title: 'Action',
//                width: '100px',
//                align: 'center',
//                formatter: operateFormatterFlowStatus({ Edit: true, Delete: true, Preview: true }),
//                events: operateEventsFlowStatus
//            }, {
//                field: 'Id',
//                title: 'Status Id',
//                align: 'center'
//            },
//            {
//                field: 'StepName',
//                title: 'Step Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'Status',
//                title: 'Status Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'ViewByUser',
//                title: 'View By User',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            }]
//    });
//    // #endregion

//    // #region table flow Next
//    function operateFormatterFlowNext(options) {
//        var btn = [];
//        btn.push('<div class="btn-group">');
//        if (options.Add === true)
//            btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
//        if (options.Edit === true)
//            btn.push('<button type="button" class="btn btn-xs btn-info edit" title="Edit"><i class="fa fa-edit"></i></button>');
//        if (options.Upload === true)
//            btn.push('<button type="button" class="btn btn-xs btn-primary upload" title="Upload"><i class="fa fa-upload"></i></button>');
//        if (options.Delete === true)
//            btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
//        btn.push('</div>');
//        return btn.join('');
//    }

//    operateFormatterFlowNext.DEFAULTS = {
//        Add: false,
//        Edit: false,
//        Delete: false,
//        Info: false,
//        View: false,
//        History: false,
//        Preview: false,
//        Upload: false
//    }

//    window.operateEventsFlowNext = {
//        'click .edit': function (e, value, row, index) {
//            $(".editRecord").attr('href', '/EMCS/BannerEdit/' + row.ID).trigger('click');
//        },
//        'click .preview': function (e, value, row, index) {
//            $(".previewImages").attr('href', '/EMCS/PreviewImage/' + row.ID).trigger('click');
//        },
//        'click .upload': function (e, value, row, index) {
//            $(".uploadRecord").attr('href', '/EMCS/BannerUpload/' + row.ID).trigger('click');
//        },
//        'click .remove': function (e, value, row, index) {
//            swal({
//                title: "Are you sure want to delete this data?",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonColor: "#F56954",
//                confirmButtonText: "Yes",
//                cancelButtonText: "No",
//                closeOnConfirm: false,
//                closeOnCancel: true
//            }, function (isConfirm) {
//                if (isConfirm) {
//                    sweetAlert.close();
//                    return deleteThisFlowStatus(row.Id);
//                }
//            });
//        }
//    };

//    function deleteThisFlowNext(id) {
//        $.ajax({
//            type: "POST",
//            url: myApp.root + 'EMCS/FlowDelete',
//            beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
//            complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
//            data: { ID: id },
//            dataType: "json",
//            success: function (d) {
//                if (d.Msg !== undefined) {
//                    sAlert('Success', d.Msg, 'success');
//                }

//                $("[name=refresh]").trigger('click');
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
//            }
//        });

//    };

//    $tableFlowNext.bootstrapTable({
//        cache: false,
//        pagination: true,
//        search: false,
//        striped: true,
//        clickToSelect: true,
//        reorderableColumns: true,
//        toolbar: '.toolbarFlowNext',
//        toolbarAlign: 'left',
//        sidePagination: 'server',
//        showColumns: false,
//        showRefresh: true,
//        smartDisplay: false,
//        pageSize: '5',
//        url: '/EMCS/GetDataFlowNext',
//        autoLoad: false,
//        queryParams: function (params) {
//            params.IdStatus = $idStatus;
//            return params;
//        },
//        responseHandler: function (resp) {
//            var data = {};
//            $.map(resp, function (value, key) {
//                data[value.Key] = value.Value;
//            });
//            return data;
//        },
//        onClickRow: function (row, event) {
//            console.log(row);
//        },
//        formatNoMatches: function () {
//            return '<span class="noMatches">Please Select Status data by click the Step Status Table</span>';
//        },
//        columns: [
//            {
//                field: 'Id',
//                title: 'Action',
//                width: '100px',
//                align: 'center',
//                formatter: operateFormatterFlowStatus({ Edit: true, Delete: true, Preview: true }),
//                events: operateEventsFlowStatus
//            },
//            {
//                field: 'CurrentStep',
//                title: 'Step Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'CurrentStatus',
//                title: 'Status Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            },
//            {
//                field: 'NextStep',
//                title: 'Next Step Name',
//                halign: 'center',
//                align: 'left',
//                sortable: true
//            }]
//    });
//    // #endregion
//});

//// #region Flow Start
//function deleteThisFlow(id) {
//    $.ajax({
//        type: "POST",
//        url: myApp.root + 'EMCS/FlowDelete',
//        beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
//        complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
//        data: { ID: id },
//        dataType: "json",
//        success: function (d) {
//            if (d.Msg !== undefined) {
//                sAlert('Success', d.Msg, 'success');
//            }

//            $("[name=refresh]").trigger('click');
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
//        }
//    });

//};
//// #endregion

//$(function () {
//    $.ajaxSetup({ cache: false });
//    $("a[data-modal]").on("click", function (e) {
//        $('#myModalContent').load(this.href, function () {
//            $('#myModalPlace').modal({
//                keyboard: true
//            }, 'show');
//            $("#myModalPlace .modal-dialog").removeClass("modal-lg");
//            $("#myModalPlace .modal-dialog").addClass("modal-md");
//            bindForm(this);
//        });
//        return false;
//    });
//});

//function bindForm(dialog) {
//    $('form', dialog).submit(function () {
//        $('#progress').show();
//        $.ajax({
//            url: this.action,
//            type: this.method,
//            data: $(this).serialize(),
//            success: function (result) {
//                if (result.Status === 0) {
//                    if (result.Msg !== undefined) sAlert('Success', result.Msg, 'success');
//                    $('#myModalPlace').modal('hide');
//                    $('#progress').hide();
//                    $("[name=refresh]").trigger('click');
//                }
//                else {
//                    if (result.Msg !== undefined) sAlert('Failed', result.Msg, 'error');
//                    $('#progress').hide();
//                }
//            }
//        });
//        return false;
//    });
//};
