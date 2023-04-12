$(document).ready(function() {
    var editRow = null;
  
    $('#save-btn').click(function() {
      var regular = /^[A-Za-z]+$/g;
      var firstName = $('#first-name').val();
      var lastName = $('#last-name').val();
      if (firstName == "" || !regular.test(firstName)) {
        window.alert('Name cannot contain spaces, numbers, or special characters.');
        return;
      }
      //   if (lastName == "" || !regular.test(lastName)) {
      //     window.alert('Last name cannot contain spaces, numbers, or special characters.');
      //     return;
      //   }
  
      var dob = $('#dob').val();
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        window.alert('You must be at least 18 years old to register');
        return;
      }
  
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
          editRow.find('.save-btn').remove(); // remove the save button
          editRow = null;
        }
  
        // create input fields for each cell in the row
        var cells = row.find('td');
        cells.each(function(index, cell) {
          var text = $(cell).text();
          $(cell).empty().append($('<input>').val(text));
        });
  
        // change Edit button to Save button
        var saveBtn = $('<button>').text('Save').addClass('save-btn');
        saveBtn.click(function() {
          var cells = row.find('td');
          cells.each(function(index, cell) {
            var input = $(cell).find('input');
            $(cell).text(input.val());
          });
          editRow.find('.save-btn').remove(); // remove the save button
          editRow = null;
        });
        $(this).after(saveBtn);
  
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
  
      // clear input fields
      $('#first-name').val('');
      $('#last-name').val('');
      $('#dob').val('');
    });
  
    $('#delete-all-btn').click(function() {
      $('#user-table tbody').empty();
    });
  });
  