function notify_success(message) {
  $('#notification_box').css('background-color', '#5cb85c');
  $('#notification_box').text(message);
  $('#notification_box').fadeIn('slow').promise().done(() => {
    setTimeout(() => { $('#notification_box').fadeOut('slow'); }, 2000);
  });
}

function notify_failure(message) {
  $('#notification_box').css('background-color', '#c9302c');
  $('#notification_box').text(message);
  $('#notification_box').fadeIn('slow').promise().done(() => {
    setTimeout(() => { $('#notification_box').fadeOut('slow'); }, 2000);
  });
}
$(document).ready(function () {
  // Check if we returned from a submit.
  var queryDict = {}
  location.search.substr(1).split('&').forEach(function(item) {queryDict[item.split('=')[0]] = item.split('=')[1]})

  if ('success' in queryDict) {
    if (queryDict.success == 'true') {
      notify_success('Crime data insertion successful.');
    } else {
      notify_failure('Crime data insertion failed.');
    }
  }
  var location_active = false;
  // Get the modal
  var overlay = document.getElementById('overlay');
  var modal = document.getElementById('location_getter');

  $('#location_activate').click((event) => {
    event.preventDefault();
    overlay.style.display = 'block';
    modal.style.display = 'block';
  });
  $('#overlay').click(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
  $('#close_cross').click(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
  $('#datetimepicker1').datetimepicker({
    format: 'DD-MM-YYYY HH:mm',
  });
});
