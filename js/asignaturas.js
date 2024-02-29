let listaAsignaturas = [];

const cargarAsignaturas = async () => {
    try {
        listaAsignaturas.length = 0;
        const respuesta = await fetch('http://localhost:3000/asignaturas');

        if (!respuesta.ok) {
            throw new Error('Error al cargar las asignaturas. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const asignaturas = await respuesta.json();
        listaAsignaturas.push(...asignaturas);

    } catch (error) {
        console.error("Error al cargar las asignaturas", error.message);
    }
};

const guardarAsignatura = async (nuevaAsignatura) => {
    try {
        const respuesta = await fetch('http://localhost:3000/asignaturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaAsignatura),
        });

        if (!respuesta.ok) {
            throw new Error('Error al guardar la asignatura. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const asignaturaCreada = await respuesta.json();
        console.log('Asignatura creada:', asignaturaCreada);

    } catch (error) {
        console.error("Error al guardar la asignatura", error.message);
    }
};

const cargarFormularioAsignaturas = () => {
    const asignaturasForm = document.querySelector('.asignaturas-form');
    asignaturasForm.innerHTML = `
        <form>
            <label for="codigoAsignatura">Código de la Asignatura:</label>
            <input type="text" id="codigoAsignatura" required>
            <label for="creditosAsignatura">Créditos de la Asignatura:</label>
            <input type="number" id="creditosAsignatura" required>
            <!-- Agrega más campos según tus necesidades -->
            <button type="button" onclick="crearAsignatura()">Crear Asignatura</button>
            <button type="button" onclick="mostrarListadoAsignaturas()">Ver Listado de Asignaturas</button>
        </form>
    `;
    const listadoAsignaturas = document.querySelector('.listado-asignaturas');
    listadoAsignaturas.style.display = 'none';
};

const crearAsignatura = async () => {
    const codigoInput = document.getElementById('codigoAsignatura');
    const creditosInput = document.getElementById('creditosAsignatura');

    const codigo = codigoInput.value;
    const creditos = creditosInput.value;

    const nuevaAsignatura = {
        id: listaAsignaturas.length + 1,
        codigo: codigo,
        creditos: creditos,
        // Agrega más propiedades según la estructura del JSON
    };

    await guardarAsignatura(nuevaAsignatura);
    await cargarAsignaturas();

    codigoInput.value = '';
    creditosInput.value = '';

    alert('Asignatura creada con éxito!');

    // Puedes agregar más funcionalidades si es necesario

    return nuevaAsignatura;
};

const mostrarListadoAsignaturas = async () => {
    await cargarAsignaturas();
    const asignaturasForm = document.querySelector('.asignaturas-form');
    const listadoAsignaturas = document.querySelector('.listado-asignaturas');

    asignaturasForm.style.display = 'none';
    listadoAsignaturas.style.display = 'block';

    const ul = document.createElement('ul');

    for (const asignatura of listaAsignaturas) {
        const li = document.createElement('li');
        li.textContent = `ID: ${asignatura.id}, Código: ${asignatura.codigo}, Créditos: ${asignatura.creditos}`;
        // Agrega más propiedades según la estructura del JSON
        ul.appendChild(li);
    }

    listadoAsignaturas.innerHTML = '';
    listadoAsignaturas.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioAsignaturas);
    listadoAsignaturas.appendChild(volverButton);
};

const volverFormularioAsignaturas = () => {
    const asignaturasForm = document.querySelector('.asignaturas-form');
    const listadoAsignaturas = document.querySelector('.listado-asignaturas');

    listadoAsignaturas.style.display = 'none';
    asignaturasForm.style.display = 'block';
};

console.log(listaAsignaturas);
