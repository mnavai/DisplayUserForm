$(document).ready(function() {
    var editRow = null;
  
    $('#save-btn').click(function() {
      var regular = /^[A-Za-z]+$/g;
      var firstName = $('#first-name').val();
      if (firstName == "" || !regular.test(firstName)) {
          window.alert('Name cannot contain spaces, numbers, or special characters.');
          return;
      }
      var lastName = $('#last-name').val();
      if(lastName == "" || !regular.test(lastName)){
        window.alert('Last name cannot contain any spaces nor numbers');
        return;
      }
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
  
          // check if edit mode is already active
          if (editRow) {
            // discard changes to previous row
            var cells = editRow.find('td');
            cells.each(function(index, cell) {
              $(cell).text($(cell).find('input').val());
            });
            editRow = null;
          }
  
          // create input fields for each cell in the row
          var cells = row.find('td');
          cells.each(function(index, cell) {
            var text = $(cell).text();
            $(cell).empty().append($('<input>').val(text));
          });
  
          // change Edit button to Save button
          $(this).text('Save');
  
          // remember which row is being edited
          editRow = row;
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
  