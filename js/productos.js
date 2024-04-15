
let contenedor = document.getElementById("contenedor")
let contenedorCheckboxs = document.getElementById("contenedorCheckbox")
let inputTexto = document.getElementById("search")
let productos = zapatillas.products
let categorias = zapatillas.categories.map(categoria => categoria.name)

console.log(productos);
console.log(categorias);

let categoriasSeleccionadas = []
let textoIngresado = ''

contenedorCheckboxs.addEventListener("change", (e) => {
    categoriasSeleccionadas = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value)
    console.log(categoriasSeleccionadas);
    renderCard(zapatillasPorTexto(zapatillasPorCheck(productos, categoriasSeleccionadas), textoIngresado), contenedor)
})

inputTexto.addEventListener("input", (e) => {
    textoIngresado = e.target.value.trim().toLowerCase()
    renderCard(zapatillasPorTexto(zapatillasPorCheck(productos, categoriasSeleccionadas), textoIngresado), contenedor)
})

let zapatillasPorCheck = (array, arrayChecks) => {
    if (categoriasSeleccionadas.length == 0) {
        return array
    } else {
        return array.filter(zapatilla => arrayChecks.includes(zapatilla.category))
    }
}
let zapatillasPorTexto = (array, textoIngresado) => {
    if (!textoIngresado) {
        return array;
    } else {
        return array.filter(zapatilla => zapatilla.name.toLowerCase().includes(textoIngresado));
    }
}

let renderCard = (array, contenedor) => {
    contenedor.innerHTML = ''
    let template = ''
if (array.length != 0) {
        array.forEach(element =>  template+=createCard(element))
    } else {
        template = '<h2>Lo sentimos, no encontramos productos que coincidan con tus filtros de búsqueda.</h2>'
    }
    contenedor.innerHTML = template
}

let renderCheckbox = (array, contenedor) => {
    let template = ''
    array.forEach(element =>  template += crearCheckbox(element));
    contenedor.innerHTML = template
}

let createCard = objeto => `<div class="flex flex-col border border-black">
<h3>${objeto.name}</h3>
<p>${objeto.category}</p>
</div>`


let crearCheckbox = nombre => `<label>${nombre}
<input type="checkbox" name="${nombre}" value="${nombre}">
</label>`

renderCard(productos,contenedor)
renderCheckbox(categorias,contenedorCheckboxs)