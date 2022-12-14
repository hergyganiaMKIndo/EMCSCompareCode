$(function () {
    // #region table flow
    function operateFormatterFlow(options) {
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

    operateFormatterFlow.DEFAULTS = {
        Add: false,
        Edit: false,
        Delete: false,
        Info: false,
        View: false,
        History: false,
        Preview: false,
        Upload: false
    };

    window.operateEventsFlow = {
        'click .edit': function (e, value, row) {
            $(".editRecord").attr("href", `/EMCS/BannerEdit/${row.ID}`).trigger("click");
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
            }, function (isConfirm) {
                if (isConfirm) {
                    sweetAlert.close();
                    return deleteThisFlow(row.Id);
                } else {
                    return false;
                }
            });
        }
    };

    $tableFlow.bootstrapTable({
        url: '/EMCS/GetDataFlow',
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        checkbox: true,
        checkboxEnabled: true,
        reorderableColumns: true,
        toolbar: '.toolbarFlow',
        toolbarAlign: 'left',
        sidePagination: 'server',
        singleSelect: true,
        showColumns: false,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        onClickRow: function (row) {
            var $idStep = 0;
            var $idStatus = 0;
            $idFlow = row.Id;
            $tableFlowStep.bootstrapTable("refresh", { url: `/EMCS/GetDataFlowStep/?IdFlow=${row.Id}` });
            $tableFlowStatus.bootstrapTable("refresh", { url: `/EMCS/GetDataFlowStep/?IdStep=${$idStep}` });
            $tableFlowNext.bootstrapTable("refresh", { url: `/EMCS/GetDataFlowStep/?IdStatus=${$idStatus}` });
        },
        responseHandler: function (resp) {
            var data = {};
            $.map(resp, function (value) {
                data[value.Key] = value.Value;
            });
            return data;
        },
        formatNoMatches: function () {
            return '<span class="noMatches">-</span>';
        },
        columns: [
            {
                field: 'ID',
                title: 'Action',
                width: '100px',
                align: 'center',
                formatter: operateFormatterFlow({ Edit: true, Delete: true, Preview: true }),
                events: operateEventsFlow
            }, {
                field: 'Id',
                title: 'Flow Id',
                align: 'center'
            },
            {
                field: 'Name',
                title: 'Name',
                halign: 'center',
                align: 'left',
                sortable: true
            },
            {
                field: 'Type',
                title: 'Type',
                halign: 'center',
                align: 'left',
                sortable: true
            }]
    });
    // #endregion table flow
});
