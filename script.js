/* --- GLOBAL THEME & VISITS --- */
(function () {
    // Solo contar si estamos en el index
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.indexOf('.html') === -1) {
        if (!sessionStorage.getItem('countedView')) {
            let views = localStorage.getItem('pageViews') || 0;
            localStorage.setItem('pageViews', parseInt(views) + 1);
            sessionStorage.setItem('countedView', '1');
        }
    }
    // Leer tema
    const themeStr = localStorage.getItem('selectedTheme');
    if (themeStr) {
        try {
            const theme = JSON.parse(themeStr);
            for (let key in theme) {
                document.documentElement.style.setProperty(key, theme[key]);
            }
        } catch (e) { }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    // Abre el modal
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        errorMsg.style.display = 'none';
        loginForm.reset();
    });

    // Cierra el modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cierra modal al hacer clic afuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Manejar el login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        // Validacion estetica
        if (user === '72049325' && pass === '280624') {
            // Guarda estado en localStorage
            localStorage.setItem('isAdmin', 'true');
            // Redirige al panel
            window.location.href = 'admin.html';
        } else {
            errorMsg.style.display = 'block';
        }
    });

    // Cerrar modal de tareas
    const tasksModal = document.getElementById('tasksModal');
    const closeTasksBtn = document.getElementById('closeTasksModal');

    if (closeTasksBtn && tasksModal) {
        closeTasksBtn.addEventListener('click', () => {
            tasksModal.classList.remove('active');
        });

        tasksModal.addEventListener('click', (e) => {
            if (e.target === tasksModal) {
                tasksModal.classList.remove('active');
            }
        });
    }

    // Modal Sugerencias
    const sugFab = document.getElementById('sugerenciaFab');
    const sugModal = document.getElementById('sugModal');
    const closeSug = document.getElementById('closeSugModal');
    const sugForm = document.getElementById('sugForm');

    if (sugFab && sugModal) {
        sugFab.addEventListener('click', () => sugModal.classList.add('active'));
        closeSug.addEventListener('click', () => sugModal.classList.remove('active'));
        sugForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nom = document.getElementById('sugNombre').value;
            const msj = document.getElementById('sugMensaje').value;

            let arr = JSON.parse(localStorage.getItem('sugerencias') || '[]');
            arr.push({ nombre: nom, mensaje: msj, fecha: new Date().toLocaleDateString() });
            localStorage.setItem('sugerencias', JSON.stringify(arr));

            alert('¡Sugerencia enviada correctamente!');
            sugForm.reset();
            sugModal.classList.remove('active');
        });
    }
});

// Datos de ejemplo para las tareas de cada semana
const datosSemanas = {
    'Semana 1': [
        { tarea: 'Mapa Conceptual sobre Fundamentos', enlace: 'https://canva.link/9ntavn49omp1ov3' },
        { tarea: 'Documento PDF de Introducción', enlace: '#' }
    ],
    'Semana 2': [
        { tarea: 'Infografía de Estructuras', enlace: 'https://www.canva.com/' },
        { tarea: 'Práctica Inicial', enlace: '#' }
    ],
    'Semana 3': [
        { tarea: 'Presentación de Avance', enlace: 'https://www.canva.com/' }
    ],
    'Semana 4': [
        { tarea: 'Guía visual de Estilos', enlace: 'https://www.canva.com/' },
        { tarea: 'Borrador del Proyecto', enlace: '#' }
    ],
    'Semana 5': [
        { tarea: 'Pruebas de Funcionalidad', enlace: 'https://www.canva.com/' }
    ],
    'Semana 6': [
        { tarea: 'Reporte de Errores', enlace: 'https://www.canva.com/' }
    ],
    'Semana 7': [
        { tarea: 'Optimización Final', enlace: 'https://www.canva.com/' }
    ],
    'Semana 8': [
        { tarea: 'Presentación Final del Proyecto', enlace: 'https://www.canva.com/' }
    ]
};

// Funcion global para abrir las semanas
window.abrirTareas = function (semanaName) {
    const modal = document.getElementById('tasksModal');
    const title = document.getElementById('tasksModalTitle');
    const bodyContainer = document.getElementById('tasksModalBody');

    if (modal && title && bodyContainer) {
        title.innerText = "Trabajos de la " + semanaName;

        let htmlContent = '<ul style="text-align: left; margin-top: 20px; line-height: 2; padding-left: 20px; list-style-type: none;">';

        const tareas = datosSemanas[semanaName] || [];

        tareas.forEach((t, i) => {
            htmlContent += `
                <li style="margin-bottom: 20px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; border: 1px solid rgba(255,126,103,0.3);">
                    📝 <strong>Trabajo ${i + 1}:</strong> ${t.tarea} <br>
                    <a href="${t.enlace}" target="_blank" style="display:inline-block; margin-top: 10px; padding: 6px 12px; background: #FF7E67; color: white; text-decoration: none; border-radius: 6px; font-size: 0.85em; font-weight: bold;">
                        ${t.enlace.includes('canva') ? '🎨 Ver en Canva' : '📥 Descargar Archivo'}
                    </a>
                </li>`;
        });

        if (tareas.length === 0) {
            htmlContent += '<li>Pronto se subirán los trabajos de esta semana.</li>';
        }

        htmlContent += '</ul>';
        bodyContainer.innerHTML = htmlContent;

        modal.classList.add('active');
    }
};