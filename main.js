$(document).ready(function() {
    // Handle form submission
    $("form").submit(function(event) {
      event.preventDefault();
  
      // Clear previous errors
      $(".form-group").removeClass("has-error");
      $(".help-block").remove();
  
      // Get form data
      var formData = $(this).serialize();
  
      // Send form data to the server using AJAX
      $.ajax({
        type: "POST",
        url: "search.php",
        data: formData,
        dataType: "json",
        encode: true,

        
      })
      .done(function(data) {
        if (!data.success) {
          // Handle errors
          if (data.errors.key) {
            $("#key-group").addClass("has-error");
            $("#key-group").append('<div class="help-block">' + data.errors.key + "</div>");
          }
          if (data.errors.p_status) {
            $("#p_status-group").addClass("has-error");
            $("#p_status-group").append('<div class="help-block">' + data.errors.p_status + "</div>");
          }
          if (data.errors.p_type) {
            $("#p_type-group").addClass("has-error");
            $("#p_type-group").append('<div class="help-block">' + data.errors.p_type + "</div>");
          }
          if (data.errors.location) {
            $("#location-group").addClass("has-error");
            $("#location-group").append('<div class="help-block">' + data.errors.location + "</div>");
          }
        } else {
          // Handle successful form submission
          $("form").html('<div class="alert alert-success">' + data.message + "</div>");
        }
      })
      .fail(function(data) {
        // Handle server connection errors
        $("form").html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
        
      });
    });
  });
  
  