var $table = $('#tableMapping');
var $AllowDelete = $('#AllowDelete').val();
var $AllowUpdate = $('#AllowUpdate').val();
$(function () {
	enableLink(false);
	
	var hsCode = new mySelect2({
		id: 'selHSCodeList_Ids',
		url: '/Picker/Select2HsCode'
	}).load();

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
		columns: [
		{
			field: 'action',
			title: 'Action',
			width: '180px',
			align: 'center',
			formatter: operateFormatter({ Edit: Boolean($AllowUpdate) }),
			events: operateEvents,
			class: 'noExl',
			switchable: false
		},
		{
			field: 'No',
			title: 'No',
			halign: 'center',
			align: 'right',
			width: '3%',
			formatter: runningFormatter
		}, {
			field: 'CommodityCode',
			title: 'Commodity Code',
			halign: 'center',
			align: 'left',
			sortable: true
		}, {
			field: 'CommodityName',
			title: 'Commodity Description',
			halign: 'center',
			align: 'left',
			sortable: true
		}, {
			field: 'HSCode',
			title: 'HSCode',
			halign: 'center',
			align: 'left',
			sortable: true
		}, {
			field: 'HSDescription',
			title: 'HS Description',
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
			width: '3%',
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
			field: 'MappingID',
			title: 'Id',
			sortable: true,
			visible: false
		}
		//, {
		//	field: 'machine',
		//	title: 'Machine',
		//	halign: 'center',
		//	align: 'left',
		//	sortable: false
		//}
		]
	});

	$('#btn-clear').click(function () {
	    $('#CommodityName').val('');
	    $('#HSDescription').val('');
	    $('#selHSCodeList_Ids').val('val', '').change();
	    $('#Status').val('', '1').change();
	});

	$("#btnFilter").click(function () {		
		$('#divResult').hide();
		$('#uploadResult').hide();
		$('#uploadResult').empty();

		window.pis.table({
			objTable: $table,
			urlSearch: '/imex/commodityMappingPage',
			urlPaging: '/imex/commodityMappingPageXt',
			searchParams: {
				Status: $('#Status').val(),
				CommodityName: $('#CommodityName').val(),
				selHSCodeList_Ids: $('#selHSCodeList_Ids').val(),
				HSDescription: $('#HSDescription').val()
			},
			autoLoad: true
		});

	});

	$(".downloadExcel").click(function () {
		//$(".table2excel").table2excel({
		//	exclude: ".noExl",
		//	name: "partMapping",
		//	filename: "partMapping.xls"
		//});

        enableLink(false);
        $.ajax({
            url: "DownloadCommodityMappingToExcel",
            type: 'GET',
            success: function (guid) {
                enableLink(true);
                window.open('DownloadToExcel?guid=' + guid, '_blank');
            },
            cache: false,
            contentType: false,
            processData: false
        });
	});

	$(".downloadExcel2").click(function () { $(".table2excel2").table2excel({ filename: "unMapping.xls" }); });

	$("#mySearch").insertBefore($("[name=refresh]"))
	enableLink(true);
});


//function operateFormatter(value, row, index) {
//	return [
//			'<div class="btn-group" style="width:125px;white-space:nowrap; text-align:center">',
//					'<button type="button" class="btn btn-xs btn-primary edit" title="Edit"><i class="fa fa-pencil"></i> Edit</button>',
//			'</div>'
//	].join('');
//}

function operateFormatter(options) {
    var btn = [];

    btn.push('<div style="width:70px;white-space:nowrap;text-align:center">');
    if (options.Add == true)
        btn.push('<button type="button" class="btn btn-xs btn-danger extend" title="Extend"><i class="fa fa-check-circle"></i> Extend</button>')
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
		loadModal('/imex/commodityMappingEdit?id=' + row.MappingID);
	},
	'click .detail': function (e, value, row, index) {
		enableLink(false);
		$('.fixed-table-loading').show();
		loadModal('/imex/commodityMappingView?id=' + row.MappingID);
	}
};



$(function () {

	$.ajaxSetup({ cache: false });

	$("#myModalPlace").on('hide.bs.modal', function () {
		//recall select2 ajax after return from modal (bugs)
	});

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
	var dt = { "rows": {},"total": 0};
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