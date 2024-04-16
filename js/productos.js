
let contenedor = document.getElementById("contenedor")
let contenedorCheckboxs = document.getElementById("contenedorCheckbox")
let inputTexto = document.getElementById("search")
let carrito = document.getElementById("carrito");
let botonAbrirCarrito = document.getElementById("abrirCarrito");
let botonCerrarCarrito = document.getElementById("cerrarCarrito");
let listaCarrito = document.getElementById("listaCarrito");
let valorTotal = document.getElementById("total")
let botonComprar = document.getElementById("botonComprar")

let productos = zapatillas.products
let categorias = zapatillas.categories.map(categoria => categoria.name)
let carritoIDs = JSON.parse(localStorage.getItem('carritoIDs')) || []
let total = 0

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
        array.forEach(element => template += crearTarjeta(element))
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

let crearCheckbox = nombre => `<label class="text-gray-700 p-4">${nombre}
<input type="checkbox" name="${nombre}" value="${nombre}">
</label>`

let crearTarjeta = objeto => `<div class="flex flex-col relative bg-[#B3C8CF] text-gray-300 w-52 h-96 rounded-2xl overflow-hidden items-center">
<img class=" w-full h-28 rounded object-cover" src=${objeto.image}>
<div class="px-4 py-6 flex flex-col items-center justify-between">    
<h3 class="text-lg mb-2 text-[#000000] text-center">${objeto.name}</h3>
<p class="text-sm text-[#000000] line-clamp-4">${objeto.category}</p>
<p class="bg-gray-800 text-[#F1EEDC] w-12 text-center rounded">${objeto.price}$</p>
${objeto.cantidad < 5 ? `<div class="bg-red-500 text-white text-lg rounded-2xl p-2"><p>Últimas unidades!</p></div>` : ''}
</div>
<div class="flex flex-col mt-auto items-center w-[90%] py-2">
<button class="bg-[#007bff] text-white px-[10px] py-[5px] hover:bg-[#0056b3] w-[90%] mt-auto" data-id="${objeto.id}">Agregar al Carrito</button>
<a class="py-2 px-3 rounded-lg ml-auto block text-[#000000] mt-auto py-2" href="./details.html?id=${objeto.id}">Ver mas</a>
</div>
</div>`

let productoID = (array, id) => array.find(producto => producto.id == id)

let añadirACarrito = objeto => {
    let carritoItem = document.createElement("li");
    carritoItem.className = "text-sm flex flex-col border border-black ";
    carritoItem.innerText = `${objeto.name} - $${objeto.price}`;

    let removeButton = document.createElement("button");
    removeButton.className = "bg-red-500 text-white px-[5px] py-[2.5px] hover:bg-red-600";
    removeButton.setAttribute("data-id", objeto.id);
    removeButton.innerText = "Eliminar";
    removeButton.addEventListener("click", (e) => {
        listaCarrito.removeChild(carritoItem);
        total -= objeto.price;
        valorTotal.innerText = total.toFixed(2);
        let index = carritoIDs.indexOf(objeto.id.toString());
        if (index > -1) {
            // Eliminar solo esa ocurrencia del array carritoIDs
            carritoIDs.splice(index, 1);
            localStorage.setItem("carritoIDs", JSON.stringify(carritoIDs));
        }
    });

    carritoItem.appendChild(removeButton);
    listaCarrito.appendChild(carritoItem);

    total += objeto.price;
    valorTotal.innerText = `$${total.toFixed(2)}`;
}

contenedor.addEventListener('click', (e) => {
    let target = e.target
    let id = target.dataset.id
    if (target.tagName == 'BUTTON') {
        console.log("es un boton")
        carritoIDs.push(id)
        console.log(carritoIDs);
        añadirACarrito(productoID(productos, id))
        localStorage.setItem('carritoIDs', JSON.stringify(carritoIDs));
    }
})

botonComprar.addEventListener('click', (e) => {
    comprarProductos()
})

let comprarProductos = () =>{
    carritoIDs.forEach(id=> {
        let producto = productoID(productos,id)
        if (producto && producto.cantidad > 0) {
            producto.cantidad -= 1
        }
        console.log(producto);
    })
    carritoIDs=[]
    console.log(carritoIDs);
    localStorage.setItem('carritoIDs', JSON.stringify(carritoIDs));
    renderCard(zapatillasPorTexto(zapatillasPorCheck(productos, categoriasSeleccionadas), textoIngresado), contenedor)
}

botonAbrirCarrito.addEventListener("click", function () {
    carrito.classList.add("open");
});

botonCerrarCarrito.addEventListener("click", function () {
    carrito.classList.remove("open");
});


// Cargar productos del carrito al iniciar la página
carritoIDs.forEach((id) => {
    let producto = productoID(productos, id);
    if (producto) {
        añadirACarrito(producto);
    }
});

renderCard(productos, contenedor)
renderCheckbox(categorias, contenedorCheckboxs)