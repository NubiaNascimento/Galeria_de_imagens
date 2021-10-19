"use strict"

const limparElementos = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}

const pesquisarImagens = async (evento) =>
 {

        console.log(evento)
        if(evento.key === 'Enter')
        {
            const raca = evento.target.value
            const url = `https://dog.ceo/api/breed/${raca}/images`
            const imagensResposta = await fetch(url)
            if(imagensResposta.ok)
            {
                    const imagens = await imagensResposta.json()
                    
                    limparElementos(document.querySelector('.galeria-container'))
                    limparElementos(document.querySelector('.slide-container'))

                    carregarGaleria(imagens.message)
                    carregarSlide(imagens.message)
            }
                else
                {
                    alert("Raça não encontrada")
                }
    }
    
 }


const filtrarId = (urlImagem) =>{
    const ultimaBarra = urlImagem.lastIndexOf("/") + 1
    const ultimoPonto = urlImagem.lastIndexOf(".") 
    return urlImagem.substring(ultimaBarra,ultimoPonto)

}

const criarItem = urlImagem => {
    const container = document.querySelector(".galeria-container")
    const novoLink = document.createElement("a")
    novoLink.href = `#${filtrarId(urlImagem)}`
    novoLink.classList.add("galeria-itens")
    novoLink.innerHTML = `<img src = "${urlImagem}" alt="">`
    container.append(novoLink)
}

const criarSlide = (urlImagem,indice, array) => {
   
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = filtrarId(urlImagem)

    const indiceAnterior = indice == 0? array.length -1 : indice -1 
    const slideAnterior = filtrarId (array[indiceAnterior])


    const indiceSeguinte = indice == array.length -1 ? 0 : indice + 1
    const slideSeguinte = filtrarId(array[indiceSeguinte])


    novaDiv.innerHTML = `
    
                <div class="imagem-container">
                    <a href="" class="fechar">&#10006;</a>
                    <a href="#${slideAnterior}" class="navegacao anterior">&#171;</a>
                    <img src="${urlImagem}" alt="">
                    <a href="#${slideSeguinte}" class="navegacao proximo">&#187;</a>
                </div>

    `;
    container.appendChild(novaDiv);
}

const carregarGaleria = (imgs) => imgs.forEach(criarItem);
const carregarSlide = (imgs) => imgs.forEach(criarSlide);


//carregarGaleria(imagens);
//carregarSlide(imagens);


document.querySelector('.pesquisa-container input').addEventListener('keypress',pesquisarImagens)