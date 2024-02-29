document.addEventListener('DOMContentLoaded',async ()=>{
    await cargarDepartamentos();
    cargarFormularioDepartamentos();
    await cargarAlumnos();
    cargarFormularioAlumnos();
});