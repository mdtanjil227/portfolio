emailjs.init("D-gXaRFnF6UwGrnpi");

const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_ke0atbd", "template_9gn0j8h", params)
    .then(function () {
        alert("Message sent successfully!");
        form.reset();
    }, function (error) {
        alert("Failed to send message.");
        console.log(error);
    });
});