const doctor = {
    nombre: undefined,
    apellido: undefined,
    cedula: undefined,
    consultorio: undefined,
    email: undefined,
    especialidad: undefined
};

const doctores = CargarDatos("doctores");

// Obtener referencia al formulario Doctores
var formularioDoctores = document.getElementById("frmDoctores");

// Agregar evento de envío al formulario
formularioDoctores.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Validar los campos del formulario Doctores:
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

function MostrarDatosDoctores() {
    clearBox("listadoDoctores");

    var myTableDiv = document.getElementById("listadoDoctores");

    var table = document.createElement('TABLE');
    table.id = "table";
    //table.border = '1';
    //table.classList.add("table"); 

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var trh = document.createElement('TR');
    tableBody.appendChild(trh);
    AdicionarCampoEncabezado("Nombre", trh);
    AdicionarCampoEncabezado("Apellido", trh);
    AdicionarCampoEncabezado("Cédula", trh);
    AdicionarCampoEncabezado("Consultorio", trh);
    AdicionarCampoEncabezado("Email", trh);
    AdicionarCampoEncabezado("Especialidad", trh);

    doctores.forEach(doctor => {
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

MostrarDatosDoctores();


// Expresiones regulares para validación
var soloLetrasExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
var soloNumerosExp = /^\d+$/;
var emailExp = /^\S+@\S+\.\S+$/;

function EscribirArchivo(tipoPersona, datos) {
    localStorage.setItem(tipoPersona, JSON.stringify(datos))
}
//Leyendo del LocalStorage y Pasando a JSON:
function CargarDatos(tipoPersona) {
    const datos = localStorage.getItem(tipoPersona)

    if (!datos) {
        return []
    }

    return JSON.parse(datos)
}

function AdicionarCampo(valor, tr) {
    var td = document.createElement('TD');
    td.appendChild(document.createTextNode(valor));
    tr.appendChild(td);
}

function AdicionarCampoEncabezado(valor, tr) {
    var th = document.createElement('TH');
    th.appendChild(document.createTextNode(valor));
    tr.appendChild(th);
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function LeerArchivoDoctores() {
    const filename = '../doctores.json';

    fetch(filename)
        .then(resultado => resultado.json())
        .then(datos => {
            console.log(datos)
            doctores = datos
        })
        .catch(error => console.error(error));
}

//LeerArchivoDoctores();

var table = document.getElementById('table');
var selected = table.getElementsByClassName('active-row');
table.onclick = highlight;

function highlight(e) {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'active-row';
}

function fnselect() {
    var element = document.querySelectorAll('.active-row');
    if (element[0] !== undefined) { //it must be selected
        alert(element[0].children[0].firstChild.data);
    }
}