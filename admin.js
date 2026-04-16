document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario ha iniciado sesion
    const isAdmin = localStorage.getItem('isAdmin');

    // Si no es admin, lo expulsamos de vuelta al index
    if (!isAdmin || isAdmin !== 'true') {
        window.location.href = 'index.html';
    }

    // Funcionalidad de Cerrar Sesion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Elimina la sesion guardada
            localStorage.removeItem('isAdmin');
            // Redirige
            window.location.href = 'index.html';
        });
    }

    // Leer y Mostrar Estadísticas
    const kpiVisitas = document.getElementById('kpi-visitas');
    const kpiSugerencias = document.getElementById('kpi-sugerencias');
    const containerSug = document.getElementById('lista-sugerencias');
    
    let visitas = localStorage.getItem('pageViews') || 0;
    if(kpiVisitas) kpiVisitas.innerText = visitas;
    
    let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
    if(kpiSugerencias) kpiSugerencias.innerText = arraySug.length;
    
    // Pintar Sugerencias recibidas
    window.renderSugerencias = function() {
        let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
        if(kpiSugerencias) kpiSugerencias.innerText = arraySug.length;
        
        if(containerSug) {
            if(arraySug.length === 0) {
                containerSug.innerHTML = '<p>No hay mensajes nuevos.</p>';
            } else {
                let html = '';
                arraySug.forEach((sug, index) => {
                    html += `
                    <div style="background:rgba(0,0,0,0.4); padding:20px; border-radius:10px; border-left:4px solid var(--primary);">
                        <h3 style="margin-bottom:10px; display:flex; justify-content:space-between; flex-wrap:wrap;">
                            <span>👤 De: <span style="color:var(--primary);">${sug.nombre}</span></span>
                            <span style="font-size:0.8em; color:var(--text-muted);">${sug.fecha}</span>
                        </h3>
                        <p style="font-style:italic; margin-bottom:15px; line-height:1.5;">"${sug.mensaje}"</p>
                        
                        ${sug.respuesta ? 
                            `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:5px; margin-bottom:15px; border-left:2px solid var(--secondary); font-size:0.95em;">
                                <strong style="color:var(--secondary);">💬 Tu respuesta:</strong><br>${sug.respuesta}
                            </div>` : 
                            ''}
                        
                        <div style="display:flex; gap:10px;">
                            <button onclick="responderSugerencia(${index})" class="btn-primary" style="padding:5px 15px; font-size:0.8em;">${sug.respuesta ? 'Editar Respuesta' : 'Responder'}</button>
                            <button onclick="eliminarSugerencia(${index})" class="btn-primary" style="padding:5px 15px; font-size:0.8em; background:rgba(255,0,0,0.1); border-color:#ff4444; color:#ff4444; box-shadow:none;">Eliminar</button>
                        </div>
                    </div>
                    `;
                });
                containerSug.innerHTML = html;
            }
        }
    };
    
    renderSugerencias();
});

// Funcionalidad para administrar sugerencias
window.responderSugerencia = function(index) {
    let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
    let rpta = prompt("Escribe tu respuesta a " + arraySug[index].nombre + ":", arraySug[index].respuesta || "");
    if(rpta !== null && rpta.trim() !== '') {
        arraySug[index].respuesta = rpta;
        localStorage.setItem('sugerencias', JSON.stringify(arraySug));
        if(window.renderSugerencias) window.renderSugerencias();
    }
};

window.eliminarSugerencia = function(index) {
    if(confirm("¿Estás seguro de que deseas eliminar este mensaje para siempre?")) {
        let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
        arraySug.splice(index, 1);
        localStorage.setItem('sugerencias', JSON.stringify(arraySug));
        if(window.renderSugerencias) window.renderSugerencias();
    }
};

// Funcionalidad global de Tabs
window.verTab = function(tabId, btn) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.style.display = 'none');
    
    const btns = document.querySelectorAll('.menu-btn:not(.logout-btn)');
    btns.forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).style.display = 'block';
    if(btn) btn.classList.add('active');
};

// Funcionalidad global de Temas (Configuración)
window.cambiarTema = function(themeObj) {
    localStorage.setItem('selectedTheme', JSON.stringify(themeObj));
    // Aplica temporalmente en panel también para visualizarlo
    for(let key in themeObj) {
        document.documentElement.style.setProperty(key, themeObj[key]);
    }
    alert("¡Tema actualizado globalmente con éxito!");
};
