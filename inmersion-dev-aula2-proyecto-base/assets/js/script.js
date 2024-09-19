let listaNombreGastos = [];
let listaDescripcionesGastos = [];
let listaValoresGastos = [];
let gastoEnEdicion = null;

function clickBoton() {
  let nombreGasto = document.getElementById("nombreGasto").value;
  let descripcionGasto = document.getElementById("descripcionGasto").value;
  let valorGasto = Number(document.getElementById("valorGasto").value);

  if (valorGasto > 150) {
    alert("Esats gastando demasiado!!!");
  }

  if (gastoEnEdicion !== null) {
    listaNombreGastos[gastoEnEdicion] = nombreGasto;
    listaDescripcionesGastos[gastoEnEdicion] = descripcionGasto;
    listaValoresGastos[gastoEnEdicion] = valorGasto;
    gastoEnEdicion = null;
    document.getElementById("botonFormulario").textContent = "Agregar Gasto";
  } else {
    listaNombreGastos.push(nombreGasto);
    listaDescripcionesGastos.push(descripcionGasto);
    listaValoresGastos.push(valorGasto);
  }

  actualizarListaGastos();
}

function actualizarListaGastos() {
  const listaElementos = document.getElementById("listaDeGastos");
  const totalElementos = document.getElementById("totalGastos");

  let htmlLista = "";
  let totalGastos = 0;

  listaNombreGastos.forEach((elemento, posicion) => {
    const valorGasto = Number(listaValoresGastos[posicion]);
    const descripcionGasto = listaDescripcionesGastos[posicion];

    htmlLista += `<li><strong>${elemento}:</strong> <span>${descripcionGasto}</span> - <strong>USD ${valorGasto.toFixed(2)}</strong>
    <button class="editar-gasto" onclick="editarGasto(${posicion});">Editar</button>
    <button class="eliminar-gasto" onclick="eliminarGasto(${posicion});">Eliminar</button></li>`;

    totalGastos += valorGasto;
  });

  listaElementos.innerHTML = htmlLista;
  totalElementos.innerHTML = totalGastos.toFixed(2);
  limpiar();
}

function limpiar() {
  document.getElementById("nombreGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("valorGasto").value = "";
}

function eliminarGasto(posicion) {
  listaNombreGastos.splice(posicion, 1);
  listaDescripcionesGastos.splice(posicion, 1);
  listaValoresGastos.splice(posicion, 1);
  actualizarListaGastos();
}

function editarGasto(posicion) {
  document.getElementById("nombreGasto").value = listaNombreGastos[posicion];
  document.getElementById("descripcionGasto").value = listaDescripcionesGastos[posicion];
  document.getElementById("valorGasto").value = listaValoresGastos[posicion];

  gastoEnEdicion = posicion;

  document.getElementById("botonFormulario").textContent = "Actualizar Gasto";
}