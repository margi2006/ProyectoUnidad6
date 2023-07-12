const doctor = {
  nombre: undefined,
  apellido: undefined,
  cedula: undefined,
  consultorio: undefined,
  email: undefined,
  especialidad: undefined
};

const paciente = {
  nombre: undefined,
  apellido: undefined,
  cedula: undefined,
  edad: undefined,
  telefono: undefined,
  especialidad: undefined
};

const doctores = CargarDatos("doctores");
const pacientes = CargarDatos("pacientes");

// Expresiones regulares para validación
var soloLetrasExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
var soloNumerosExp = /^\d+$/;
var emailExp = /^\S+@\S+\.\S+$/;

// Obtener referencia al formulario Doctores
var formularioDoctores = document.getElementById("frmDoctores");

// Agregar evento de envío al formulario
formularioDoctores.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Validar los campos del formulario Doctores
  doctor.nombre = document.getElementById("nombre").value;
  doctor.apellido = document.getElementById("apellido").value;
  doctor.cedula = document.getElementById("cedula").value;
  doctor.consultorio = document.getElementById("consultorio").value;
  doctor.email = document.getElementById("email").value;
  doctor.especialidad = document.getElementById("especialidad").value;

  if (!soloLetrasExp.test(doctor.nombre)) {
    alert("El campo Nombre solo debe contener letras y espacios.");
    return;
  }

  if (!soloLetrasExp.test(doctor.apellido)) {
    alert("El campo Apellido solo debe contener letras y espacios.");
    return;
  }

  if (!soloNumerosExp.test(doctor.cedula)) {
    alert("El campo Documento de Identidad No debe contener solo números.");
    return;
  }

  if (consultorio && !soloNumerosExp.test(doctor.consultorio)) {
    alert("El campo Consultorio debe contener solo números.");
    return;
  }

  if (!emailExp.test(doctor.email)) {
    alert("El campo Email no tiene un formato válido.");
    return;
  }

  var registro = {
    nombre: doctor.nombre,
    apellido: doctor.apellido,
    cedula: doctor.cedula,
    consultorio: doctor.consultorio,
    email: doctor.email,
    especialidad: doctor.especialidad
  };
  
  doctores.push(registro);
  EscribirArchivo("doctores", doctores)

  formularioDoctores.reset();
  MostrarDatosDoctores()
});

// Obtener referencia al formulario Pacientes
var formularioPacientes = document.getElementById("frmPacientes");
var btnSubmitPacientes = document.getElementById("btnSubmitPa");

// Agregar evento de envío al formulario
btnSubmitPacientes.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  paciente.nombre = document.getElementById("nombre_U").value;
  paciente.apellido = document.getElementById("apellido_U").value;
  paciente.cedula = document.getElementById("cedula_U").value;
  paciente.edad = document.getElementById("edad_U").value;
  paciente.telefono = document.getElementById("telefono_U").value;
  paciente.especialidad = document.getElementById("especialidad_U").value;

  if (!soloLetrasExp.test(paciente.nombre)) {
    alert("El campo Nombre (Paciente) solo debe contener letras y espacios.");
    return;
  }

  if (!soloLetrasExp.test(paciente.apellido)) {
    alert("El campo Apellido (Paciente) solo debe contener letras y espacios.");
    return;
  }

  if (!soloNumerosExp.test(paciente.cedula)) {
    alert("El campo Documento de Identidad No (Paciente) debe contener solo números.");
    return;
  }

  if (!soloNumerosExp.test(paciente.edad)) {
    alert("El campo Edad debe contener solo números.");
    return;
  }

  if (!soloNumerosExp.test(paciente.telefono)) {
    alert("El campo Teléfono debe contener solo números.");
    return;
  }

  var registro = {
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    cedula: paciente.cedula,
    edad: paciente.edad,
    telefono: paciente.telefono,
    especialidad: paciente.especialidad
  };

  pacientes.push(registro);
  EscribirArchivo("pacientes", pacientes)

  formularioPacientes.reset();
  MostrarDatosPacientes()
});

//------------------------------------------------------------------------------------------------------
/* 4. La información capturada en los formularios se debe almacenar en un Objeto que luego se pase
a un JSON y guarde el archivo JSON*/




//doctores.push(doctor);

/*
const doctores ='{["nombre" : "Juan Carlos","apellido":"Vasquez","cedula":123456, "consultorio": 1, "email": "juan@micorreo.com","especialidad": "Medicina general",
"nombre" : "Marcos","apellido":"Peralta","cedula":456, "consultorio": 2, "email": "marcos@micorreo.com","especialidad": "Cardiologia",
"nombre" : "Rosa","apellido":"Espinoza","cedula":789, "consultorio": 3, "email": "rosa@micorreo.com","especialidad": "Medicina interna",
"nombre" : "Carmén","apellido":"Ortega","cedula":623, "consultorio": 4, "email": "carmen@micorreo.com","especialidad": "Dermatologia",
"nombre" : "Dario","apellido":"Daza","cedula":861, "consultorio": 5, "email": "dario@micorreo.com","especialidad": "Rehabilitación física",
"nombre" : "Luis Carlos","apellido":"Rodriguez","cedula":635, "consultorio": 6, "email": "luisCarlos@micorreo.com","especialidad": "Psicología",
"nombre" : "Santiago","apellido":"Rueda","cedula":276, "consultorio": 7, "email": "santiago@micorreo.com","especialidad": "Odontología",
"nombre" : "Alejandro","apellido":"Rojas","cedula":713, "consultorio": 8, "email": "alejandro@micorreo.com","especialidad": "Radiología",
]}';
*/

//doctores.push(Usuario)
//let jsonDoctor = JSON.stringify(doctores)
//console.log(jsonDoctor)

/*let miobjeto01 = {
minumero : 12,
mistring : "Hola Mundo JavaScript",
mibooleano : true,
}
fs.writeFile("./arch05c.txt",JSON.stringify(miobjeto01), function (err){
if(err){
throw new Error(err)
}
console.log("Archivo actualizado exitosamente")
})*/

function EscribirArchivo(tipoPersona, datos) {
   localStorage.setItem(tipoPersona, JSON.stringify(datos)) 
}

function CargarDatos(tipoPersona){
  const datos = localStorage.getItem(tipoPersona)

  if (!datos){
    return []
  }

  return JSON.parse(datos)
}

function MostrarDatosDoctores(){
  clearBox("listadoDoctores"); 

  var myTableDiv = document.getElementById("listadoDoctores");

  var table = document.createElement('TABLE');
  table.border = '1';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  doctores.forEach(doctor =>{
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    AdicionarCampo(doctor.nombre, tr);
    AdicionarCampo(doctor.apellido, tr);
    AdicionarCampo(doctor.cedula, tr);
    AdicionarCampo(doctor.consultorio, tr);
    AdicionarCampo(doctor.email, tr);
    AdicionarCampo(doctor.especialidad, tr);
  });

  myTableDiv.appendChild(table);  
}

function AdicionarCampo(valor, tr) {
  var td = document.createElement('TD');
  td.appendChild(document.createTextNode(valor));
  tr.appendChild(td);
}

function MostrarDatosPacientes(){
  clearBox("listadoPacientes");

  var myTableDiv = document.getElementById("listadoPacientes");

  var table = document.createElement('TABLE');
  table.border = '1';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  pacientes.forEach(paciente =>{
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    AdicionarCampo(paciente.nombre, tr);
    AdicionarCampo(paciente.apellido, tr);
    AdicionarCampo(paciente.cedula, tr);
    AdicionarCampo(paciente.edad, tr);
    AdicionarCampo(paciente.telefono, tr);
    AdicionarCampo(paciente.especialidad, tr);
  });

  myTableDiv.appendChild(table);  
}

function clearBox(elementID) {
  var div = document.getElementById(elementID);

  while (div.firstChild) {
      div.removeChild(div.firstChild);
  }
}

MostrarDatosDoctores()
MostrarDatosPacientes()
