const mailid = document.getElementById("email");
const password = document.getElementById("pwd");

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInput();
});

function checkInput() {
    const mailinput = mailid.value.trim();
    const passwordinput = password.value.trim();
    // const valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var array = JSON.parse(localStorage.getItem("Details")); // Stored SignUp Details
    var notvaliduser = 0, key = 0;

    var n = array.length;



    if (mailinput == "") {
        setError(mailid, "Enter the mail address or User Name");

    } else {
        setSuccess(mailid, "");
        if (passwordinput == "") {
            setError(password, "Plz enter the password");
        } else {
            setSuccess(password, "");

            for (var i = 0; i < n; i++) {
                if (mailinput == array[i].email) {

                    key = 1;
                    if (passwordinput == array[i].password) {

                        setSuccess(password, "");
                        alert("Login Successfully");
                        window.location.href = "upload.html";
                        break

                    } else {
                        setError(password, "Invalid passwordd");
                    }
                } else if (mailinput == array[i].username) {
                    key = 1;
                    if (passwordinput == array[i].password) {
                        alert("Login Successfully");
                        window.location.href = "upload.html";
                        break
                    } else {
                        setError(password, "Invalid Passsword");
                    }
                }
            }
            if (key == 0) {
                setError(mailid, "Invalid mail or Username")
            }
            else {
                setSuccess(mailid, "")
            }

        }
    }


    function setError(input, message) {
        const formhead = input.parentElement;
        const paragraph = formhead.querySelector("p");
        formhead.className = "form-group.error";
        paragraph.innerText = message;
    }

    function setSuccess(input, message) {
        const formhead = input.parentElement;
        const paragraph = formhead.querySelector("p");
        formhead.className = "form-group.success"; //error css
        paragraph.innerText = message;
    }

}