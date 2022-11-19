function sendMail() {
    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("pwd").value,
    };
  
    const serviceID = "service_nrtev19";
    const templateID = "template_dvrj6oc";
  
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("pwd").value = "";
          console.log(res);
          alert("Register Successfully!!");
          window.location.href = "verify_email.html";
  
      })
      .catch(err=>console.log(err));
  
  }
  

//const form = document.getElementById("form");
const mailid = document.getElementById("email");
const username = document.getElementById("name");
const password = document.getElementById("pwd");
const cpassword = document.getElementById("cpwd");
const valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//const checkbox = document.getElementById("checkbox");
var a = 1;
form.addEventListener('submit', e => {
    e.preventDefault();
    checkinput();
});

function checkinput() {
    const mailinput = mailid.value.trim();
    const usernameinput = username.value.trim();
    const passwordinput = password.value.trim();
    const cpasswordinput = cpassword.value.trim();
    //const checkboxinput = checkbox;
    var array = JSON.parse(localStorage.getItem("Details"));

    if (mailinput == "") {
        setError(mailid, "Plz fill the mail id");
    } else if (!valid.test(mailinput)) {
        setError(mailid, "Plz enter the valid mail id");
    } else {
        setSuccess(mailid, "");
        if (usernameinput == "") {
            setError(username, "Plz fill the user name");
        } else {
            setSuccess(username, "");
            if (passwordinput == "") {
                setError(password, "Plz fill the password");
            } else {
                setSuccess(password, "");
                if (cpasswordinput == "") {
                    setError(cpassword, "Plz fill the confirm password");
                } else {
                    setSuccess(cpassword, "");
                    if (passwordinput != cpasswordinput) {
                        setError(cpassword, "Passwords must be same");
                    } else {
                        setSuccess(cpassword, "");
                        //window.location.assign("www.google.com");
                        if (!checkboxinput.checked) {
                            setError(checkbox, "Plz accept the terms")
                        } else {
                            setSuccess(checkbox, "");
                            //window.location.assign("www.google.com");
                            if (array == null) {
                                let array = [];
                                let obj = {
                                    email: mailinput,
                                    username: usernameinput,
                                    password: passwordinput,
                                    passwords: cpasswordinput
                                };
                                array.push(obj);
                                localStorage.setItem("Details", JSON.stringify(array));
                                alert("Register Successfullly");
                              

                            } else {
                                var n = array.length;
                                for (i = 0; i < n; i++) {
                                    if (mailinput === array[i].email ||  mailinput === array[i].username) {
                                        a = 0;
                                        console.log(array[i].email);
                                        console.log("1");
                                        break
                                    }
                                }
                                if (a == 1) {

                                    let obj = {
                                        email: mailinput,
                                        username: usernameinput,
                                        password: passwordinput,
                                        passwords: cpasswordinput
                                    };
                                    array.push(obj)
                                    console.log(array);
                                    localStorage.setItem("Details", JSON.stringify(array));
                                    alert("Register Successfully");

                                }
                                else 
                                {
                                    alert("Email Id already exist");
                                }

                            }
                        }
                    }
                }
            }
            
        }
    }
    function setError(input, message) {
        const formhead = input.parentElement;
        const paragraph = formhead.querySelector("p");
        formhead.className = "form-group.error"; //error css
        paragraph.innerText = message;
    }

    function setSuccess(input, message) {
        const formhead = input.parentElement;
        const paragraph = formhead.querySelector("p");
        formhead.classname = "form-group success";
        paragraph.innerText = message;
    }
}