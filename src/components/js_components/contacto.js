
export function FormularioSend(nombre, email, servicio, mensaje) {
    console.log("=== FORMULARIO ENVIADO ===");
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Servicio" ,servicio);
    console.log("Mensaje", mensaje);
}
export const ValidarCorreo = (email) => {
    if (!email) return false;

    const SplitArroba = email.split('@');

    if (SplitArroba.length !== 2) {
        return "El correo debe contener un @ unico";
    }

    const [usuario, dominio] = SplitArroba;

    const regexCorreo = /^[a-zA-Z0-9]+(?:[._\-+][a-zA-Z0-9]+)*$/;
    const regexRepeticion = /^(.)\1*$/;

    if (!usuario || usuario.trim() === "") {
        return "Faltan identificadores || Necesitas un identificador antes del @";
    }

    if (usuario.length < 3) {
        return "El identificador del correo no puede ser tan corto";
    }

    if (usuario.startsWith('.')) {
        return "El correo no puede tener un punto al inicio";
    }

    if (usuario.endsWith('.')) {
        return "El correo no puede tener un . al lado del @";
    }

    if (usuario.includes('..')) {
        return "El correo no puede incluir puntos consecutivos";
    }

    if (usuario.startsWith('_')) {
        return "El correo no puede comenzar o incluir solo _";
    }

    if (usuario.includes('--')) {
        return "El correo no puede incluir -- seguidos, si es asi porfavor contacte su proveedor";
    }

    if (usuario.startsWith('-')) {
        return "El correo no puede empezar con -";
    }

    if (!regexCorreo.test(usuario)) {
        return "El correo no puede tener caracteres especiales";
    }

    if (regexRepeticion.test(usuario)) {
        return "El usuario no puede tener parametros tan repetidos ejemplo:(AAA@gmail.com)";
    }

    if (!dominio) {
        return "Falta el dominio despues del @";
    }

    const puntos = dominio.split('.');

    if (puntos.length < 2) {
        return "El dominio debe terminar con una extension Ejemplo:(.com o .cl)";
    }

    const extension = puntos.pop();
    const dominios = puntos.join('.');
    
    const regexDominio = /^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*$/;
    const regexExtension = /^[a-zA-Z]+$/;

    if (!dominios || dominios.trim() === '') {
        return "Falta el nombre del dominio Ejemplo:( gmail o 'dominioempresa' )";
    }

    if (dominios.length < 3) {
        return "El dominio es demaciado corto, verifique";
    }

    if (!regexDominio.test(dominios)) {
        return "El dominio no es correcto";
    }

    if (regexRepeticion.test(dominios)) {
        return "El dominio no puede ser usuario@aaaa.com";
    }

    if (extension.length < 2) {
        return "la extencion debe tener almenos 2 caracteres de largo";
    }

    if (!regexExtension.test(extension)) {
        return "la extencion deben ser solo letras";
    }

    return true;
}


export const ValidarNombre = (nombre) => {

    const regexSoloNombre = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]{3,50}$/;
    if(!nombre) return false;

    if(regexRepeticion.test(nombre)){
        return "El nombre no puede ser AAA o repetidos" 
    }

    if(nombre.includes('.') || nombre.includes(',')){
        return "El nombre no puede llevar ni puntos ni comas";
    }

    if(!regexSoloNombre.test(nombre)){
        return "El nombre solo puede incluir letras y guiones en caso de nombres extrangeros EJ:(O'Connors o Jean-Luc)";
    }

    return true;
}
