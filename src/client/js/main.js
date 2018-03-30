function notify(message) {
  $('#notification_box').text(message);
  $('#notification_box').fadeIn('slow').promise().done(() => {
    setTimeout(() => { $('#notification_box').fadeOut('slow'); }, 2000);
  });
}
$(document).ready(function () {
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
