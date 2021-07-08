const $forms = document.querySelectorAll(".signup-form");

const getTemplate = () => {
    return fetch("./template.html")
    .then( (response) => response.text() );
}

const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
        console.log(results);
        document.getElementById("email").value = ""
        alert("E-mail send!!!")
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("email").value = ""
        alert("Send failed")
      });
  };
  

// function sendEmail(myVariable){
//     myVariable.preventDefault();
//     const email = myVariable.target.querySelector("input").value;
//     // console.log(email);

// }

const sendEmail = (myVar) => {
    myVar.preventDefault();
    const email = myVar.target.querySelector("input").value;
    getTemplate()
    .then((template) => {
        // console.log(response);
        sendEmailToApi(email, template);
    })
    .catch((error) => {
        console.log(error, "Error al obtener el template");
    })
}

for(let i = 0; i < $forms.length; i++){
    // console.log($forms[i]);
    $forms[i].addEventListener("submit", sendEmail);
}
