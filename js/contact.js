
function crearForm(){

    let formulario = document.getElementById('form')
    let elementosFormulario = formulario.querySelectorAll('input')
    console.log(elementosFormulario);
    formulario.addEventListener('submit', event => {
        event.preventDefault()
        let camposVacios = false
        elementosFormulario.forEach(elem => {
            if(elem.value == ''){
                camposVacios = true
            }
        })
        if(camposVacios){
            alert('todos los campos deben estar llenos')
        }
        else{
            formulario.innerHTML = ''
            formulario.innerHTML = `<div class="text-center"><h1 class="h-[250px] text-3xl">¡El formulario se ha enviado con exito!</h1>
            <h2 class="h-[250px] text-3xl">¡Pronto nos contactaremos!</div>`
        }
    })
}
crearForm()