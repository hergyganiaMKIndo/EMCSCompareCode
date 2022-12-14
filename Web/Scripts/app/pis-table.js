"use strict";
(function (window) {
	window.pis1 = function () {
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
				if (_currentPage == number) {
					if (_currentSize != size) {
						_currentSize = size;
						getData(number, size, search, true);
					}

					return;
				}
				else
					_currentPage = number;
				getData(number, size, search, true);
			});

			$tbl.on('sort.bs.table', function (e, name, order) {
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

			if (_isAuto) {
				_totRecord = 0;
				_currentSize = options.pageSize;
				_currentPage = 1;

				$tbl.bootstrapTable('selectPage', 1);				
				getData(1, _currentSize, options.searchText, false);
			}

			$("[name=refresh]").click(function () {
				var txt = $('[name=searchText]').val() == '' ? $('.input-sm').val() : $('[name=searchText]').val();
				_totRecord = 0;
				_currentSize = options.pageSize;
				_currentPage = 1;
				$tbl.bootstrapTable('selectPage', 1);
				getData(1, _currentSize, txt, false);
			});

			function getData(number, size, search, isPaging, sort, order) {
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
				}

				$.ajax({
					type: 'POST',
					url: url,
					data: {
						offset: number,
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
							            $tbl.bootstrapTable('resetView', { height: 218 });
							        else if (dt.rows.length == 2)
							            $tbl.bootstrapTable('resetView', { height: 264 });
							        else if (dt.rows.length == 3)
							            $tbl.bootstrapTable('resetView', { height: 384 });
							        else if (dt.rows.length == 4)
							            $tbl.bootstrapTable('resetView', { height: 270 });
							        else {
							            $tbl.bootstrapTable('resetView', { height: 480 });
							            $("html, body").animate({ scrollTop: $(document).height() - 55 }, "slow");
							        }
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
					},
					error: function (xhr, error, errorThrown) {
						var responseTitle = $(xhr.responseText).filter('title').get(0);
						alert($(responseTitle).text()); // + "\n" + formatErrorMessage(xhr, error));
						$('html, body').removeClass('wait');
						enableLink(true);
					}
				});
			}

		};
		return {
			table: table
		};
	}();

})(window);
