"use strict";

document.addEventListener("DOMContentLoaded", inicioPagina);

function inicioPagina() {

    /////////////////// barra de navegacion responsive /////////////////////////////////////////

    document.querySelector(".menu-responsive").addEventListener("click", navResponsive);

    function navResponsive() {

        document.querySelector(".navLista").classList.toggle("show");

    }
}