const firebaseConfig = {
    apiKey: "AIzaSyAnHMnKhR4M9VltIm-wx_rg8cr1oJ48a_0",
    authDomain: "formulary-data.firebaseapp.com",
    projectId: "formulary-data",
    storageBucket: "formulary-data.appspot.com",
    messagingSenderId: "718474170283",
    appId: "1:718474170283:web:56a4026110214b954cccee",
    measurementId: "G-Z4CTR50CQP"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()  //event.preventDefault() --> Lo que haces es que no limpie el formulario cuando escucha el submit

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){  //trim --> Borra los espacio de los costados 
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')   // Agrega una clase para poner el mensaje error en color en el CSS
    }else {
        errorNombre.textContent = ''    
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electrónico 
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (emailPattern.test(emailEntrada.value)) {   //Si pasa el test es True sino es False 
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }else {
        emailError.textContent = 'Por favor, introducí un mail valido'
        emailError.classList.add('error-message')
    }

    //Validar la contraseña
    let passwordEntrada = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')
    let passwordPattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    if (passwordPattern.test(passwordEntrada.value)) {   
        passwordError.textContent = ''
        passwordError.classList.remove('error-message')
    }else {
        passwordError.textContent = 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.'
        passwordError.classList.add('error-message')
    }

    //Si todos los campos son válidos eviar formulario
    if(!errorNombre.textContent && !emailError.textContent && !passwordError.textContent){  //Si los tres son null (basicamente si no poseen error)
       
        //BACKEND QUE RECIBA LA INFO
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: passwordEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset()
        })
        .catch((error) => {
            alert(error)
        });
    // -------------------------------------------------------------
      
    }
});