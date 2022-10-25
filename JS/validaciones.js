export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML ='';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo "Nombre" no puede estar vacío'
    },
    email:{
        valueMissing: 'El campo "Email" no puede estar vacío',
        typeMismatch: 'El correo no es validio'
    },
    password:{
        valueMissing: 'El campo "Contraseña" no puede estar vacío',
        patternMismatch: 'La contraseña debe tener al menos 4 caracteres, no más de 8 caracteres y debe incluir al menos una letra mayúscula, una letra minúscula y un dígito numérico y sin espacios.'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
    },     
    numero: { 
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
    },
    direccion: {
        valueMissing: 'Este campo" no puede estar vacío',
        patternMismatch: 'La direccion debe contener entre 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe contener entre 10 a 40 caracteres'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El estado debe contener entre 10 a 40 caracteres'
    },  
}


const validadores ={
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error]
        }

    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date (input.value);
    let mensaje = '';
   if  (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad';
   };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    // console.log(diferenciaFechas);
    return diferenciaFechas <= fechaActual;
}