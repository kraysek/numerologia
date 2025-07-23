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

// Interpretación de números (como un horóscopo personal)
function interpretarNumero(numero) {
    const significados = {
        1: "Líder natural, independiente y pionero. Tienes fuerza para iniciar proyectos.",
        2: "Diplomático, sensible y equilibrado. Excelente en relaciones y equipo.",
        3: "Creativo, expresivo y comunicador. Tu energía atrae alegría.",
        4: "Práctico, estable y trabajador. Eres la base de los demás.",
        5: "Libre, adaptable y aventurero. Buscas cambio y experiencia.",
        6: "Responsable, protector y familiar. Tu misión es cuidar.",
        7: "Analítico, espiritual e introspectivo. Buscas la verdad.",
        8: "Ambicioso, poderoso y orientado al éxito. Gran potencial material.",
        9: "Humanitario, compasivo y sabio. Tu propósito es servir.",
        11: "Intuitivo, inspirado e iluminado (número maestro).",
        22: "Constructor, visionario y transformador (número maestro).",
        33: "Maestro espiritual, servicio universal (número maestro)."
    };
    return significados[numero] || "Tu número tiene una energía única.";
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

    // Mostrar resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>🌟 Resultados para ${nombre}</h2>
        <p><strong>Número de Expresión:</strong> ${numeroExpresion}</p>
        <p><strong>Interpretación:</strong> ${interpretacionNombre}</p>
        <p><strong>Camino de Vida:</strong> ${caminoDeVida}</p>
        <p><strong>Significado:</strong> ${interpretacionVida}</p>
    `;
    resultadoDiv.style.display = 'block';
}