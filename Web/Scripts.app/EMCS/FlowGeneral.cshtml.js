"use strict";
var $tableFlow = $("#tableFlow");
var $tableFlowStep = $("#tableFlowStep");
var $tableFlowStatus = $("#tableFlowStatus");
var $tableFlowNext = $("#tableFlowNext");
var $idFlow = 0;
var $idStep = 0;
var $idStatus = 0;

$(function () {
    $(".js-states").select2({ width: "resolve", dropdownAutoWidth: "false" });

    //Date picker
    $("#datePicker").daterangepicker();
    $(".date").datepicker({
        container: "#boxdate"
    });

    const width = $(".select2-container--default").width() - 5;
    $(".select2-container--default").css("width", width + "px");
    $("#btnCreateFlowStep").on("click",
        function(e) {
            e.preventDefault();
            if (!$idFlow) {
                swal("Warning", "Silahkan Pilih salah satu flow terlebih dahulu.", "error");
            } else {
                $("#LinkShowModal").attr("href", `/EMCS/FlowStepCreate?IdFlow=${$idFlow}&IdStep=0`).trigger("click");
            }
        });

    $("#btnCreateFlowStatus").on("click",
        function(e) {
            e.preventDefault();
            if (!$idStep) {
                swal("Warning", "Silahkan Pilih salah satu Step terlebih dahulu.", "error");
            } else {
                $("#LinkShowModal").attr("href", `/EMCS/FlowStatusCreate?IdFlow=${$idFlow}&IdStep=${$idStep}&Id=0`)
                    .trigger("click");
            }
        });

    $("#btnCreateFlowNext").on("click",
        function(e) {
            e.preventDefault();
            if (!$idStatus) {
                swal("Warning", "Silahkan Pilih salah satu Status terlebih dahulu.", "error");
            } else {
                $("#LinkShowModal").attr("href",
                        `/EMCS/FlowNextCreate?IdFlow=${$idFlow}&IdStep=${$idStep}&IdStatus=${$idStatus}&Id=0`)
                    .trigger("click");
            }
        });
});

function deleteThisFlow(id) {
    $.ajax({
        type: "POST",
        url: myApp.root + "EMCS/FlowDelete",
        beforeSend: function() {
            $(".fixed-table-toolbar").hide();
            $(".fixed-table-loading").show();
        },
        complete: function() {
            $(".fixed-table-toolbar").show();
            $(".fixed-table-loading").hide();
        },
        data: { ID: id },
        dataType: "json",
        success: function(d) {
            if (d.Msg !== undefined) {
                sAlert("Success", d.Msg, "success");
            }

            $("[name=refresh]").trigger("click");
        },
        error: function(jqXhr) {
            sAlert("Error", jqXhr.status + " " + jqXhr.statusText, "error");
        }
    });
};
// #endregion

$(function () {
    $.ajaxSetup({ cache: false });
    $("a[data-modal]").on("click",
        function() {
            $("#myModalContent").load(this.href,
                function() {
                    $("#myModalPlace").modal({
                            keyboard: true
                        },
                        "show");
                    $("#myModalPlace .modal-dialog").removeClass("modal-lg");
                    $("#myModalPlace .modal-dialog").addClass("modal-md");
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
                if (result.Status === 0) {
                    if (result.Msg !== undefined) sAlert('Success', result.Msg, 'success');
                    $('#myModalPlace').modal('hide');
                    $('#progress').hide();
                    $("[name=refresh]").trigger('click');
                }
                else {
                    if (result.Msg !== undefined) sAlert('Failed', result.Msg, 'error');
                    $('#progress').hide();
                }
            }
        });
        return false;
    });
};