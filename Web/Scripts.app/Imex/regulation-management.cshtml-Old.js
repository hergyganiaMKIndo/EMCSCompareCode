var $table = $('#tabelRegulationMgm');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();
$(function () {
	enableLink(false);

	//helpers.buildDropdown('/Picker/GetListLartas', $('#selLartas'), true, null);
	helpers.buildDropdown('/Picker/GetListOM', $('#selOrderMethods'), true, null);

	$('.cal').click(function () {
	    $('#IssuedDateSta').datepicker('show');
	});

	$('.cal1').click(function () {
	    $('#IssuedDateFin').datepicker('show');
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
		columns: [{
			field: 'action',
			title: 'Action',
			align: 'center',
			formatter: operateFormatter({ Edit: Boolean($AllowUpdate), Info: Boolean($AllowDelete) }),
			events: operateEvents,
			class: 'noExl',
			switchable: false
		}, {
			title: 'No',
			halign: 'center',
			align: 'right',
			width:'3%',
			formatter: runningFormatter,
			switchable: false
		}, {
			field: 'Regulation',
			title: 'Regulation',
			halign: 'center',
			align: 'left',
			sortable: true
		}, {
			field: 'Description',
			title: 'Description',
			halign: 'center',
			align: 'left',
			sortable: true
		},
		//{
		//	field: 'LartasDesc',
		//	title: 'Lartas',
		//	halign: 'center',
		//	align: 'left',
		//	sortable: true
		//},
		{
			field: 'IssuedBy',
			title: 'Issued By',
			halign: 'center',
			align: 'left',
			sortable: true
		}, {
			field: 'IssuedDate',
			title: 'Issued Date',
			halign: 'center',
			align: 'left',
			sortable: true,
			formatter: 'dateFormatter'
		}, {
			field: 'OMCode',
			title: 'OM',
			halign: 'center',
			align: 'left',
			sortable: true
		},
		{
			field: 'Status',
			title: '<div style="white-space:nowrap;">Status</div>',
			halign: 'center',
			align: 'center',
			sortable: false,
			width: '12px',
			whitespace: 'nowrap',
			nowrap:true,
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
		}, {
			field: 'RegulationManagementID',
			title: 'Id',
			sortable: true,
			visible: false
		}]
	});


	$("#btnFilter").click(function () {
		submitFilter();
	});

	$('#btn-clear').click(function () {
	    $('#Regulation').val('');
	    $('#IssuedBy').val('');
	    $('#IssuedDateSta').val('');
	    $('#IssuedDateFin').val('');
	    $('#selOrderMethods').val('val', '').change();
	    $('#Status').val('', 'ALL').change();
	});

	submitFilter = function () {

		if ($('#IssuedDateSta').val()!='' && $('#IssuedDateFin').val()!='') {
			$.validator.addMethod("greaterThan",
				function (value, element, params) {
					var prm = $('#' + params).val();

					if (!/Invalid|NaN/.test(new Date(value))) {
						return new Date(value) >= new Date(prm);
					}
					return isNaN(value) && isNaN(prm) || (Number(value) > Number(prm));
				}, 'Issued Finish must be greater than Issued Start.');
			$("#IssuedDateFin").rules('add', { greaterThan: "IssuedDateSta"});
		}

		if (!$("form#frmSrc").valid()) { $("#IssuedDateFin").rules('remove'); return; }

		if (($('#IssuedDateSta').val() != '' && $('#IssuedDateFin').val() == '') || $('#IssuedDateSta').val() == '' && $('#IssuedDateFin').val() != '') {
			$('#IssuedDateSta').val('');
			$('#IssuedDateFin').val('');
		}

		$('#divResult').hide();
		$('#uploadResult').hide();
		$('#uploadResult').empty();

		//var _staDate, _endDate;
		//if($('#IssuedDate').val() !='') {
		//	_staDate = $('#IssuedDate').data('daterangepicker').startDate.format('MM/DD/YYYY');
		//	_endDate = $('#IssuedDate').data('daterangepicker').endDate.format('MM/DD/YYYY');
		//}

		window.pis.table({
			objTable: $table,
			urlSearch: '/imex/RegulationManagementPage',
			urlPaging: '/imex/RegulationManagementPageXt',
			searchParams: {
				Regulation: $('#Regulation').val(),
				Description: $('#Description').val(),
				IssuedBy: $('#IssuedBy').val(),
				IssuedDateSta: $('#IssuedDateSta').val(),
				IssuedDateFin: $('#IssuedDateFin').val(),
				Status: $('#Status').val(),
				//selLartas: $('#selLartas').val(),
				selOrderMethods: $('#selOrderMethods').val()
			},
			autoLoad: true
		});
	};

	$(".downloadExcel").click(function () {
		$(".table2excel").table2excel({
			exclude: ".noExl",
			name: "regulation",
			filename: "regulation.xls"
		});
	});

	$(".downloadExcel2").click(function () {$(".table2excel2").table2excel({filename: "unMapping.xls"});});


	$("#mySearch").insertBefore($("[name=refresh]"))
	enableLink(true);
});


//function operateFormatter(value, row, index) {
//	return [
//			'<div class="btn-group" style="width:123px;white-space:nowrap; text-align:center">',
//					'<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-pencil"></i> Edit</button>',
//					'<button type="button" class="btn btn-xs btn-info detail" title="Detail"><i class="fa fa-search-plus"></i> Detail</button>',
//			'</div>'
//	].join('');
//}


function operateFormatter(options) {
    var btn = [];

    btn.push('<div  class="btn-group" style="width:123px;white-space:nowrap; text-align:center">');
    if (options.Add == true)
        btn.push('<button type="button" class="btn btn-success new" title="Add"><i class="fa fa-plus"></i></button>')
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
	'click .edit': function (e, value, row, index) {
		loadModal('/imex/RegulationManagementEdit?id=' + row.RegulationManagementID);
	},
	'click .detail': function (e, value, row, index) {
		loadDetailPage('/imex/RegulationManagementDetail/' + row.RegulationManagementID);
		//window.location = '/imex/regulation-management-detail/' + row.RegulationManagementID;
	}
};



$(function () {
	$.ajaxSetup({ cache: false });
	$("a[data-modal]").on("click", function (e) {
		enableLink(false);

		$('#myModalContent').load(this.href, function () {

			$('#myModalPlace').modal({ keyboard: true }, 'show');

			bindForm(this);

			enableLink(true);
		});
		return false;
	});


});

function bindForm(dialog) {
	$('form', dialog).submit(function () {

		if (!$("form#" + this.id).valid()) { return false; }

		$('#progress').show();
		enableLink(false);

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
		async: false,
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