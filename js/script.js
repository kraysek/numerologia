// Tabla de valores de letras (a=1, b=2, ..., z=27, ñ=15)
const tabla = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
    'i': 9, 'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'ñ': 15, 'o': 16,
    'p': 17, 'q': 18, 'r': 19, 's': 20, 't': 21, 'u': 22, 'v': 23, 'w': 24,
    'x': 25, 'y': 26, 'z': 27
};

// Función para quitar acentos (á, é, í, ó, ú, ñ → a, e, i, o, u, n)
function quitarAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Redondeo personalizado: 1-5 baja, 6-9 sube
function redondearPersonalizado(numero) {
    const parteEntera = Math.floor(numero);
    const decimal = Math.floor((numero - parteEntera) * 10);
    return decimal >= 6 ? parteEntera + 1 : parteEntera;
}

// Reducir a un dígito (1-9), excepto números maestros 11, 22, 33
function reducirADigito(n) {
    if ([11, 22, 33].includes(n)) return n;
    while (n >= 10) {
        n = n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return n;
}

// Interpretación de números con colores, íconos y formato
function interpretarNumero(numero) {
    // Paleta de colores por número
    const colores = {
        1: '#0066cc',  // Azul líder
        2: '#9c27b0',  // Púrpura diplomático
        3: '#ff6f00',  // Naranja creativo
        4: '#388e3c',  // Verde estable
        5: '#1976d2',  // Azul aventurero
        6: '#7b1fa2',  // Púrpura protector
        7: '#5d4037',  // Marrón sabio
        8: '#d32f2f',  // Rojo poderoso
        9: '#00796b',  // Turquesa humanitario
        11: '#8e24aa', // Púrpura maestro
        22: '#0277bd', // Azul constructor
        33: '#33691e'  // Verde maestro
    };
    const color = colores[numero] || '#1a1a1a';
    const interpretaciones = {
        1: {
            nombre: "El Líder Pionero",
            fortaleza: "Independencia absoluta y confianza inquebrantable.",
            comunicacion: "Directo, claro y sin rodeos.",
            cambio: "Lo impulsa, no lo espera.",
            dinero: "Herramienta de poder y autonomía."
        },
        2: {
            nombre: "El Diplomático Sensible",
            fortaleza: "Empatía y habilidad para conectar.",
            comunicacion: "Escucha activa, tono suave y persuasivo.",
            cambio: "Prefiere transiciones suaves y apoyo.",
            dinero: "Busca estabilidad para proteger a los suyos."
        },
        3: {
            nombre: "El Creativo Expresivo",
            fortaleza: "Imaginación ilimitada y alegría contagiosa.",
            comunicacion: "Artística, humorística, con ritmo y estilo.",
            cambio: "Lo celebra como una nueva obra de arte.",
            dinero: "Lo invierte en experiencias y expresión personal."
        },
        4: {
            nombre: "El Constructor Estable",
            fortaleza: "Disciplina, orden y fiabilidad extrema.",
            comunicacion: "Práctica, estructurada, sin florituras.",
            cambio: "Necesita planificación previa.",
            dinero: "Lo gestiona con rigor y sentido del deber."
        },
        5: {
            nombre: "El Aventurero Libre",
            fortaleza: "Adaptabilidad y curiosidad insaciable.",
            comunicacion: "Espontánea, rápida y llena de energía.",
            cambio: "Es su elemento natural.",
            dinero: "Fluye con él, prefiere libertad sobre acumulación."
        },
        6: {
            nombre: "El Protector Responsable",
            fortaleza: "Compromiso familiar y sentido del deber.",
            comunicacion: "Cálida, orientada a cuidar y armonizar.",
            cambio: "Lo acepta si beneficia al hogar.",
            dinero: "Lo usa para crear seguridad y bienestar."
        },
        7: {
            nombre: "El Sabio Introspectivo",
            fortaleza: "Profundidad mental y búsqueda de la verdad.",
            comunicacion: "Reflexiva, precisa, a veces reservada.",
            cambio: "Lo analiza desde la distancia.",
            dinero: "Lo ve con desapego, prefiere conocimiento."
        },
        8: {
            nombre: "El Ejecutivo Poderoso",
            fortaleza: "Ambición, visión estratégica y autoridad.",
            comunicacion: "Enfocada en resultados y negocios.",
            cambio: "Lo convierte en oportunidad financiera.",
            dinero: "Es su campo de juego y medida de éxito."
        },
        9: {
            nombre: "El Humanitario Sabio",
            fortaleza: "Compasión global y visión de cierre de ciclos.",
            comunicacion: "Inspiradora, con propósito elevado.",
            cambio: "Lo vive como una transformación necesaria.",
            dinero: "Lo comparte o destina a causas mayores."
        },
        11: {
            nombre: "El Visionario Inspirado (Maestro)",
            fortaleza: "Intuición elevada y sensibilidad espiritual.",
            comunicacion: "Reveladora, casi profética.",
            cambio: "Lo percibe antes de que ocurra.",
            dinero: "Fluye cuando sirve a una misión superior."
        },
        22: {
            nombre: "El Constructor de Mundos (Maestro)",
            fortaleza: "Capacidad de materializar sueños masivos.",
            comunicacion: "Convincente, con visión de largo alcance.",
            cambio: "Lo dirige con plan maestro.",
            dinero: "Recurso para construir legado tangible."
        },
        33: {
            nombre: "El Maestro Sanador (Maestro)",
            fortaleza: "Amor incondicional y servicio universal.",
            comunicacion: "Sanadora, con tono de paz y compasión.",
            cambio: "Lo guía con sabiduría y calma.",
            dinero: "Instrumento de sanación y ayuda colectiva."
        }
    };
    const data = interpretaciones[numero];
    if (!data) return "Tu número tiene una energía única y aún por descubrir.";
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h3 style="color: ${color}; margin-bottom: 10px;">
                <strong>${numero} – ${data.nombre}</strong>
            </h3>
            <p>
                <span style="display: inline-block; background: ${color}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px;">✨</span>
                <strong>Fortaleza:</strong> ${data.fortaleza}
            </p>
            <p>
                <span style="display: inline-block; background: #007bff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px;">💬</span>
                <strong>Comunicación:</strong> ${data.comunicacion}
            </p>
            <p>
                <span style="display: inline-block; background: #ff6b35; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px;">🔄</span>
                <strong>Ante el cambio:</strong> ${data.cambio}
            </p>
            <p>
                <span style="display: inline-block; background: #43a047; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px;">💰</span>
                <strong>Dinero:</strong> ${data.dinero}
            </p>
        </div>
    `;
}

// Calcular Número de Camino de Vida (a partir de la fecha de nacimiento)
function numeroCaminoDeVida(fecha) {
    const digitos = fecha.replace(/\D/g, '').split('').map(Number);
    const total = digitos.reduce((a, b) => a + b, 0);
    return reducirADigito(total);
}

// Formatear automáticamente la fecha (DD/MM/AAAA)
document.getElementById('fecha_nac').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4) + (value.length > 4 ? '/' + value.slice(4, 8) : '');
    }
    e.target.value = value;
});

// Función principal: calcular numerología
function calcularNumerologia() {
    const nombre = document.getElementById('nombre').value.trim();
    const fechaNac = document.getElementById('fecha_nac').value.trim();

    // Validar nombre
    if (!nombre) {
        alert("Por favor ingresa tu nombre.");
        return;
    }

    // Validar formato de fecha
    if (!fechaNac || !/^\d{2}\/\d{2}\/\d{4}$/.test(fechaNac)) {
        alert("Por favor ingresa una fecha válida en formato DD/MM/AAAA.");
        return;
    }

    // Validar que la fecha sea real (día, mes, año existentes)
    const [dia, mes, anio] = fechaNac.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia); // mes es 0-indexado

    if (
        isNaN(fecha) ||
        fecha.getDate() !== dia ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getFullYear() !== anio ||
        anio < 1900 || anio > 2100
    ) {
        alert("La fecha ingresada no es válida. Por favor corrígela.");
        return;
    }

    // Calcular número del nombre
    const nombreSinAcentos = quitarAcentos(nombre).toLowerCase();
    const valores = [];
    for (let letra of nombreSinAcentos) {
        if (tabla[letra]) valores.push(tabla[letra]);
    }

    if (valores.length === 0) {
        alert("El nombre ingresado no contiene letras válidas.");
        return;
    }

    const suma = valores.reduce((a, b) => a + b, 0);
    const promedio = suma / valores.length;
    const promedioRedondeado = redondearPersonalizado(promedio);
    const numeroExpresion = reducirADigito(promedioRedondeado);

    // Calcular Camino de Vida
    const caminoDeVida = numeroCaminoDeVida(fechaNac);
    const interpretacionNombre = interpretarNumero(numeroExpresion);
    const interpretacionVida = interpretarNumero(caminoDeVida);

    // Mostrar resultado con desglose completo y botón de compartir
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>🌟 Resultados para ${nombre}</h2>
        <p><strong>Valores por letra:</strong> ${valores.join(' + ')} = <strong>${suma}</strong></p>
        <p><strong>Número de letras:</strong> ${valores.length}</p>
        <p><strong>Promedio (suma / letras):</strong> ${suma} / ${valores.length} = <strong>${promedio.toFixed(2)}</strong></p>
        <p><strong>Promedio redondeado (1-5 baja, 6-9 sube):</strong> ${promedioRedondeado}</p>
        <p><strong>Número de Expresión (reducido):</strong> ${numeroExpresion}</p>
        <p><strong>Interpretación:</strong> ${interpretacionNombre}</p>
        <hr style="border: 1px dashed #555; margin: 15px 0;">
        <p><strong>Camino de Vida:</strong> ${caminoDeVida}</p>
        <p><strong>Significado:</strong> ${interpretacionVida}</p>

        <!-- Botones de compartir -->
        <div class="compartir">
            <p>Comparte tu resultado:</p>
            <button onclick="compartirEnWhatsApp()" class="btn-whatsapp">WhatsApp</button>
            <button onclick="compartirEnFacebook()" class="btn-facebook">Facebook</button>
        </div>
    `;
    resultadoDiv.style.display = 'block';
}

// Función para compartir en WhatsApp
function compartirEnWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const numeroExpresion = resultadoDiv.querySelector('p strong')?.textContent || '';
    const mensaje = `Mi número de expresión es ${numeroExpresion}. Descubre tu energía con la Numerología Personal: https://gammadigitalstudio.com/numerolog/`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Función para compartir en Facebook
function compartirEnFacebook() {
    const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://gammadigitalstudio.com/numerolog/');
    window.open(url, '_blank');
}