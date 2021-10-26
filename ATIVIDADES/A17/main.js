const masks = {
    cpf(value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')    
        .replace(/(-\d{2})\d+?$/, '$1')     
    },

    tel(value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1') 
    },

    cep(value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')   
        .replace(/(-\d{3})\d+?$/, '$1')
    }
}

document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

const button = document.getElementById('enviar')

button.addEventListener('click', () => {
    event.preventDefault()

    const email = document.getElementById('email')

    if(email.value == '')  {
        email.classList.add("errorInput")
    }
    
    const fname = document.getElementById('fname')

    if(fname.value == '')  {
        fname.classList.add("errorInput")
    }

    const snome = document.getElementById('snome')

    if(snome.value == '')  {
        snome.classList.add("errorInput")
    }

    const tel = document.getElementById('tel')

    if(tel.value == '')  {
        tel.classList.add("errorInput")
    }

    const cpf = document.getElementById('idCpf')

    if(idCpf.value == '')  {
        cpf.classList.add("errorInput")
    }

    const cep = document.getElementById('idCep')

    if(idCep.value == '')  {
        cep.classList.add("errorInput")
    }

    if(email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1 || (email.value.indexOf(".") - email.value.indexOf("@") == 1)) {
        email.classList.add("errorInput")
    } else {
        email.classList.remove("errorInput")
    }

    if (tel.value.length <= 13) {
        tel.classList.add("errorInput")
    } else {
        tel.classList.remove("errorInput")
    }

    if (idCpf.value.length <= 13) {
        idCpf.classList.add("errorInput")
    } else {
        idCpf.classList.remove("errorInput")
    }

    if (idCep.value.length <= 8) {
        idCep.classList.add("errorInput")
    } else {
        idCep.classList.remove("errorInput")
    }
});