// Function to send mail using emailjs
function SendMail() {
    // Get values from form inputs
    var params = {
        from_name: document.getElementById("fullname").value,
        email_id: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    // Send email using emailjs
    emailjs.send("service_lw50x6m", "template_naxca8e", params)
        .then(function (res) {
            // Display success alert
            alert("Success" + res.status);
        });
}
