$(document).ready(function() {
	var editRow = null;

	$('#save-btn').click(function() {
		var firstName = $('#first-name').val();
		var lastName = $('#last-name').val();
		var dob = $('#dob').val();

		if (editRow) {
				// update existing row
				editRow.find('td').eq(0).text(firstName);
				editRow.find('td').eq(1).text(lastName);
				editRow.find('td').eq(2).text(dob);
				editRow = null;
			} else {
				// create a new row in the table
				var newRow = $('<tr>');
				newRow.append($('<td>').text(firstName));
				newRow.append($('<td>').text(lastName));
				newRow.append($('<td>').text(dob));

				// add edit button to new row
				var editBtn = $('<button>').text('Edit');
				editBtn.click(function() {
					var row = $(this).closest('tr');
					var firstName = row.find('td').eq(0).text();
					var lastName = row.find('td').eq(1).text();
					var dob = row.find('td').eq(2).text();

					$('#first-name').val(firstName);
					$('#last-name').val(lastName);
					$('#dob').val(dob);

					editRow = row;
					row.remove();
				});
				newRow.append($('<td>').append(editBtn));

				// add delete button to new row
				var deleteBtn = $('<button>').text('Delete');
				deleteBtn.click(function() {
					$(this).closest('tr').remove();
				});
				newRow.append($('<td>').append(deleteBtn));

				$('#user-table').append(newRow);
			}

			// clear input fields
			$('#first-name').val('');
			$('#last-name').val('');
			$('#dob').val('');
	});

	$('#delete-all-btn').click(function() {
		$('#user-table tbody').empty();
	});
});
