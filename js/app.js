document.addEventListener('DOMContentLoaded', async () => {
    await cargarDepartamentos();
    cargarFormularioDepartamentos();
    await cargarAlumnos();
    cargarFormularioAlumnos();

    const enlaceDepartamentos = document.querySelector('nav ul li a[href*="departamentos"]');
    enlaceDepartamentos.addEventListener('click', mostrarDepartamentos);
});


