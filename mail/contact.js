document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successDiv = document.getElementById("success");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
        const sendMessageButton = document.getElementById("sendMessageButton");
        sendMessageButton.disabled = true;

        const data = {
            access_key: "257fb1f0-24e6-4112-9a34-ac4b2d3a5b2d",
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                successDiv.innerHTML = `
                    <div class='alert alert-success'>
                        <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                        <strong>Your message has been sent. </strong>
                    </div>
                `;
                form.reset();
            } else {
                throw new Error(json.message || 'Form submission failed');
            }
        })
        .catch(error => {
            successDiv.innerHTML = `
                <div class='alert alert-danger'>
                    <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                    <strong>Sorry ${name}, it seems that our mail server is not responding. Please try again later!</strong>
                </div>
            `;
            console.error("Error:", error);
            form.reset();
        })
        .finally(() => {
            setTimeout(() => {
                sendMessageButton.disabled = false;
            }, 1000);
        });
    });

    document.getElementById('name').addEventListener('focus', function () {
        successDiv.innerHTML = '';
    });
});
