let listaDepartamentos = [];

const cargarDepartamentos = async () => {
    try {
        listaDepartamentos.length = 0;
        const respuesta = await fetch('http://localhost:3000/departamentos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar los departamentos. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const departamentos = await respuesta.json();
        listaDepartamentos.push(...departamentos);

    } catch (error) {
        console.error("Error al cargar los departamentos", error.message);
    }
};

const guardarDepartamento = async (nuevoDepartamento) => {
    try {
        const respuesta = await fetch('http://localhost:3000/departamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoDepartamento),
        });

        if (!respuesta.ok) {
            throw new Error('Error al guardar el departamento. Estado: ' + respuesta.status + ' ' + respuesta.statusText);
        }

        const departamentoCreado = await respuesta.json();
        console.log('Departamento creado:', departamentoCreado);

    } catch (error) {
        console.error("Error al guardar el departamento", error.message);
    }
};

const cargarFormularioDepartamentos = () => {
    const departamentosForm = document.querySelector('.departamentos-form');
    departamentosForm.innerHTML = `
        <form>
            <label for="nombreDepartamento">Nombre del Departamento:</label>
            <input type="text" id="nombreDepartamento" required>
            <button type="button" onclick="crearDepartamento()">Crear Departamento</button>
            <button type="button" onclick="mostrarListadoDepartamentos()">Ver Listado de Departamentos</button>
        </form>
    `;
    const listadoDepartamentos = document.querySelector('.listado-departamentos');
    listadoDepartamentos.style.display = 'none';
}

const crearDepartamento = async () => {
    const nombreInput = document.getElementById('nombreDepartamento');

    const nombre = nombreInput.value;

    const nuevoDepartamento = {
        id: listaDepartamentos.length + 1,
        nombre: nombre,
    }

    await guardarDepartamento(nuevoDepartamento);
    await cargarDepartamentos();

    nombreInput.value = '';

    alert('Departamento creado con éxito!');

    return nuevoDepartamento;
}

const mostrarListadoDepartamentos = async () => {
    await cargarDepartamentos();
    const departamentosForm = document.querySelector('.departamentos-form');
    const listadoDepartamentos = document.querySelector('.listado-departamentos');

    departamentosForm.style.display = 'none';
    listadoDepartamentos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const departamento of listaDepartamentos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${departamento.id}, Nombre: ${departamento.nombre}`;
        ul.appendChild(li);
    }

    listadoDepartamentos.innerHTML = '';
    listadoDepartamentos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioDepartamentos);
    listadoDepartamentos.appendChild(volverButton);
}

const volverFormularioDepartamentos = () => {
    const departamentosForm = document.querySelector('.departamentos-form');
    const listadoDepartamentos = document.querySelector('.listado-departamentos');

    listadoDepartamentos.style.display = 'none';
    departamentosForm.style.display = 'block';
}


console.log(listaDepartamentos);
