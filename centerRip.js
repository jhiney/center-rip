var arr = [];
var expandedArr = [];
var semiFinalArr = [];
var finalArr = [];

document.getElementById(document.getElementsByTagName("button")[1].id).click();
setTimeout(function () {
	var rows = document.getElementsByClassName("ant-table-row ant-table-row-level-0");
	for (var i = 0; i < rows.length; i++) rows[i].click();
	for (var i = 0; i < rows.length; i++) {
		arr.push({
			dataKey: rows[i].dataset.rowKey,
			vendor: rows[i].cells[2].innerText,
			employee: rows[i].cells[3].innerText,
			amount: rows[i].cells[5].innerText
		});
	}
	var expandedRows = document.getElementsByClassName(
		"ant-table-expanded-row ant-table-expanded-row-level-1"
	);
	for (var i = 0; i < rows.length; i++) {
		if (expandedRows[i].dataset.rowKey.substring(0, 2).indexOf("-") == -1) {
			expandedArr.push({
				dataKey: expandedRows[i].dataset.rowKey.substring(0, 2),
				text: expandedRows[i].cells[1].innerText
			});
		} else {
			expandedArr.push({
				dataKey: expandedRows[i].dataset.rowKey.substring(0, 1),
				text: expandedRows[i].cells[1].innerText
			});
		}
	}

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < expandedArr.length; j++) {
			if (arr[i].dataKey == expandedArr[j].dataKey) {
				semiFinalArr.push({
					vendor: arr[i].vendor,
					employee: arr[i].employee.substring(3),
					amount: arr[i].amount,
					text: expandedArr[j].text
				});
			}
		}
	}

	for (var i = 0; i < semiFinalArr.length; i++) {
		var firstFilter = semiFinalArr[i].text
			.substring(0, semiFinalArr[i].text.indexOf("\nMerchant"))
			.replaceAll("\n", " ");

		var transaction = firstFilter.substring(0, firstFilter.indexOf(",") + 6);
		var settle = firstFilter.substring(firstFilter.indexOf(",") + 7);

		finalArr.push({
			vendor: arr[i].vendor,
			employee: arr[i].employee.substring(3),
			amount: arr[i].amount,
			transactionDate: transaction.replaceAll("Transaction Date ", ""),
			settleDate: settle.replaceAll("Settle Date ", "")
		});
	}
}, 4000);
