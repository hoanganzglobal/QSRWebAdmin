function searchOrder() {
	var input, filter, table, tr, td, cell, i, j, txtValue;
	input = document.getElementById("txtSearch");
	filter = input.value.toUpperCase();
	table = document.getElementById("eg2-0");
	tr = table.getElementsByTagName("tr");
	if (filter.length >= 3 || filter.length == 0) {
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td");
			for (j = 0; j < td.length; j++) {
				cell = tr[i].getElementsByTagName("td")[j];
				if (cell) {
					txtValue = cell.textContent || cell.innerText || cell.innerHTML;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = ""; 
						break;
					} else {
						tr[i].style.display = "none";
					}
				}
			}       
		}
	}
}

function sortTable(indexColumn, elemTableID) {
	var table, tbody, rows, th, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById(elemTableID);
	tbody = table.tBodies[0];
	th = document.getElementsByTagName("th")[indexColumn];
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc";
	while (switching) {
		switching = false;
		rows = tbody.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[indexColumn];
			y = rows[i + 1].getElementsByTagName("TD")[indexColumn];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}