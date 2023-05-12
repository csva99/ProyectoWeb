document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#formulario");
    const button = document.querySelector("#enviar");

    button.addEventListener("click", (event) => {
        event.preventDefault(); // Previene que el formulario se envíe por defecto

        const formData = new FormData(form);
        const jsonData = {};
        // Convierte los datos del formulario en formato JSON
        formData.forEach((value, key) => {
            if (key === "password") {
                jsonData[key] = btoa(value); // Se codifica en base64 la contraseña
            } else {
                jsonData[key] = value;
            }
        });
        // console.log(jsonData);
        // Envía los datos al servidor usando Fetch API
        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Usuario agregado correctamente");
                location.reload(); // Actualiza la página
            })
            .catch((error) => {
                console.error(error);
            });
    });
});