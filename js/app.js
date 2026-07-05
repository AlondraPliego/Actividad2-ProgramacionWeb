function validarLogin() {
    const correo = document.getElementById("correoLogin").value;
    const password = document.getElementById("passwordLogin").value;
    const correoValido = validarCorreo(correo);
    const passwordValida = validarPassword(password);
    let mensajeErrorL = document.getElementById("errorCorreoLogin");
    let mensajeErrorP = document.getElementById("errorPasswordLogin");
    let mensajeExito = document.getElementById("exitoLogin");
    mensajeErrorL.textContent = "";
    mensajeErrorP.textContent = "";
    mensajeExito.textContent = "";
    if (correo === "" || password === "") {
        mensajeErrorP.textContent = "El campo no puede estar vacío.";
        document.getElementById("correoLogin").focus();
        return;
    }
    if (correoValido === false) {
        mensajeErrorL.textContent = "Correo inválido.";
        return;
    }
    if (passwordValida === false) {
        mensajeErrorP.textContent = "Contraseña insegura (min 8, mayúscula, minúscula, número, símbolo)";
        return;
    }
    mensajeExito.textContent = "¡Login exitoso!";
    window.location.href = "index.html";
}

/* Datos Personales */
function guardarDatos() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let mensajeErrorN = document.getElementById("errorNombre");
    let mensajeErrorT = document.getElementById("errorTelefono");
    let mensajeErrorF = document.getElementById("errorFecha");
    mensajeErrorN.textContent = "";
    mensajeErrorT.textContent = "";
    mensajeErrorF.textContent = "";
    let valido = true;
    if (nombre === "") {
        mensajeErrorN.textContent = "El campo no puede estar vacío.";
        document.getElementById("nombre").focus();
        return;
    }
    if (telefono === "") {
        mensajeErrorT.textContent = "El campo no puede estar vacío.";
        document.getElementById("telefono").focus();
        return;
    }
    if (fechaNacimiento === "") {
        mensajeErrorF.textContent = "El campo no puede estar vacío.";
        document.getElementById("fechaNacimiento").focus();
        return;
    }
    if (!soloLetras(nombre)) {
        document.getElementById("errorNombre").textContent = "Solo se permiten letras";
        valido = false;
    } else {
        document.getElementById("errorNombre").textContent = "";
    }
    if (!validarLongitud(telefono, 10)) {
        document.getElementById("errorTelefono").textContent = "El telefono debe de tener 10 digitos";
        valido = false;
    } else {
        document.getElementById("errorTelefono").textContent = "";
    }
    document.getElementById("errorFecha").textContent = "";

    if (valido) {
        const edad = calcularEdad(fechaNacimiento);
        const mayor = esMayorDeEdad(fechaNacimiento);
        document.getElementById("nombre-guardado").textContent = "Nombre: " + nombre;
        document.getElementById("telefono-guardado").textContent = "Teléfono: " + telefono;
        document.getElementById("edad-calculada").textContent = "Edad: " + edad + " años";
        document.getElementById("edad-validacion").textContent = mayor ? "Es mayor de edad" : "Es menor de edad";
        document.getElementById("modal").classList.remove("oculto");
    }
}

function cerrarModal() {
    document.getElementById("modal").classList.add("oculto");
}

/*Estandarizar receta*/
let ingredientes = [];
function agregarIngrediente() {
    let nombreInput = document.getElementById("nombreIngrediente");
    let cantidadInput = document.getElementById("cantidadIngrediente");
    let mensajeError = document.getElementById("errorIngrediente");
    let nombre = nombreInput.value.trim();
    let cantidad = cantidadInput.value.trim();
    mensajeError.textContent = "";
    if (nombre === "" || cantidad === "") {
        mensajeError.textContent = "Ambos campos son obligatorios.";
        return;
    }
    let cantidadNum = Number(cantidad);
    if (isNaN(cantidadNum)) {
        mensajeError.textContent = "La cantidad debe ser un número válido.";
        return;
    }
    if (cantidadNum <= 0) {
        mensajeError.textContent = "La cantidad debe ser mayor a cero.";
        cantidadInput.focus();
        return;
    }
    let ingrediente = {
        nombre: nombre,
        cantidad: cantidadNum
    };
    ingredientes.push(ingrediente);
    let item = document.createElement("li");
    item.textContent = cantidadNum + " - " + nombre;
    document.getElementById("listaIngredientes").appendChild(item);
    nombreInput.value = "";
    cantidadInput.value = "";
    mensajeError.textContent = "";
    nombreInput.focus();
}

function calcularEscala() {
    const porcionesOriginales = parseFloat(document.getElementById("porcionesOriginales").value);
    const porcionesDeseadas = parseFloat(document.getElementById("porcionesDeseadas").value);
    const resultado = document.getElementById("resultadoEscala");
    const mensajeError = document.getElementById("errorEscala");
    resultado.innerHTML = "";
    mensajeError.textContent = "";
    if (ingredientes.length === 0) {
        mensajeError.textContent = "Necesitas agregar al menos un ingrediente antes de calcular.";
        return;
    }
    if (isNaN(porcionesOriginales) || isNaN(porcionesDeseadas)) {
        mensajeError.textContent = "Debes indicar las porciones originales y deseadas.";
        return;
    }
    document.getElementById("resultadoER").classList.remove("oculto");
    ingredientes.forEach((ingrediente) => {
        const nuevaCantidad = escalarReceta(ingrediente.cantidad, porcionesOriginales, porcionesDeseadas);
        const item = document.createElement("li");
        item.textContent = nuevaCantidad + " - " + ingrediente.nombre;
        resultado.appendChild(item);
    });
}

function convertir() {
    let cantidadInput = document.getElementById("cantidadGramos");
    let mensajeError = document.getElementById("errorConversion");
    let resultado = document.getElementById("resultadoConversion");
    let gramos = cantidadInput.value.trim();
    mensajeError.textContent = "";
    resultado.textContent = "";
    if (gramos === "") {
        mensajeError.textContent = "Este campo es obligatorio.";
        return;
    }
    let gramosNum = Number(gramos);
    if (isNaN(gramosNum)) {
        mensajeError.textContent = "Debe ser un número válido.";
        return;
    }
    if (gramosNum <= 0) {
        mensajeError.textContent = "La cantidad debe ser mayor a cero.";
        cantidadInput.focus();
        return;
    }
    document.getElementById("rC").classList.remove("oculto")
    let onzas = gramosAOnzas(gramosNum);
    resultado.textContent = gramosNum + " g = " + onzas + " oz";
}