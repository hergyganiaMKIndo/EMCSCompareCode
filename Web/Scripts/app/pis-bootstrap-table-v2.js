
(function (window) {

	window.pis = function () {

        var config, _currentSize = 5, _currentPage = 1, _currentSort = 1, _currentSortNm = '', _totRecord = 0;
		var table = function (tdConfig) {
			config = tdConfig;

			var
				$tbl = config.objTable,
				_urlSearch = config.urlSearch,
				_urlPaging = config.urlPaging,
				_urlPaging = config.urlPaging,
				_searchParams = config.searchParams,
				_dataHeight = config.dataHeight,
				_isEnableLink = (config.enableLink == null ? true : config.enableLink),
				_isAuto = (config.autoLoad == null ? false : config.autoLoad),
				_afterLoadData = config.afterLoadData,
				_afterComplete = config.afterComplete;
			var options = $tbl.bootstrapTable('getOptions');
			
			if (options.pageSize == undefined) {
				_currentSize = 5;
				options.pageSize = _currentSize;
			}
			if (options.pageNumber == undefined) {
				_currentPage = 1;
				options.pageNumber = _currentPage;
			}

            $tbl.on('page-change.bs.table', function (e, number, size, search) {
                //console.log('page-change.bs.table');
				if (_currentPage == number) {
					if (_currentSize != size) {
						_currentSize = size;
						getData(number, size, search, true);
					}
					return;
				}
				else
					_currentPage = number;
                //btn page
				getData(number, size, search, true);
			});

			//$tbl.on('refresh-options.bs.table', function (e, number, size, search) {
			//    alert('a');
			//});

            $tbl.on('sort.bs.table', function (e, name, order) {
                //console.log('sort.bs.table');
				if (_currentSortNm == (name + '-' + order)) { return; }
				getData(options.pageNumber, options.pageSize, options.searchText, true, name, order);
				_currentSortNm = (name + '-' + order);
				_currentSort = 2;
			});

			$tbl.on('column-switch.bs.table', function (e, number, size, search) {
				if (typeof _afterComplete === "function") {
					_afterComplete();
				};
            });

            //$tbl.on('created-controls.bs.table', function (e, a, b,c,d) {
            //    console.log('created-controls.bs.table');
            //    console.log($tbl.bootstrapTable('getOptions'));
            //});

            $tbl.on('column-search.bs.table', function (e, columnName, textSearch) {
                //console.log('column-search.bs.table');
                var options = $tbl.bootstrapTable('getOptions');
                getData(options.pageNumber, options.pageSize, options.searchText, false, null, null, options.valuesFilterControl);
            });

			if (_isAuto) {
				_totRecord = 0;
				_currentSize = options.pageSize;
				_currentPage = 1;
				$tbl.bootstrapTable('selectPage', 1);
                // btn search
				getData(1, _currentSize, options.searchText, false);
			}

            $("[name=refresh]").click(function () {
                //console.log('on refresh');
				var txt = $('[name=searchText]').val() == '' ? $('.input-sm').val() : $('[name=searchText]').val();
				_totRecord = 0;
				_currentSize = options.pageSize;
				_currentPage = 1;
//				$tbl.bootstrapTable('selectPage', 1);
				$tbl.bootstrapTable('selectPage', options.pageNumber);
//				alert(options.pageSize + ' = ' + options.pageNumber);
				getData(options.pageNumber, _currentSize, txt, false);
			});

            function getData(number, size, search, isPaging, sort, order, filterColumns) {
				$('html, body').addClass('wait');
				if (_dataHeight != undefined && _totRecord == 0) {
					$tbl.bootstrapTable('resetView', { height: 212 });
				}
				enableLink(false);

				var url = (isPaging == true ? _urlPaging : _urlSearch);

				var ofset = (number - 1) * size;
				var page = (ofset / size) + 1
				var result;

				if (_searchParams != null) {
                    _searchParams["searchName"] = search;
                    _searchParams['filterColumns'] = filterColumns;
                }
                
				$.ajax({
					type: 'POST',
					url: url,
					data: {
						offset: number, //ofset,
						limit: size,
						sort: sort == undefined ? '' : sort,
						order: order == undefined ? '' : order,
						searchName: search,
						params: JSON.stringify(_searchParams)
					},
					success: function (d) {

						if (d.Data != null) {
							var dt = {
								"rows": d.Data.result,
								"total": d.Data.totalcount
							};


							$tbl.bootstrapTable('load', dt);
							if (dt == null || dt.rows.length == 0) {
								$tbl.find(".noMatches").text('Record not found ..!');

								if (_dataHeight != undefined) {
									$tbl.bootstrapTable('resetView', { height: 212 });
									$tbl.bootstrapTable('resetView');
								}
							}
							else {
							    if (_dataHeight != undefined && _totRecord == 0) {
							        if (dt.rows.length == 1)
							            //							            $tbl.bootstrapTable('resetView', { height: 308 });
							            $tbl.bootstrapTable('resetView', { height: 207 });
							        else if (dt.rows.length == 2)
							            //							            $tbl.bootstrapTable('resetView', { height: 370 });
							            $tbl.bootstrapTable('resetView', { height: 281 });
							        else if (dt.rows.length == 3)
							            //							            $tbl.bootstrapTable('resetView', { height: 430 });
							            $tbl.bootstrapTable('resetView', { height: 384 });
							        else if (dt.rows.length == 4)
							            //							            $tbl.bootstrapTable('resetView', { height: 430 });
							            $tbl.bootstrapTable('resetView', { height: 318 });
							        else {
							            //                                        $tbl.bootstrapTable('resetView', { height: _dataHeight });
							            $tbl.bootstrapTable('resetView', { height: 354 });
							            $("html, body").animate({ scrollTop: $(document).height() - 55 }, "slow");
							        }
									//$tbl.bootstrapTable('resetView', { height: _dataHeight });
									//if (dt.rows.length > 3)
									//	$("html, body").animate({ scrollTop: $(document).height() - 55 }, "slow");
								}
								_totRecord = dt.rows.length;
							}

							result = d.Data.result;

							if (typeof _afterLoadData === "function") {
								_afterLoadData(d.Data.result);
							}
						}

						if (d.Status != undefined && d.Msg != undefined && d.Status == 1) {
							var resul = { Data: '' }, dt = { "rows": resul, "total": 0 };
							$tbl.bootstrapTable('load', dt);
							var _m = '<div style="margin-left:9%;text-align:left">Error:</div><div style="margin-left:9%;color:red;text-align:left">' + d.Msg + '<br><br></div>';
							$tbl.find(".noMatches").html(_m);

							if (_dataHeight != undefined) {
								$tbl.bootstrapTable('resetView', { height: 212 });
							}

							enableLink(true);
							$('html, body').removeClass('wait');
							try {
								sAlert('Failed', d.Msg, 'error');
							}
							catch (e) {
								alert('Failed:\n' + d.Msg);
							}
						}

					},
					complete: function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
						
						if (typeof _afterComplete === "function") {
							_afterComplete(result);
						};

						if (_isEnableLink || isPaging) {							
							enableLink(true);
							$('html, body').removeClass('wait');
						}
						//$('.fixed-table-loading').hide();
					},
					error: function (xhr, error, errorThrown) {
						var responseTitle = $(xhr.responseText).filter('title').get(0);
						alert($(responseTitle).text()); // + "\n" + formatErrorMessage(xhr, error));
						$('html, body').removeClass('wait');
						enableLink(true);
					}
				});

				//$.get(url, {
				//	offset: number, //ofset,
				//	limit: size,
				//	searchName: search,
				//	sort: sort == undefined ? '' : sort,
				//	order: order == undefined ? '' : order,
				//	params: JSON.stringify(_searchParams)
				//},
				//function (res) {
				//	var dt = { "rows": res.Data.result, "total": res.Data.totalcount };
				//	$tbl.bootstrapTable('load', dt);
				//	if (dt == null || dt.rows.length == 0) {
				//		$('.noMatches').text('Record not found ...!');
				//		$tbl.bootstrapTable('refresh')
				//	}
				//	enableLink(true);
				//	$('.fixed-table-loading').hide();
				//});

			}

		};
		return {
			table: table
		};
	}();

})(window);



/* rendering select2 support paging */
mySelect2 = function (params) {
	this._init(params);
}

$.extend(mySelect2.prototype, {
	// object variables
	objParams: '',

	_init: function (params) {
		// do initialization here
		this.objParams = params;
	},

	load: function () {
		var _p = this.objParams;
		var _minInputLength = _p.minimumInputLength || 1;
		var pageSize = 25;
		var pid = $('#' + _p.id);
		$(pid).hide();
		var ph = $(pid).attr('placeholder');
		var vu = $(pid).val();
		var isVal = (vu == undefined || vu == null || vu == '' || vu == '0' ? false : true);

		// object method
		$(pid).select2({
			allowClear: (isVal == false ? false : true),
			placeholder: (ph == undefined ? '' : ph),
			minimumInputLength: _minInputLength,
			width: 'resolve',
			dropdownAutoWidth: 'false',
			containerCssClass: "wrap",

			ajax: {
				url: _p.url,
				dataType: 'jsonp',
				success: function () { },
				beforeSend: function () { },
				//How long the user has to pause their typing before sending the next request
				quietMillis: 175,
				data: function (params) {
					var queryParameters = {
						pageSize: pageSize,
						page: params.page || 1,
						searchTerm: params.term || '',
						term: params.term || ''
					}
					return queryParameters;
				},
				processResults: function (data, page) {
					var isMore = data.pagination, isMore = (isMore == 'true' ? true : false);
					return {
						results: data.Results,
						pagination: { more: isMore } //data.more }
					};
				}
			},
			//initSelection: function (element, callback) {
			//	var id = $(element).val();
			//	var txt = _p.text == null ? $(element).text() : _p.text;
			//	if (id !== '') {
			//		var obj = { id: id, text: txt };
			//		callback(obj);
			//	}
			//},
			formatNoMatches: function (term) {
				return "<div>No matches found</div>";
				//if (field == undefined)
				//	return "<div>No matches found</div>";
				//else
				//	return "<div onclick='addNew" + field + "()' title='add new'>No matches found <a href='#' style='float:right'><img src='" + "/" + "Content/icons/plus.png' border='0px'/></a></div>";
			}
		});

		$('.select2-selection__arrow').show();
		//if (isVal == false)
		//	$('.select2-selection__arrow').show();
		//else
		//	$('.select2-selection__arrow').hide();

	}
});


var helpers =
{

	buildDropdown: function (url, dropdown, isSelect2, text) {
		var selected = '', val = $(dropdown).val();
		var isVal = (val == undefined || val == null || val == '' || val == '0' ? false : true);
		var ph = $(dropdown).attr('placeholder');

		// Remove current options
		dropdown.html('');

		// Add the empty option with the empty message
		if (text != null && text != undefined)
			dropdown.append('<option value="">' + text + '</option>');

		$.getJSON(url, null, function (dt) {
			$.each(dt.Result, function (i, v) {
				selected = (val == v.id ? 'selected="selected"' : '');
				dropdown.append("<option " + selected + " value='" + v.id + "'>" + v.text + "</option>");
			})
		})
		.done(function () {
			if (isSelect2 == true) {
				dropdown.hide();
				dropdown.select2({
					allowClear: (isVal == false ? false : true),
					placeholder: (ph == undefined ? '' : ph)
				});
			}
			else {
				dropdown.show();
			}

			$('.select2-selection__arrow').show();
		})
		.fail(function () { })
		.always(function () {
		});

	}
}
