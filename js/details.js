let $cardsCtn = document.querySelector("#main");
let url = new URLSearchParams(location.search);
let id = url.get("id");

let tennis = zapatillas.products;

let filtrarZapatilla = (shoes, shoeId) => shoes.filter(shoe => shoe.id == shoeId);
let zapatillaSeleccionada = filtrarZapatilla(tennis, id)[0];
// console.log(zapatillaSeleccionada);

let asideCntnt = (shoe, nodo) => `
<div class="flex flex-col justify-between items-center w-full bg-[#BED7DC] text-gray-300 rounded-2xl border m-2  lg:w-[38%]">
   <img class="w-full h-[400px] rounded-xl object-cover" src=${shoe.image}>
   <hr class="w-[80%] border-[3px] my-4 md:mt-12">
   <div class="px-6 py-6">    
      <h3 class="font-extrabold text-2xl mb-2 text-[#000000]">${shoe.name}</h3>
      <p class="text-lg italic text-[#000000] line-clamp-4">${shoe.description}</p>
      <p class="text-black font-bold italic bg-[#F1EEDC] w-[5rem] rounded my-4">${shoe.price} USD</p>
   </div>
</div>

<hr class="w-[30%] h-[2px] ml-2 my-4 lg:hidden">


<div class="w-full m-2 bg-[#BED7DC] p-2 rounded-md lg:w-[55%]">
   <table class="w-full p-2">        
      <tbody>
         <tr>
            <th class="p-1.5 text-end border-[2px] border-solid border-[#ffffff]">Categoría:</th>
            <td class="p-1.5 text-left border-[2px] border-solid border-[#ffffff] w-[50%]">${shoe.category}</td>
         </tr>
         <tr>
            <th class="p-1.5 text-end border-[2px] border-solid border-[#ffffff]">color</th>
            <td class="p-1.5 text-left border-[2px] border-solid border-[#ffffff] w-[50%]">${shoe.color}</td>
         </tr>
         <tr>
            <th class="p-1.5 text-end border-[2px] border-solid border-[#ffffff]">Sizes</th>
            <td class="p-1.5 text-left border-[2px] border-solid border-[#ffffff] w-[50%]">${nodo}</td>
         </tr>
      </tbody>
   </table>
   <div class="flex flex-wrap justify-center p-4">
   <h4>¡Descubre la revolución en calzado deportivo con nuestras nuevas zapatillas deportivas diseñadas para llevar tu rendimiento al siguiente nivel!</h4>
   <p>Con un diseño aerodinámico y una tecnología de vanguardia, nuestras zapatillas están creadas para ofrecerte la máxima comodidad y soporte durante tus entrenamientos y actividades deportivas. Desde correr en la pista hasta levantar pesas en el gimnasio, estas zapatillas son tu compañero perfecto en cada paso del camino.</p>

   <hr class="w-[80%] border-[2px] my-4">

   <h4>¡No te pierdas la oportunidad de experimentar el confort y el rendimiento incomparables de nuestras zapatillas deportivas! </h4>
   <p><a class="no-underline font-bold bg-[#B3C8CF] px-2 rounded" href="./contact.html">Suscríbete a nuestra página</a> para recibir las últimas actualizaciones sobre lanzamientos de productos, ofertas especiales y consejos de entrenamiento exclusivos.</p>
</div>
</div>

`

let crearAside = (shoe, ctn, nodo) => {
   ctn.innerHTML = ''
   let aside = document.createElement("aside");
   aside.className = "flex flex-row flex-wrap bg-[#B3C8CF] w-[90%] rounded-xl gap-2 justify-center items-center my-8 md:w-[85%] md:my-16";
   aside.innerHTML = asideCntnt(shoe, nodo);
   ctn.appendChild(aside);
}

function pSizes (shoe) {
   let p = document.createElement("p");
   shoe.sizes.forEach(size => {
      let span = document.createElement('span');
      span.innerText = size;
      p.appendChild(span);
   })
   p.outerHTML;
   return p;
}

let pNodo = pSizes(zapatillaSeleccionada).outerHTML;
console.log(pNodo);

crearAside(zapatillaSeleccionada, $cardsCtn, pNodo);
