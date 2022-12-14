
(function (window) {
	window.pisApp = function () {



		var table = function () {

			var config, _currentSize = 5, _currentPage = 1, _currentSort = 1;
			var $tbl, options, _urlSearch, _urlPaging, _urlPaging, _searchParams, _isAuto;

			var params = function (tdConfig) {
				config = tdConfig;

				_urlSearch = config.urlSearch;
				_urlPaging = config.urlPaging;
				_urlPaging = config.urlPaging;
				_searchParams = config.searchParams;
				_isAuto = (config.autoLoad == null ? false : config.autoLoad);

				intiTable(config.id);
			};


			intiTable = function (id) {
				$tbl = $('#' + id);
				options = $tbl.bootstrapTable('getOptions');
				if (options.pageSize == undefined) options.pageSize = 5;
				if (options.pageNumber == undefined) options.pageNumber = 1;

				$tbl.off('click', '.th-inner').on('click', '.th-inner', function (x) {
					_currentSort = 1;
				});

				$tbl.on('page-change.bs.table', function (e, number, size, search) {
					if (_currentPage == number) {
						if (_currentSize != size) {
							_currentSize = size;
							getData(number, size, search, true);
						}
						return;
					}
					else
						_currentPage = number;

					//alert(number + ' size:' + size + ' search:' + search)
					getData(number, size, search, true);
				});

				$tbl.on('sort.bs.table', function (e, name, order) {

					if (_currentSort != 1) return;
					
					//alert('short: '+ name + '  ' + order + ' ; options.pageNumber:' + options.pageNumber)
					getData(options.pageNumber, options.pageSize, options.searchText, true, name, order);
					_currentSort = 2;
				});

				//$tbl.on('search.bs.table', function (e, text) {
					//alert(text + '  options.pageNumber:' + options.pageNumber)
					//getData(options.pageNumber, options.pageSize, options.searchText, true, name, order);
				//});

				$("[name=refresh]").click(function () {
					var txt = $('[name=searchText]').val() == '' ? $('.input-sm').val() : $('[name=searchText]').val();
					$tbl.bootstrapTable('selectPage', 1);
					getData(options.pageNumber, options.pageSize, txt, false);
				});

			};

			getData = function (number, size, search, isPaging, sort, order) {
				//$('.fixed-table-loading').show();
				enableLink(false);

				var url = (isPaging == true ? _urlPaging : _urlSearch);

				var ofset = (number - 1) * size;
				var page = (ofset / size) + 1

				if (_searchParams != null) { // && search != undefined
					//_searchParams.hasOwnProperty("searchName"))
					_searchParams["searchName"] = search;
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
								//var _id = $tbl.closest('table').attr('id');							
								//$('#' + _id + ' .noMatches').text('Record not found ..!');
								//$tbl.bootstrapTable('refresh')
								$tbl.find(".noMatches").text('Record not found ..!');
							}
						}
					},
					complete: function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
						enableLink(true);
						//$('.fixed-table-loading').hide();
					},
					error: function (xhr, error, errorThrown) {
						var responseTitle = $(xhr.responseText).filter('title').get(0);
						alert($(responseTitle).text()); // + "\n" + formatErrorMessage(xhr, error));
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

			};

			var _load = function (prm) {
				if (prm != undefined) _urlSearch = prm;

				//alert('LOAD-2\n $tbl:' + $tbl +
				//'\n urlSearch:' + _urlSearch + ' prm:' + prm +
				//'\n Paging:' + _urlPaging +
				//'\n search:' + _searchParams +
				//' isauto:' + _isAuto
				//);

				var txt = $('[name=searchText]').val() == '' ? $('.input-sm').val() : $('[name=searchText]').val();
				//options.pageNumber = 1;
				$tbl.bootstrapTable('selectPage', 1);
				getData(options.pageNumber, options.pageSize, txt, false);

			};

			return {
				params: params,
				load: _load
			}
		}();



		return {
			table: table
			//makeClicky: makeClicky,
			//completeChangeList: completeChangeList,
			//paging: paging,
			//sorts: sorts
		};
	}();
})(window);













