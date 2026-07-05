/** Valida formato de correo electrónico */
function validarCorreo(correo) {
    const patronC = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronC.test(correo);
}

/** Solo letras mayúsculas/minúsculas, acepta vocales acentuadas */
function soloLetras(texto) {
    const patronL = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return patronL.test(texto);
}

/** Valida longitud de un número */
function validarLongitud(numero, maxLongitud) {
    const texto = String(numero).trim();
    return texto.length == maxLongitud;
}
/** Calcula edad a partir de fecha de nacimiento */
function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    return edad;
}

/** Valida si es mayor de edad */
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

/** Requiere mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres */
function validarPassword(password) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);
    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial && password.length >= 8;
}

/** Función adicional: escala la cantidad de un ingrediente a nuevas porciones */
function escalarReceta(cantidadOriginal, porcionesOriginales, porcionesDeseadas) {
    if (porcionesOriginales <= 0) return 0;
    const resultado = (cantidadOriginal / porcionesOriginales) * porcionesDeseadas;
    return Math.round(resultado * 100) / 100;
}

/** Función adicional: convierte una cantidad de gramos a onzas */
function gramosAOnzas(gramos) {
    const GRAMOS_POR_ONZA = 28.35;
    const resultado = gramos / GRAMOS_POR_ONZA;
    return Math.round(resultado * 100) / 100;
}