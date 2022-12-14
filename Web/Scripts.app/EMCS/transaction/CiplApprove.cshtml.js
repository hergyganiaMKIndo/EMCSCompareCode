var lastpath_id = window.location.href.split("/");
var getlast_id = Number(lastpath_id[lastpath_id.length - 1]);

// =====================================================================================
// CIPL FORM
$(function () {
    var last_approve = lastpath_id[lastpath_id.length - 2];
    if (lastpath_id[4] === "CiplApprove" || last_approve === "CiplView") {
        $("input, textarea, select").prop('disabled', true);
        $('#partAddButton').hide();
    }
});

//  ==================================================================== VIEW APPROVE ====================================================================
function ApproveCipl(obj) {
    if ($("#btnApprove").val() == "ApproveAndSave") {
        var data = {
            Id: obj.Id,
            Status: obj.Status,
            Notes: obj.Notes
        };
        var formdata = { Notes: "", };
        SaveChangeHistoryAndApproveCIPL(formdata, data);
    }
    else {
        $.ajax({
            url: "/EMCS/CiplApproval",
            type: "POST",
            data: {
                Id: obj.Id,
                Status: obj.Status,
                Notes: obj.Notes
            },
            success: function (resp) {
                Swal.fire({
                    title: 'Approve!',
                    text: 'Data Confirmed Successfully',
                    type: 'success'
                }).then((result) => {
                    window.location.href = "/EMCS/Mytask";
                });
            }
        });
    }
}

function SaveChangeHistoryAndApproveCIPL(formdata, ciplApprove) {
    var modelObj = {
        FormType: "CIPL",
        FormId: $('#idCipl').val(),
        Reason: formdata.Notes,
        Status: status
    }
    if ($('#jenisBarangCipl').val() === 'CATERPILLAR SPAREPARTS') {
        var CategoryItem = $('#sparepartsCipl').val();
    } else if ($('#jenisBarangCipl').val() === 'MISCELLANEOUS') {
        var CategoryItem = $('#permanentCipl').val();
    } else if ($('#jenisBarangCipl').val() === 'CATERPILLAR NEW EQUIPMENT' || $('#jenisBarangCipl').val() === 'CATERPILLAR USED EQUIPMENT') {
        var CategoryItem = $('#unitCipl').val();
    }
    var item = {
        Data: {
            Id: $('#idCipl').val(),
            CiplNo: $('#noCipl').val(),
            dateCipl: $('#dateCipl').val(),
            Category: $('#jenisBarangCipl').val(),
            ReferenceNo: $('#refCipl').val() === null ? "" : $('#refCipl').val().toString(),
            CategoriItem: CategoryItem,
            ExportType: $('#exportCipl').val(),
            ExportTypeItem: $('#exportremarksCipl').val(),
            refCipl: $('#refCipl').val(),
            SoldConsignee: $('#soldConsigneeCipl').val(),
            SoldToName: $('#consigneeNameCipl').val(),
            SoldToAddress: $('#consigneeAddressCipl').val(),
            SoldToCountry: $('#consigneeCountryCipl').val(),
            SoldToTelephone: $('#consigneeTelpCipl').val(),
            SoldToFax: $('#consigneeFaxCipl').val(),
            SoldToPic: $('#consigneePicCipl').val(),
            SoldToEmail: $('#consigneeEmailCipl').val(),


            ShipDelivery: $('#shipDeliveryCipl').val(),
            ConsigneeSameSoldTo: $('#ConsigneeSameSoldTo').val(),
            ConsigneeName: $('#consigneeNameCipl').val(),
            ConsigneeAddress: $('#consigneeAddressCipl').val(),
            ConsigneeCountry: $("#consigneeCountryCipl").val(),
            ConsigneeTelephone: $('#consigneeTelpCipl').val(),
            ConsigneeFax: $('#consigneeFaxCipl').val(),
            ConsigneePic: $('#consigneePicCipl').val(),
            ConsigneeEmail: $('#consigneeEmailCipl').val(),
            //consigneeCipl: $('#consigneeCipl').val(),
            NotifyPartySameConsignee: $('#NotifyPartySameConsignee').val(),
            NotifyName: $('#notifyNameCipl').val(),
            NotifyAddress: $('#notifyAddressCipl').val(),
            NotifyCountry: $('#notifyCountryCipl').val(),
            NotifyTelephone: $('#notifyTelpCipl').val(),
            NotifyFax: $('#notifyFaxCipl').val(),
            NotifyPic: $('#notifyPicCipl').val(),
            NotifyEmail: $('#notifyEmailCipl').val(),
            Area: $('#areaCipl').val().split('-')[0].trim(),
            Branch: $('#cabangCipl').val().split('-')[0].trim(),
            Currency: $('#currencyCipl').val(),
            Rate: $('#RateCipl').val(),
            LcNoDate: $('#lcnoCipl').val() + ' - ' + $('#lcDateCipl').val(),
            PaymentTerms: $('#paymentCipl').val(),
            LoadingPort: $('#loadingCipl').val(),
            DestinationPort: $('#destinationCipl').val(),
            IncoTerm: $('#incoCipl').val(),
            ShippingMethod: $('#shippingCipl').val(),
            FreightPayment: $('#freightCipl').val(),
            CountryOfOrigin: $('#countryCipl').val(),
            ShippingMarks: $('#shippingMarkCipl').val(),
            Remarks: $('#remarksCipl').val(),
            inspectionCipl: $('#inspectionCipl').val(),
            SpecialInstruction: $('#txtSpecialInscCipl').val(),
            Status: status,
            PickUpPic: $('#idPickupPic').val() === null || $('#idPickupPic').val() === "" ? "" : $('#idPickupPic').val().split('-')[0].trim(),
            PickUpArea: $('#idPickupArea').val() === null || $('#idPickupArea').val() === "" ? "" : $('#idPickupArea').val().split('-')[0].trim(),
            CategoryReference: $('#idCategoryReference').val(),
            Consolidate: $('#ConsolidateCipl').val()
        },
        Forwader: {
            Forwader: $('#forwaderCipl').val(),
            Type: $('#typeCipl').val(),
            ExportShipmentType: $('#ExportShipmentType').val(),
            Branch: $('#CkbBranchCipl').val(),
            Attention: $('#forwaderAttentionCipl').val(),
            Company: $('#forwaderCompanyCipl').val(),
            SubconCompany: $('#forwaderForwadingCipl').val(),
            Address: $('#forwaderAddressCipl').val(),
            Area: $('#forwaderAreaCipl').val(),
            City: $('#forwaderCityCipl').val(),
            PostalCode: $('#forwaderPostalCodeCipl').val(),
            Contact: $('#forwaderContactCipl').val(),
            FaxNumber: $('#forwaderFaxCipl').val(),
            Forwading: $('#forwaderForwadingCipl').val(),
            Email: $('#forwaderEmailCipl').val()
        }
    }

    $.ajax({
        url: '/EMCS/SaveHistoryAndApprove',
        type: 'POST',
        data: {
            form: modelObj,
            item: item,
            ciplApprove: ciplApprove
        },
        cache: false,
        async: true,
        success: function (data, response) {
            Swal.fire({
                title: 'Approve!',
                text: 'Data Confirmed Successfully',
                type: 'success'
            }).then((result) => {
                window.location.href = "/EMCS/Mytask";
            });
        },
        error: function (e) {
            return false;
        }
    });

}


function diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

$("#btnApprove").on("click", function () {
    var SubmitDate = new Date($('#SubmitDate').val());
    var DateTimeNow = new Date();
    var DifferenceTime = diff_hours(DateTimeNow, SubmitDate);
    if (DifferenceTime > 24) {
        $("#myModalProblem").modal("show");
        $("#YesApproveBtn").show();
        $("#YesRejectBtn").hide();
        $("#YesReviseBtn").hide();
        $("#YesCancelBtn").hide();
        $("#myModalProblemContent form").find("input").removeAttr("disabled");
        $("#myModalProblemContent form").find("textarea").removeAttr("disabled");
        $("#myModalProblemContent form").find("select").removeAttr("disabled");
    } else {
        //Swal.fire({
        //    icon: 'success',
        //    title: 'Approve!',
        //    text: 'Data Confirmed Successfully',
        //    showConfirmButton: true
        //});
        Swal.fire({
            title: 'Approve Confirmation',
            text: 'By approving this document, you are responsible for the authenticity of the documents and data entered. Are you sure you want to process this document?',
            type: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Approve!',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCloseButton: true
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    input: 'textarea',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    inputPlaceholder: 'Type your notes here...',
                    inputAttributes: {
                        'aria-label': 'Type your notes here'
                    },
                    showCancelButton: false
                }).then((result) => {
                    $('#btnApprove').prop('disabled', true);
                    $('#btnRevise').prop('disabled', true);
                    $('#btnReject').prop('disabled', true);
                    var Notes = result.value;
                    var Status = "Approve";
                    var Id = $('#idCipl').val();
                    var data = { Notes: Notes, Status: Status, Id: Id };
                    ApproveCipl(data);

                });
                
            }
            return false;
        });
    }

});
