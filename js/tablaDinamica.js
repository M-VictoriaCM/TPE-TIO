"use strict";

document.addEventListener("DOMContentLoaded", inicioPagina);

function inicioPagina() {

    const baseUrl = "https://web-unicen.herokuapp.com/api/groups";
    const groupId = "018lastagaray";
    const collectionId = "pronosticos";


    ///////////////////////// codigo para ingresar los datos en la tabla dinamica.///////////////////
    //////////// los datos ingresados van al servidor y tambien se muestran en la tabla /////////////

    let tbody = document.querySelector("#tbody-dinamico");

    let posicion = document.querySelector("#posicion");
    let equipo = document.querySelector("#equipo");
    let botonAgregar = document.querySelector("#botonAgregar");
    botonAgregar.addEventListener("click", function(e) {
        let datoPronosticado = {
            "posicion": posicion.value,
            "equipo": equipo.value
        };
        agregar(datoPronosticado);
    });

    let botonX3 = document.querySelector("#botonX3");
    botonX3.addEventListener("click", function(e) {
        let datoPronosticado = {
            "posicion": posicion.value,
            "equipo": equipo.value
        }
        agregar(datoPronosticado);
        agregar(datoPronosticado);
        agregar(datoPronosticado);
    });

    datosServidor(); //con esta funcion, aparece info en la tabla cuando se carga la pagina

    function agregar(datoPronosticado) { // con esta funcion se crea el objeto en el servidor y la tabla

        let datos = {
            "thing": datoPronosticado,
        };

        fetch(`${baseUrl}/${groupId}/${collectionId}`, {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(datos)
        }).then(function(r) {
            return r.json();
        }).then(function(json) {
            if (json.status === "OK") {
                datosServidor();
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    function mostrarTablaCreada(pronosticos) { //esta funcion muestra los lugares creados en la tabla


        tbody.innerHTML = "";
        pronosticos.forEach(pronosticos => {
            crearLugar(pronosticos);
        });
    }

    function crearLugar(datoPronosticado) { // esta funcion crea los lugares en la tabla

        let row = document.createElement("tr");
        let columnPosicion = document.createElement("td");
        let columnEquipo = document.createElement("td");
        let columnOpciones = document.createElement("td");
        columnPosicion.innerHTML = datoPronosticado.thing.posicion;
        columnEquipo.innerHTML = datoPronosticado.thing.equipo;
        columnOpciones.innerHTML = "";
        row.appendChild(columnPosicion);
        row.appendChild(columnEquipo);
        row.appendChild(columnOpciones);
        tbody.appendChild(row);

        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.addEventListener("click", function(e) {
            eliminar(datoPronosticado._id);
        });
        columnOpciones.appendChild(botonEliminar);

        let botonEditar = document.createElement("button");
        botonEditar.innerHTML = "Editar";
        botonEditar.addEventListener("click", function(e) {
            editar(datoPronosticado._id);
        });
        columnOpciones.appendChild(botonEditar);
    }

    function datosServidor() { //con esta funcion, aparece info en la tabla cuando se carga la pagina

        fetch(`${baseUrl}/${groupId}/${collectionId}`, {
            "method": "GET",
        }).then(function(r) {
            return r.json();
        }).then(function(json) {
            mostrarTablaCreada(json.pronosticos);
            console.log(json);
        }).catch(function(error) {
            console.log(error);
        });
    }

    function eliminar(id) { //con esta funcion se elimina el objeto de la tabla y el servidor

        fetch(`${baseUrl}/${groupId}/${collectionId}/${id}`, {
            "method": "DELETE",
        }).then(function(r) {
            return r.json();
        }).then(function(json) {
            console.log(json);
            datosServidor();
        }).catch(function(error) {
            console.log(error);
        });
    }

    //////////////////// no esta funcionando.

    function editar(id) { // funcion que edita los objetos.

        let datoPronosticado = {
            "posicion": posicion.value,
            "equipo": equipo.value
        };
        let datos = {
            "thing": datoPronosticado
        };

        fetch(`${baseUrl}/${groupId}/${collectionId}/${id}`, {
            "method": "PUT",
            "mode": "cors",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(datos)
        }).then(function(r) {
            return r.json();
        }).then(function(json) {
            console.log(json);
            datosServidor();
        }).catch(function(error) {
            console.log(error);
        })
    }

    /////////// funcion para filtrar la tabla dinamica.

    document.querySelector("#filtro").addEventListener("keyup", filtrar);

    function filtrar() { // el filtrado se hace localmente, sin uso del servidor.

        let i;
        let inputFiltro = document.querySelector("#filtro");
        let filtro = inputFiltro.value.toUpperCase();
        let tabla = document.querySelector("#tbody-dinamico");
        let filas = tabla.getElementsByTagName("tr");


        for (i = 0; i < filas.length; i++) {
            let columna = filas[i].getElementsByTagName("td")[1]; // al poner [1] me posiciono en la columna de equipo para hacer el filtrado
            if (columna) {
                let contenido = columna.textContent || columna.innerText;
                if (contenido.toUpperCase().indexOf(filtro) > -1) {
                    filas[i].style.display = "";
                } else {
                    filas[i].style.display = "none";
                }
            }
        }
    }

}