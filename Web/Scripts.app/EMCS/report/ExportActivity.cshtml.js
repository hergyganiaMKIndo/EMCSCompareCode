﻿$(document).ready(function () {
    //function getDataSummary() {
    //    $.ajax({
    //        type: 'GET',
    //        url: "~/Json/ExportTransaction.json",
    //        dataType: JSON
    //    })
    //    .done(function (data, textStatus, jqXHR) {
    //            getHighChart();
    //    })
    //}
    $('#TrendExportButton').on('click', function (e) {
        $("#TrendExportFilter").toggle("show");
    });
    $("#TrendExportFilter").on("click", function (e) {
        e.stopPropagation();
    });

    $('#btn-big-5-commodities').on('click', function (e) {
        $("#ul-big-5-commodities").toggle("show");
    });
    $("#ul-big-5-commodities").on("click", function (e) {
        e.stopPropagation();
    });

    $('#ExportByCategoryButton').on('click', function (e) {
        $("#ExportByCategoryFilter").toggle("show");
    });
    $("#ExportByCategoryFilter").on("click", function (e) {
        e.stopPropagation();
    });

    $('#SalesVSNonSalesButton').on('click', function (e) {
        $("#SalesVSNonSalesFilter").toggle("show");
    });
    $("#SalesVSNonSalesFilter").on("click", function (e) {
        e.stopPropagation();
    });

    $('#TotalExportButton').on('click', function (e) {
        $("#TotalExportFilter").toggle("show");
    });
    $("#TotalExportFilter").on("click", function (e) {
        e.stopPropagation();
    });

    var intervals = [
        { id: 2, text: "2 Years" },
        { id: 3, text: "3 Years" },
        { id: 4, text: "4 Years" },
        { id: 5, text: "5 Years" },
        { id: 6, text: "6 Years" },
        { id: 7, text: "7 Years" },
        { id: 8, text: "8 Years" },
        { id: 9, text: "9 Years" },
        { id: 10, text: "10 Years" }
    ];

    $("#TrendExportYearInterval").select2({
        data: intervals,
        width: '100%'
    }).on("select2:select", function () {
        var endYear = (parseInt($("#TrendExportStartYear").val()) + parseInt($(this).val())).toString();

        $("#TrendExportEndYear").val(endYear);
        $("#ExportByCategoryEndYear").val(endYear);

        $('#ExportByCategoryYearInterval').val($(this).val()).trigger('change');
    });
    $('#TrendExportYearInterval').val(intervals[0].id).trigger('change');
    $("#TrendExportStartYear").val(new Date().getFullYear() - 2);
    $("#TrendExportEndYear").val(new Date().getFullYear());

    $("#ExportByCategoryYearInterval").select2({
        data: intervals,
        width: '100%'
    }).on("select2:select", function () {
        var endYear = (parseInt($("#ExportByCategoryStartYear").val()) + parseInt($(this).val())).toString();

        $("#TrendExportEndYear").val(endYear);
        $("#ExportByCategoryEndYear").val(endYear);

        $('#TrendExportYearInterval').val($(this).val()).trigger('change');
    });
    $('#ExportByCategoryYearInterval').val(intervals[0].id).trigger('change');
    $("#ExportByCategoryStartYear").val(new Date().getFullYear() - 2);
    $("#ExportByCategoryEndYear").val(new Date().getFullYear());


    $("#TrendExportStartYear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    }).on('changeYear', function (e) {
        $(this).datepicker('hide');

        $("#ExportByCategoryStartYear").val(e.date.getFullYear());
        if (($('#TrendExportYearInterval').val() !== null && $('#TrendExportYearInterval').val() !== '')) {
            var endYear = (parseInt(e.date.getFullYear()) + parseInt($('#TrendExportYearInterval').val())).toString();
            $('#TrendExportEndYear').val(endYear);
            $('#ExportByCategoryEndYear').val(endYear);
        }
    });

    $("#ExportByCategoryStartYear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    }).on('changeYear', function (e) {
        $(this).datepicker('hide');

        $("#TrendExportStartYear").val(e.date.getFullYear());
        if (($('#ExportByCategoryYearInterval').val() !== null && $('#ExportByCategoryYearInterval').val() !== '')) {
            var endYear = (parseInt(e.date.getFullYear()) + parseInt($('#ExportByCategoryYearInterval').val())).toString();
            $('#TrendExportEndYear').val(endYear);
            $('#ExportByCategoryEndYear').val(endYear);
        }
    });

    $("#SalesVSNonSalesStartYear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    }).on('changeYear', function (e) {
        $(this).datepicker('hide');
        $('#SalesVSNonSalesEndYear').datepicker('setStartDate', (e.date.getFullYear()).toString());
    });
    $("#SalesVSNonSalesStartYear").val(new Date().getFullYear());

    $("#SalesVSNonSalesEndYear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    }).on('changeYear', function (e) {
        $(this).datepicker('hide');
        $('#SalesVSNonSalesStartYear').datepicker('setEndDate', (e.date.getFullYear()).toString());
    });
    $("#SalesVSNonSalesEndYear").val(new Date().getFullYear());

    $('#SalesVSNonSalesEndYear').datepicker('setStartDate', ($("#SalesVSNonSalesStartYear").val()));
    $('#SalesVSNonSalesStartYear').datepicker('setEndDate', $("#SalesVSNonSalesEndYear").val());

    $("#TotalExportYear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    }).on('changeYear', function (e) {
        $(this).datepicker('hide');
    });
    $("#TotalExportYear").val(new Date().getFullYear());

    $(".year").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    getHighChart();

});

function TrendExportSearch() {
    var startYear = $('#TrendExportStartYear').val();
    var endYear = $('#TrendExportEndYear').val();
    if (startYear !== null && startYear !== '' && endYear !== null && endYear !== '') {
        getTrendExport();
        getExportByCategory(startYear, endYear);
    }
}

function TrendExportDownload() {
    var startYear = $('#TrendExportStartYear').val();
    var endYear = $('#TrendExportEndYear').val();
    window.open('/EMCS/DownloadTrendExport?startYear=' + startYear + '&endYear=' + endYear, '_blank');
}

function ExportByCategorySearch() {
    var startYear = $('#ExportByCategoryStartYear').val();
    var endYear = $('#ExportByCategoryEndYear').val();
    if (startYear !== null && startYear !== '' && endYear !== null && endYear !== '') {
        getExportByCategory(startYear, endYear);
    }
}

function ExportByCategoryDownload() {
    var startYear = $('#ExportByCategoryStartYear').val();
    var endYear = $('#ExportByCategoryEndYear').val();
    window.open('/EMCS/DownloadExportByCategory?startYear=' + startYear + '&endYear=' + endYear, '_blank');
}

function SalesVSNonSalesSearch() {
    var startYear = $('#SalesVSNonSalesStartYear').val();
    var endYear = $('#SalesVSNonSalesEndYear').val();
    if (startYear !== null && startYear !== '' && endYear !== null && endYear !== '') {
        getSalesVSNonSales();
    }
}

function SalesVSNonSalesDownload() {
    var startYear = $('#SalesVSNonSalesStartYear').val();
    var endYear = $('#SalesVSNonSalesEndYear').val();
    window.open('/EMCS/DownloadSalesVSNonSales?startYear=' + startYear + '&endYear=' + endYear, '_blank');
}

function TotalExportSearch() {
    var year = $('#TotalExportYear').val();
    if (year !== null && year !== '') {
        getTotalExport();
    }
}

function TotalExportDownload() {
    var year = $('#TotalExportYear').val();
    window.open('/EMCS/DownloadTotalExport?year=' + year, '_blank');
}

$('#form-export-today').on('submit', function (e) {
    e.preventDefault();
    BigesCommoditiesCategory();
})
$('#btn-big-5-commodities-download').on('click', function () {
    var year = $('#date1-export-type').val();
    var exporttype = $('#slc-export-type').val();
    window.open('/EMCS/DownloadBig5Commodities?searchId=' + year + '&searchName=' + exporttype, '_blank');
})

function GetDataSummary() {

    //var newData = {
    //    "Perioddatefrom": dtfrom,
    //    "Perioddateto": dtto,
    //    "BranchCC100": BranchCC100
    //}

    //$.ajax({
    //    //type: 'GET',
    //    //url: "~/Json/ExportTransaction.json",
    //    dataType: JSON,
    //    data: newData
    //})
    //.done(function (data, textStatus, jqXHR) {
    //   getHighChart();
    //})
    //.fail(function (jqXHR, textStatus, errorThrown) {
    //    var result = $.parseJSON(jqXHR.responseText);
    //    sAlert(result.Message,
    //        result.ExceptionMessage + "&#13;&#10;" +
    //        result.ExceptionType + "&#13;&#10;" +
    //        result.StackTrace, "error");
    //});
    getHighChart();
}

function getHighChart() {
    getTrendExport();
    getExportByCategory($("#TrendExportStartYear").val(), $("#TrendExportEndYear").val());
    getSalesVSNonSales();
    getTotalExport();
    BigesCommoditiesCategory();

    //Highcharts.chart('container_bigest', {
    //    chart: {
    //        type: 'column'
    //    },
    //    colors: ['#ffca22', '#9dd45d', '#05beff', '#ff696a', '#c63bff'],
    //    title: {
    //        text: '5 Bigest Commodities Category'
    //    },
    //    subtitle: {
    //        text: '2019'
    //    },
    //    credits: {
    //        enabled: false
    //    },
    //    xAxis: {
    //        type: 'category'
    //    },
    //    yAxis: {
    //        title: {
    //            text: 'Total percent commodities'
    //        }

    //    },
    //    legend: {
    //        enabled: false
    //    },
    //    credits: {
    //        enabled: false
    //    },
    //    plotOptions: {
    //        series: {
    //            borderWidth: 0,
    //            dataLabels: {
    //                enabled: true,
    //                format: '{point.y:.1f}%'
    //            }
    //        }
    //    },

    //    tooltip: {
    //        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    //        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    //    },

    //    series: [
    //        {
    //            name: "Browsers",
    //            colorByPoint: true,
    //            data: [
    //                {
    //                    name: "Parts",
    //                    y: 62.74
    //                },
    //                {
    //                    name: "Machine",
    //                    y: 10.57
    //                },
    //                {
    //                    name: "Engine",
    //                    y: 7.23
    //                },
    //                {
    //                    name: "Forklift",
    //                    y: 5.58
    //                },
    //                {
    //                    name: "Miscellenious",
    //                    y: 4.02
    //                }
    //            ]
    //        }
    //    ],

    //});

}

function getTrendExport() {
    $.ajax({
        url: 'getTrendExport?startYear=' + parseInt($("#TrendExportStartYear").val()) + '&endYear=' + parseInt($("#TrendExportEndYear").val()) + '&filter=' + $("#TrendExportFilterExportType").val(),
        success: function (data) {
            var categories_yearly = [];
            var data_totExport = [];
            var data_totalPeb = [];
            var dataTotalExportSales = [];
            var dataTotalExportNonSales = [];

            $.each(data, function (i, data) {
                categories_yearly.push(data.Year);
                data_totExport.push(data.TotalExport);
                data_totalPeb.push(data.TotalPeb);
                dataTotalExportSales.push(data.TotalExportSales);
                dataTotalExportNonSales.push(data.TotalExportNonSales);
            })

            var TrendExportChart =
                Highcharts.chart('container_trend', {
                    chart: {
                        type: 'column'
                    },
                    colors: ['#FF9900', '#05beff', '#000000'],
                    title: {
                        text: 'Trend Export'
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        categories: categories_yearly,
                        crosshair: true
                    },
                    yAxis: [
                        {
                            min: 0,
                            title: {
                                text: 'Total Export Value in USD'
                            },
                            labels: {
                                formatter: function () {
                                    if (this.value > 1000) return 'USD ' + Highcharts.numberFormat(this.value / 1000, 1) + "K";  // maybe only switch if > 1000
                                    return 'USD ' + Highcharts.numberFormat(this.value, 0);
                                }
                            }
                        },
                        {
                            title: {
                                text: 'Total PEB'
                            },
                            opposite: true
                        }
                    ],
                    legend: {
                        shadow: false
                    },
                    tooltip: {
                        shared: true
                    },
                    plotOptions: {
                        column: {
                            //grouping: false,
                            //shadow: false,
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function () {
                                        getExportByCategory(this.category, this.category);
                                    }
                                }
                            }
                        }
                    },
                    series: [
                        //{
                        //    name: 'Total Export Value',
                        //    color: '#FF9900',
                        //    data: data_totExport,
                        //    tooltip: {
                        //        valuePrefix: '$',
                        //        valueSuffix: ' M'
                        //    },
                        //    pointPadding: 0.3,
                        //    pointPlacement: -0.2
                        //},
                        {
                            name: 'Total Export Value Sales',
                            data: dataTotalExportSales,
                            tooltip: {
                                valuePrefix: '$',
                                valueSuffix: ' M'
                            }
                        },
                        {
                            name: 'Total Export Value Non Sales',
                            data: dataTotalExportNonSales,
                            tooltip: {
                                valuePrefix: '$',
                                valueSuffix: ' M'
                            }
                        },
                        {
                            name: 'Total PEB',
                            data: data_totalPeb,
                            yAxis: 1
                        }
                    ]
                });
            TrendExportChart.reflow();
            $('.highcharts-xaxis-labels text').click(function () {
                getExportByCategory(this.innerHTML, this.innerHTML);
            });
        }
    });
}

function getExportByCategory(startYear, endYear) {
    $.ajax({
        url: 'getExportByCategory?startYear=' + parseInt(startYear) + '&endYear=' + parseInt(endYear),
        success: function (data) {
            var byCategory = [{
                name: 'Category',
                colorByPoint: true,
                data: []
            }];

            $.each(data, function (i, data) {
                byCategory[0].data.push({
                    name: data.Category,
                    y: data.TotalPercentage * 100
                    //sliced: true
                });
            });

            var ExportByCategoryChart = Highcharts.chart('container_trend_pie', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                colors: ['#ffca22', '#9dd45d', '#05beff', '#ff696a', '#c63bff'],
                title: {
                    text: 'Export by Category'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: byCategory
            });
            ExportByCategoryChart.reflow();
        }
    });
}

function getSalesVSNonSales() {
    $.ajax({
        url: 'getSalesVSNonSales?startYear=' + parseInt($("#SalesVSNonSalesStartYear").val()) + '&endYear=' + parseInt($("#SalesVSNonSalesEndYear").val()),
        success: function (data) {
            var startYear = parseInt($("#SalesVSNonSalesStartYear").val());
            var byExpType =
                [
                    { name: 'Sales', data: [] },
                    { name: 'Non Sales', data: [] }
                ];

            $.each(data, function (i, data) {
                byExpType[0].data.push(data.Sales);
                byExpType[1].data.push(data.NonSales);
            })

            var SalesVSNonSalesChart = Highcharts.chart('container_compare_sales', {
                colors: ['#ffca22', '#000'],
                title: {
                    text: 'Sales vs Non Sales'
                },
                yAxis: {
                    title: {
                        text: 'Total Amount'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: startYear
                    }
                },
                series: byExpType,
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });
            SalesVSNonSalesChart.reflow();
        }
    });
}



function getTotalExport() {
    $.ajax({
        url: 'getTotalExport?year=' + parseInt($("#TotalExportYear").val()),
        success: function (data) {
            var outstandingCipl = [
                { name: 'Total Invoice & Packing List', type: 'column', data: [] },
                { name: 'Total PEB', type: 'column', data: [] },
                { name: 'Outstanding', type: 'spline', data: [] }
            ];
            var x_categories = [];

            $.each(data, function (i, data) {
                x_categories.push(data.Month);
                outstandingCipl[0].data.push(data.Invoice);
                outstandingCipl[1].data.push(data.Peb);
                outstandingCipl[2].data.push(data.Outstanding);
            });

            var TotalExportChart = Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                colors: ['#ffca22', '#000'],
                title: {
                    text: 'Total Export Transaction'
                },
                subtitle: {
                    //text: 'Source: WorldClimate.com'
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: x_categories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Transaction'
                    }
                },
                //tooltip: {
                //    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                //    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                //        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                //    footerFormat: '</table>',
                //    shared: true,
                //    useHTML: true
                //},
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: outstandingCipl
            });
            TotalExportChart.reflow();
        }
    });
}

function BigesCommoditiesCategory() {
    var year = $('#date1-export-type').val();
    var exporttype = $('#slc-export-type').val();
    $.ajax({
        url: "/emcs/TotalBig5CommoditiesList",
        async: false,
        data: {
            searchId: year,
            searchName: exporttype
        },
        success: function (data) {
            var category = new Array;
            var dataChart = new Array;
            var dataSales = new Array;
            var dataNonSales = new Array;
            //$.each(data, function (index, element) {
            //    category.push({ name: element.Desc, y: element.Total });
            //});

            //update new sp by hergy
            $.each(data, function (index, element) {
                dataChart.push({ name: element.Desc, totalSales: element.TotalSales, totalNonSales: element.TotalNonSales });
            });

            dataChart = dataChart.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name
                ))
            )

            $.each(dataChart, function (index, element) {
                category.push(element.name);
            });

            $.each(dataChart, function (index, element) {
                dataSales.push(element.totalSales);
            });

            $.each(dataChart, function (index, element) {
                dataNonSales.push(element.totalNonSales);
            });

            //console.log(category);
            var big5 = Highcharts.chart('container_bigest', {
                chart: {
                    type: 'column'
                },
                colors: ['#ffca22', '#9dd45d', '#05beff', '#ff696a', '#c63bff'],
                title: {
                    text: '5 Bigest Commodities Category'
                },
                subtitle: {
                    //text: '2019'
                },
                credits: {
                    enabled: false
                },
                //xAxis: {
                //    type: 'category'
                //},
                xAxis: {
                    categories: category
                },
                yAxis: {
                    title: {
                        text: 'Total Percentage'
                    }

                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [
                    {
                        name: "Sales",
                        colorByPoint: true,
                        data: dataSales
                    },
                    {
                        name: "Non Sales",
                        colorByPoint: true,
                        data: dataNonSales
                    }
                ],

            });
            big5.reflow();
        }
    });
}