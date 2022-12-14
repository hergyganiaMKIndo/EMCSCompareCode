
$(function () {

	$(".js-states").select2({ width: 'resolve', dropdownAutoWidth: 'false' });
	var width = $(".select2-container--default").width() - 5;
	$(".select2-container--default").css('width', width + 'px');

	$('.nav-tabs a').click(function (e) {
		$(".nav-pills").each(function () {
			$('li').removeClass('active');
		});

		$(".content-pane").each(function () {
			//console.log("clearing " + $(this).attr("id") + " tab");
			$(this).empty();
		});
	});

	$('.nav-pills a').click(function (e) {
		e.preventDefault()
		var tabID = $(this).attr("href").substr(1);
		$(".content-message").html("<div style=\"text-align:center;color:red\"><img src='/Content/images/ajax-loading.gif' style=\"padding-right:3px\">...Loading page...</div>");
		

		//.tab-pane
		$(".content-pane").each(function () {
			$(this).empty();
		});

		$.ajax({
			type: "POST",
			url: controller + tabID,
			data: {freight: freight},
			dataType: "html",
			async: false,
			cache: false,
			beforeSend: function () {
				enableLink(false);
			},
			success: function (data) {
				$("#" + tabID).empty();
				$("#" + tabID).html(data);

				if (typeof window.rebindCSS == "undefined") {
					alert("rebindCSS")
					$.getScript("/scripts/script.js", function () {
						//alert('ttn');
					});
				}
				else {
					rebindCSS();
				}

				$(".content-message").empty();
			}
		});

		//$("#" + tabID).load(controller + tabID,
		//	function (responseTxt, statusTxt, xhr) {
		//		if (statusTxt == 'success') {
		//		}
		//	});

		$(this).tab('show');;
	});

	
	$.myApp = {
		sessionSaverUrl: '/vetting-process/KeepSessionAlive',
		sessionSaverInterval: (9000 * 5), //(6000 * 5),
		sessionSaver: function () {
			window.status = "Saving session...";
			$.post(
				$.myApp.sessionSaverUrl,
				function (d) {
					window.status = 'Session saved ' + d;
				}
			);
			setTimeout($.myApp.sessionSaver, $.myApp.sessionSaverInterval);
		}
	};

	setTimeout($.myApp.sessionSaver, $.myApp.sessionSaverInterval);
});

