var $tableCargo = $('#tableCargo');
var $tableCargoForm = $('#tableCargoForm');
var $tableAddCargo = $('#tableAddCargo');

var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();
var RoleName = '';
$(function () {
    var columns = [
        {
            field: "",
            title: "No",
            align: "center",
            formatter: runningFormatter
        },
        {
            field: "Id",
            title: "Action",
            align: "center",
            sortable: true,
            class: "text-nowrap",
            width: "150",
            formatter: function (data, row, index) {
                return operateFormatter({ Edit: Boolean($AllowUpdate), Delete: Boolean($AllowDelete), Data: row });
            },
            events: operateEvents
        }, {
            field: "ClNo",
            title: "CL No.",
            class: "text-nowrap",
            halign: "center",
            sortable: true
        }, {
            field: "SiNo",
            title: "SI No.",
            class: "text-nowrap",
            align: "center",
            halign: "center",
            sortable: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                }
                return "-";
            }
        }, {
            field: "UpdateDate",
            title: "Date",
            class: "text-nowrap",
            halign: "center",
            sortable: true,
            formatter: function (data, row, index) {
                if (data) {
                    if (data) {
                        return moment(data).format("DD MMM YYYY");
                    } else {
                        return "-";
                    }
                } else {
                    return "-";
                }
            }
        }, {
            field: "Referrence",
            title: "Referrence No.",
            halign: "center",
            class: "text-nowrap",
            visible: false,
            sortable: true
        }, {
            field: "PreparedBy",
            title: "Prepared By.",
            halign: "center",
            class: "text-nowrap",
            sortable: true
        }, {
            field: "Consignee",
            title: "Consignee Name",
            halign: "center",
            class: "text-nowrap",
            sortable: true
        }, {
            field: "StuffingDateStarted",
            title: "Stuffing Date (Start)",
            align: "center",
            class: "text-nowrap",
            halign: "center",
            sortable: true,
            formatter: function (data, row, index) {
                if (data) {
                    return moment(data).format("DD MMM YYYY");
                } else {
                    return "-";
                }
            }
        }, {
            field: "StuffingDateFinished",
            title: "Stuffing Date (Finished)",
            halign: "center",
            class: "text-nowrap",
            align: "center",
            sortable: true,
            formatter: function (data, row, index) {
                if (data) {
                    return moment(data).format("DD MMM YYYY");
                } else {
                    return "-";
                }
            }
        }, {
            field: "VesselFlight",
            title: "Vessel / Flight",
            class: "text-nowrap",
            align: "center",
            halign: "center",
            sortable: true
        }, {
            field: "ETD",
            halign: "center",
            title: "ETD",
            class: "text-nowrap",
            align: "center",
            visible: false,
            formatter: function (data, row, index) {
                if (data) {
                    return moment(data).format("DD MMM YYYY");
                } else {
                    return "-";
                }
            },
            sortable: true
        }, {
            field: "Eta",
            title: "ETA",
            class: "text-nowrap",
            halign: "center",
            visible: false,
            formatter: function (data, row, index) {
                if (data) {
                    return moment(data).format("DD MMM YYYY");
                } else {
                    return "-";
                }
            },
            sortable: true
        }, {
            field: "StatusViewByUser",
            title: "STATUS",
            halign: "center",
            sortable: true,
            filterControl: true,
            class: "text-nowrap"
        }
    ]

    $tableCargo.bootstrapTable({
        url: '/EMCS/GetCargoList',
        columns: columns,
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
        sortOrder: "DESC",
        showColumns: true,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '10',
        queryParams: function (params) {
            params.term = $("#mySearch input[name=searchText]").val();
            return params;
        },
        responseHandler: function (resp) {
            
            RoleName = resp.Role;
            var data = {};
            $.map(resp.data, function (value, key) {
                data[value.Key] = value.Value;
            });
            return data;
        },
        formatNoMatches: function () {
            return '<span class="noMatches">Cargo data is empty</span>';
        },

    });

    $("#mySearch").insertBefore($("[name=refresh]"));


    var tableCargoForm = [
        [{
            field: 'state',
            checkbox: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle'
        }, {
            field: "id",
            title: "NO",
            rowspan: 2,
            align: 'center'
        }, {
            field: "container",
            title: "CONTAINER",
            rowspan: 2,
            sortable: true
        }, {
            field: "inco",
            title: "INCO TERMS",
            rowspan: 2,
            sortable: true
        }, {
            field: "case",
            title: "CASE NUMBER",
            rowspan: 2,
            sortable: true
        }, {
            field: "reference",
            title: "REFERENCE",
            colspan: 2,
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }, {
            field: "cargodesc",
            title: "CARGO DESCRIPTION",
            rowspan: 2,
            sortable: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }, {
            field: "volume",
            title: "VOLUME",
            colspan: 3,
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }, {
            field: "netweight",
            title: "NET WEIGHT (KGS)",
            rowspan: 2,
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }, {
            field: "grossweight",
            title: "GROSS WEIGHT (KGS)",
            rowspan: 2,
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }, {
            field: "attachment",
            title: "ATTACHMENT",
            rowspan: 2,
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-"

                }
            }
        }],
        [{
            field: "ea",
            title: "EA #",
            sortable: true,
            filterControl: true,
            formatter: function (data, row, index) {
                if (data) {
                    return data;
                } else {
                    return "-";

                }
            }
        }, {
            field: "inboundda",
            title: "IN BOUND DA #",
            sortable: true,
            filterControl: true
        }, {
            field: "length",
            title: "Length",
            sortable: true,
            filterControl: true
        }, {
            field: "width",
            title: "Width",
            sortable: true,
            filterControl: true
        }, {
            field: "height",
            title: "Height",
            sortable: true,
            filterControl: true
        }
        ]
    ]

    $tableCargoForm.bootstrapTable({
        url: "",
        columns: tableCargoForm,
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
        formatNoMatches: function () {
            return '<span class="noMatches">No task available</span>';
        },

    });

    var tableAddCargo = [
        [{
            field: "",
            title: "CIPL No.",
            rowspan: 2,
            sortable: true
        }, {
            field: "cn",
            title: "CN #",
            rowspan: 2,
            sortable: true
        }, {
            field: "ea",
            title: "EA #",
            rowspan: 2,
            sortable: true
        }, {
            field: "inco",
            title: "INCO TERMS",
            rowspan: 2,
            sortable: true
        }, {
            field: "reference",
            title: "REFERENCE",
            colspan: 3,
            sortable: true,
            align: "center",
            filterControl: true
        }, {
            field: "netweight",
            title: "NET WEIGHT (KGS)",
            rowspan: 2,
            sortable: true,
            filterControl: true
        }, {
            field: "grossweight",
            title: "GROSS WEIGHT (KGS)",
            rowspan: 2,
            sortable: true,
            filterControl: true
        }],
        [{
            field: "length",
            title: "Length",
            sortable: true,
            filterControl: true
        }, {
            field: "width",
            title: "Width",
            sortable: true,
            filterControl: true
        }, {
            field: "height",
            title: "Height",
            sortable: true,
            filterControl: true
        }
        ]
    ]

    $tableAddCargo.bootstrapTable({
        url: "",
        columns: tableAddCargo,
        cache: false,
        pagination: true,
        search: false,
        striped: true,
        clickToSelect: true,
        reorderableColumns: true,
        onClickRow: selectRow,
        sidePagination: 'server',
        showColumns: true,
        showRefresh: true,
        smartDisplay: false,
        pageSize: '5',
        formatNoMatches: function () {
            return '<span class="noMatches">-</span>';
        },

    });

});


function operateFormatter(options) {
    
    var btn = [];
    console.log(options);
    btn.push('<div class="btn-toolbar" style="width: 100px;">');
    if (options.Add === true)
        btn.push('<button type="button" class="btn btn-xs btn-success new" title="Add"><i class="fa fa-plus"></i></button>');
    if (options.Edit === true && (options.Data.Status === 'Draft' || options.Data.Status === "Revise")) {
        btn.push('<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-edit"></i></button>');
    }
    else if (options.Data.StatusViewByUser !== null && options.Data.StatusViewByUser !== '') {
        if ((options.Data.StatusViewByUser.replace(/\s/g, '') === "Waitingforshippinginstruction" || options.Data.StatusViewByUser.replace(/\s/g, '') === "WaitingforNPE&PEB" ||
            options.Data.StatusViewByUser.replace(/\s/g, '') === "WaitingNPE&PEBapproval" || options.Data.StatusViewByUser.replace(/\s/g, '') === "WaitingapprovalNPE"
            || options.Data.StatusViewByUser.replace(/\s/g, '') === "Finish" || options.Data.StatusViewByUser.replace(/\s/g, '') === 'WaitingforBLorAWB') && RoleName != 'EMCSPpjk'  && options.Data.PendingRFC === 0) {
            btn.push('<button type="button" value="rfc" class="btn btn-xs btn-primary edit"  title="Edit"><i class="fa fa-edit"></i></button>');
        }
    }
    if (options.Delete === true && options.Data.Status === 'Draft')
        btn.push('<button type="button" class="btn btn-xs btn-danger remove" title="Delete"><i class="fa fa-trash-o"></i></button>');
    if (options.Edit === true && (options.Data.Status !== 'Draft' || options.Data.status !== "Revise"))
        btn.push('<button type="button" class="btn btn-xs btn-default info" title="Info"><i class="fa fa-search"></i></button>');
    if (options.Data.Step === 'Create BL or AWB')
        btn.push('<button type="button" class="btn btn-xs btn-warning cancel" title="Cancel PEB"><i class="fa fa-undo"></i></button>');
    if (options.Data.StatusViewByUser === 'Waiting for NPE & PEB')
        btn.push('<button type="button" class="btn btn-xs btn-primary edit-si" title="Edit Shipping Instruction"><i class="fa fa-edit"></i></button>');
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
}


window.operateEvents = {

    'click .edit': function (e, value, row, index) {
        if (row.StatusViewByUser.replace(/\s/g, '') === "Waitingforshippinginstruction" || row.StatusViewByUser.replace(/\s/g, '') === "WaitingforNPE&PEB" ||
            row.StatusViewByUser.replace(/\s/g, '') === "WaitingNPE&PEBapproval" || row.StatusViewByUser.replace(/\s/g, '') === "WaitingapprovalNPE"
            || row.StatusViewByUser.replace(/\s/g, '') === "Finish" || row.StatusViewByUser.replace(/\s/g, '') == "WaitingforBLorAWB")
            window.location.href = "/emcs/UpdateCargo?CargoID=" + row.Id + "&rfc=true";
        else
            window.location.href = "/emcs/UpdateCargo?CargoID=" + row.Id;
    },
    'click .edit-si': function (e, value, row, index) {
        window.location.href = "/emcs/EditSi?Id=" + row.Id;
        //myApp.fullPath + "EMCS/SubmitSi?Id=" + row.Id;
    },
    'click .info': function (e, value, row, index) {
        window.location.href = "/emcs/CargoView?CargoID=" + row.Id;
    },
    'click .remove': function (e, value, row, index) {
        swal({
            title: "Are you sure want to delete this data?",
            type: "warning",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: 'POST',
                    url: "/emcs/RemoveCargo?cargoid=" + row.Id,
                    datatype: 'json'
                })
                    .done(function (data, textStatus, jqXHR) {
                        swal("Deleted!", "Your data has been deleted.", "success");
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        var result = $.parseJSON(jqXHR.responseText);
                        sweetAlert("Failed", result.ExceptionMessage + "&#13;&#10;", "error");
                    })
                    .always(function (data, textStatus, jqXHR) {
                        window.location.href = '/EMCS/CargoList';
                    });
            }
        });
    },
    'click .cancel': function (e, value, row, index) {
        window.location.href = "/emcs/PebNpeCancellation/" + row.Id;
    },
};

function deleteThis(id) {
    $.ajax({
        type: "POST",
        url: myApp.root + 'EMCS/RemoveCargo',
        beforeSend: function () { $('.fixed-table-toolbar').hide(); $('.fixed-table-loading').show(); },
        complete: function () { $('.fixed-table-toolbar').show(); $('.fixed-table-loading').hide(); },
        data: { cargoid: id },
        dataType: "json",
        success: function (d) {
            if (d.Msg !== undefined) {
                sAlert('Success', d.Msg, 'success');
            }

            $("[name=refresh]").trigger('click');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            sAlert('Error', jqXHR.status + " " + jqXHR.statusText, "error");
        }
    });

};

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
                }
                else {
                    if (result.Msg != undefined) sAlert('Failed', result.Msg, 'error');
                    $('#progress').hide();
                }
            }
        });
        return false;
    });
};


function addEmail(tableId) {
    console.log(tableId);
    var i = parseInt($('#' + tableId + ' tr:last').data('row')) + 1;
    console.log(i);

    var strTr = "<tr data-row=" + i + ">";
    strTr += "<td><input type=\"email\" name=\"email\" id=\"email_" + i + "\" " +
        "required=\"required\" class=\"form-control required\" " +
        "style=\"width: 250px;\"></td>";
    strTr += "<td><button type=\"button\" value=\"Delete\" class=\"btn-danger btn-md\" onClick='removeTr(this)' style=\"margin-left: 10px;\">Delete</button></td>";
    strTr += "</tr>";
    $('#' + tableId + ' tr:last').after(strTr);
}


function removeTr(obj) {
    event.preventDefault();
    $(obj).parent().parent().remove();

}


// =====================================================================================



