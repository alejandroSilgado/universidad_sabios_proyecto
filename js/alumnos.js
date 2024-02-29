let listaAlumnos = [];

const cargarAlumnos = async () => {
    try {
        listaAlumnos.length = 0;
        const respuesta = await fetch('http://localhost:3000/alumnos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar los alumnos. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const alumnos = await respuesta.json();
        listaAlumnos.push(...alumnos);

    } catch (error) {
        console.error("Error al cargar los alumnos", error.message);
    }
};

const guardarAlumno = async (nuevoAlumno) => {
    try {
        const respuesta = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno),
        });

        if (!respuesta.ok) {
            throw new Error('Error al guardar el alumno. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const alumnoCreado = await respuesta.json();
        console.log('Alumno creado:', alumnoCreado);

    } catch (error) {
        console.error("Error al guardar el alumno", error.message);
    }
};

const cargarFormularioAlumnos = () => {
    const alumnosForm = document.getElementById('alumnos-form');
    alumnosForm.innerHTML = `
        <form>
            <label for="nombreAlumno">Nombre del Alumno:</label>
            <input type="text" id="nombreAlumno" required>
            <label for="apellidoAlumno">Apellido del Alumno:</label>
            <input type="text" id="apellidoAlumno" required>
            <label for="tipoDocumentoAlumno">Tipo de Documento:</label>
            <select id="tipoDocumentoAlumno" required>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
            </select>
            <label for="numeroDocumentoAlumno">Número de Documento:</label>
            <input type="text" id="numeroDocumentoAlumno" required>
            <label for="ciudadResidenciaAlumno">Ciudad de Residencia:</label>
            <select id="ciudadResidenciaAlumno" required>
                <option value="Bogotá">Bogotá</option>
                <!-- Agrega más opciones según las ciudades de Colombia -->
            </select>
            <label for="direccionAlumno">Dirección del Alumno:</label>
            <input type="text" id="direccionAlumno" required>
            <label for="telefonoAlumno">Teléfono del Alumno:</label>
            <input type="text" id="telefonoAlumno" required>
            <label for="fechaNacimientoAlumno">Fecha de Nacimiento del Alumno:</label>
            <input type="date" id="fechaNacimientoAlumno" required>
            <label for="sexoAlumno">Sexo del Alumno:</label>
            <select id="sexoAlumno" required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
            </select>
            <label for="programaIdAlumno">ID del Programa:</label>
            <input type="number" id="programaIdAlumno" required>
            <button type="button" onclick="crearAlumno()">Crear Alumno</button>
            <button type="button" onclick="mostrarListadoAlumnos()">Ver Listado de Alumnos</button>
        </form>
    `;
    const listadoAlumnos = document.querySelector('listado-alumnos');
    listadoAlumnos.style.display = 'none';
};

const crearAlumno = async () => {
    const nombreInput = document.getElementById('nombreAlumno');
    const apellidoInput = document.getElementById('apellidoAlumno');
    const tipoDocumentoInput = document.getElementById('tipoDocumentoAlumno');
    const numeroDocumentoInput = document.getElementById('numeroDocumentoAlumno');
    const ciudadResidenciaInput = document.getElementById('ciudadResidenciaAlumno');
    const direccionInput = document.getElementById('direccionAlumno');
    const telefonoInput = document.getElementById('telefonoAlumno');
    const fechaNacimientoInput = document.getElementById('fechaNacimientoAlumno');
    const sexoInput = document.getElementById('sexoAlumno');
    const programaIdInput = document.getElementById('programaIdAlumno');

    const nuevoAlumno = {
        id: listaAlumnos.length + 1,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        tipo_documento: tipoDocumentoInput.value,
        numero_documento: numeroDocumentoInput.value,
        ciudad_residencia: ciudadResidenciaInput.value,
        direccion: direccionInput.value,
        telefono: telefonoInput.value,
        fecha_nacimiento: fechaNacimientoInput.value,
        sexo: sexoInput.value,
        programa_id: programaIdInput.value
    };

    await guardarAlumno(nuevoAlumno);
    await cargarAlumnos();

    nombreInput.value = '';
    apellidoInput.value = '';
    tipoDocumentoInput.value = '';
    numeroDocumentoInput.value = '';
    ciudadResidenciaInput.value = '';
    direccionInput.value = '';
    telefonoInput.value = '';
    fechaNacimientoInput.value = '';
    sexoInput.value = '';
    programaIdInput.value = '';

    alert('Alumno creado con éxito!');

    // Puedes agregar funciones adicionales aquí si es necesario

    return nuevoAlumno;
};

const mostrarListadoAlumnos = async () => {
    await cargarAlumnos();
    const alumnosForm = document.querySelector('.alumnos-form');
    const listadoAlumnos = document.querySelector('.listado-alumnos');

    alumnosForm.style.display = 'none';
    listadoAlumnos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const alumno of listaAlumnos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${alumno.id}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}, Tipo Documento: ${alumno.tipo_documento}, Número Documento: ${alumno.numero_documento}, Ciudad Residencia: ${alumno.ciudad_residencia}, Dirección: ${alumno.direccion}, Teléfono: ${alumno.telefono}, Fecha Nacimiento: ${alumno.fecha_nacimiento}, Sexo: ${alumno.sexo}, ID Programa: ${alumno.programa_id}`;
        ul.appendChild(li);
    }

    listadoAlumnos.innerHTML = '';
    listadoAlumnos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioAlumnos);
    listadoAlumnos.appendChild(volverButton);
};

const volverFormularioAlumnos = () => {
    const alumnosForm = document.querySelector('.alumnos-form');
    const listadoAlumnos = document.querySelector('.listado-alumnos');

    listadoAlumnos.style.display = 'none';
    alumnosForm.style.display = 'block';
};


console.log(listaAlumnos);
