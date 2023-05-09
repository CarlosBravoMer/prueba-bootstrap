const crearCalendario = ({ locale, any }) => {
    const diaSemana = [...Array(7).keys()]

    const intDiaSemana = new Intl.DateTimeFormat(locale, { weekday: 'short' })

    const el = document.querySelector('#calendario')

    document.getElementById('arriba').addEventListener('click', () => {
        el.scrollTo({ top: el.scrollTop - window.innerHeight, behavior: 'smooth' })
    })

    document.getElementById('abajo').addEventListener('click', () => {
        el.scrollTo({ top: el.scrollTop + window.innerHeight, behavior: 'smooth' })
    })

    const nombresDiaSemana = diaSemana.map((_, indiceDiaSemana) => {
        const fecha = new Date(2021, 10, indiceDiaSemana + 1)
        const nombreDiaSemana = intDiaSemana.format(fecha)
        return nombreDiaSemana
    })

    const mostrarDiaSemana = nombresDiaSemana.map(nombreDiaSemana => `<li class='nombre-dia'>${nombreDiaSemana}</li>`).join('')

    const meses = [...Array(12).keys()]
    const intl = new Intl.DateTimeFormat(locale, { month: 'long' })

    const calendario = meses.map(mesNum => {
        const mesNombre = intl.format(new Date(any, mesNum))

        const aumentarIndiceMes = mesNum + 1

        const diasMes = new Date(any, aumentarIndiceMes, 0).getDate()

        const diaEmpieza = new Date(any, mesNum, 1).getDay()

        return {
            mesNombre,
            diasMes,
            diaEmpieza,
        }
    })



    const html = calendario.map(({ diasMes, mesNombre, diaEmpieza }) => {

        const dias = [...Array(diasMes).keys()]

        const primerDiaMes = `class='primer-dia day-selected' style='--primer-dia-empieza: ${diaEmpieza}' `

        const mostrarDia = dias.map((dia, index) =>
            `<li ${index === 0 ? primerDiaMes : ''} class="day-selected">${dia + 1}</li>`
        ).join('')

        const titulo = `<h1>${mesNombre} ${any}</h1>`

        return `<div class='mes'>${titulo}<ol>${mostrarDiaSemana} ${mostrarDia}</ol></div>`
    }).join('')

    el.innerHTML = html
}

const añoActual = 2023;
crearCalendario({ any: añoActual, locale: 'es' })

// MOSTRAR EL DIA QUE SE HA SELECCIONADO
const daySelected = document.querySelectorAll('.day-selected');
const monthSelected = document.querySelectorAll('.mes');
let fecha = 0;

daySelected.forEach((element) => {
    element.addEventListener('click', () => {
        fecha = element.textContent;
    })
}
)

monthSelected.forEach((element, index) => {
    element.addEventListener('click', () => {
        fecha = `${fecha}/${index + 1}/${añoActual}`
        alert(fecha)
    });
})
