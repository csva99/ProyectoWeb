
// Función para manejar la respuesta de JSONP
function handleResponse(data) {
    const regionesSelect = document.getElementById("regiones");
    data.forEach((region) => {
        const option = document.createElement("option");
        option.value = region.codigo;
        option.textContent = region.nombre;
        regionesSelect.appendChild(option);
    });
}

// Agregar script dinámicamente para obtener todas las regiones
const script = document.createElement("script");
script.src =
    "https://apis.digital.gob.cl/dpa/regiones?callback=handleResponse";
document.body.appendChild(script);

// Obtener comunas de la región seleccionada
document.getElementById("regiones").addEventListener("change", () => {
    const codigoRegion = document.getElementById("regiones").value;
    const script = document.createElement("script");
    script.src = `https://apis.digital.gob.cl/dpa/regiones/${codigoRegion}/comunas?callback=handleResponseComunas`;
    document.body.appendChild(script);
});

// Función para manejar la respuesta de JSONP
function handleResponseComunas(data) {
    const comunasSelect = document.getElementById("comunas");
    comunasSelect.innerHTML =
        '<option value="">Seleccione una comuna</option>';
    data.forEach((comuna) => {
        const option = document.createElement("option");
        option.value = comuna.codigo;
        option.textContent = comuna.nombre;
        comunasSelect.appendChild(option);
    });
}