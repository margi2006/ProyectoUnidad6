const paciente = {
    nombre: undefined,
    apellido: undefined,
    cedula: undefined,
    edad: undefined,
    telefono: undefined,
    especialidad: undefined
};

const pacientes = CargarDatos("pacientes");

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

function MostrarDatosPacientes() {
    clearBox("listadoPacientes");

    var myTableDiv = document.getElementById("listadoPacientes");

    var table = document.createElement('TABLE');
    table.id = "table";
    //table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var trh = document.createElement('TR');
    tableBody.appendChild(trh);
    AdicionarCampoEncabezado("Nombre", trh);
    AdicionarCampoEncabezado("Apellido", trh);
    AdicionarCampoEncabezado("Cédula", trh);
    AdicionarCampoEncabezado("Edad", trh);
    AdicionarCampoEncabezado("Teléfono", trh);
    AdicionarCampoEncabezado("Especialidad", trh);


    pacientes.forEach(paciente => {
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

MostrarDatosPacientes()

/*
    Pasar a una librería
 */
// Expresiones regulares para validación
var soloLetrasExp = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
var soloNumerosExp = /^\d+$/;
var emailExp = /^\S+@\S+\.\S+$/;

function EscribirArchivo(tipoPersona, datos) {
    localStorage.setItem(tipoPersona, JSON.stringify(datos))
}

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