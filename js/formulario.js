"use strict";

document.addEventListener("DOMContentLoaded", inicioPagina);

function inicioPagina() {

    ///////////////////// codigo para confirmar que el que manda el mensaje es humano./////////////////

    document.querySelector("#boton-formulario").addEventListener("click", validar);
    let imagen = "zagxtwdx";

    function validar() {

        let captcha = document.querySelector("#captcha-ingresado").value;
        let mensaje = document.querySelector("#mensaje-usuario");
        let name = document.querySelector("#name").value;
        let gender = document.querySelector("#gender").value;
        let email = document.querySelector("#email").value;
        let message = document.querySelector("#message").value;

        if (name === "" || gender === "" || email === "" || message === "") {
            mensaje.innerHTML = "faltan datos por ingresar";
            event.preventDefault();
        } else {
            if (imagen === captcha) {
                return alert("Su mensaje ha sido enviado");
            } else if (imagen !== captcha) {
                mensaje.innerHTML = "captcha incorrecto, intentelo de nuevo";
                event.preventDefault();
            }
        }
    }

}