
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
        let palabrasClave = textoIngresado.split(" ").filter(palabra => palabra.trim() !== ""); // Separar las palabras clave ingresadas
        return array.filter(zapatilla => palabrasClave.every(palabra => zapatilla.name.toLowerCase().includes(palabra.toLowerCase())))
        // Verificar si todas las palabras clave están presentes en el nombre de la zapatilla
    }
};


let renderCard = (array, contenedor) => {
    contenedor.innerHTML = ''
    let template = ''
    if (array.length != 0) {
        array.forEach(element => template += createCard(element))
    } else {
        template = '<h2>Lo sentimos, no encontramos productos que coincidan con tus filtros de búsqueda.</h2>'
    }
    contenedor.innerHTML = template
}

let renderCheckbox = (array, contenedor) => {
    let template = ''
    array.forEach(element => template += crearCheckbox(element));
    contenedor.innerHTML = template
}

let createCard = objeto => `<div class="bg-[#B3C8CF] text-gray-300 w-52 rounded-2xl overflow-hidden">
<img class=" w-full h-28 rounded object-cover" src=${objeto.image}/>
<div class="px-6 py-6">    
<h3 class="text-xl mb-2 text-[#000000]">${objeto.name}</h3>
<p class="text-sm text-[#000000] line-clamp-4">${objeto.description}</p>
<p class="bg-gray-800 text-[#F1EEDC] w-12 text-center rounded">${objeto.price}$</p>
${objeto.cantidad < 5 ? `<p>Últimas unidades!</p>` : ''}
<a class="py-2 px-3 rounded-lg ml-auto block text-[#000000]" href="./details.html?id=${objeto.id}">Ver mas</a> 
</div>
</div>`



let crearCheckbox = nombre => `<label class="text-gray-700 p-4">${nombre}
<input type="checkbox" name="${nombre}" value="${nombre}">
</label>`

renderCard(productos, contenedor)
renderCheckbox(categorias, contenedorCheckboxs)