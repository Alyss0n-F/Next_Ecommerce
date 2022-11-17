let body = document.querySelector('body')


let main = document.querySelector('.container')
body.appendChild(main)


let vitrine = document.querySelector('.vitrine')
main.appendChild(vitrine)


let lista = document.createElement('ul')
lista.classList.add('lista_cards')
vitrine.appendChild(lista)


let contador = 0
let quantidade = document.querySelector('#quantidade')
quantidade.innerHTML = `${contador}`


let carrinhoVazio = document.querySelector('.carrinho_vazio')


let infoSection = document.querySelector('.info')


let soma = 0
let total = document.querySelector('#total')
total.innerHTML = `R$ ${soma.toFixed(2)}`



function listaItens(arr){
    for(let i = 0; i < arr.length; i++){
        let card = document.createElement('li')
        card.classList.add('card')
        lista.appendChild(card)

        let imagem = document.createElement('img')
        imagem.classList.add('imagem')
        imagem.src = data[i].img
        card.appendChild(imagem)

        let tag = document.createElement('small')
        tag.classList.add('tag')
        tag.innerHTML = data[i].tag
        card.appendChild(tag)
        
        let nome = document.createElement('span')
        nome.classList.add('nome')
        nome.innerHTML = data[i].nameItem
        card.appendChild(nome)

        let description = document.createElement('p')
        description.classList.add('description')
        description.innerHTML = data[i].description
        card.appendChild(description)
        
        let preco = document.createElement('span')
        preco.classList.add('preco')
        preco.innerHTML = `R$ ${data[i].value.toFixed(2)}`
        card.appendChild(preco)

        let adicionar = document.createElement('a')
        adicionar.setAttribute('id', data[i].id)
        adicionar.classList.add('adicionar')
        adicionar.innerHTML = data[i].addCart
        card.appendChild(adicionar)

        adicionar.addEventListener('click', function(e){
            let id = e.target.id
            let produto = procuraProduto(id)
            
            let carrinho = document.querySelector('.carrinho')

            let listaCarrinho = document.createElement('ul')
            carrinho.appendChild(listaCarrinho)

            if(verificaItemCarrinho(produto.id) == false){
                let li = criarItemCarrinho(produto)
                carrinho.appendChild(li)
            }

            let containerCarrinho = document.querySelector('.carrinho')
            containerCarrinho.appendChild(listaCarrinho)
        })
    }
}


listaItens(data)



function procuraProduto(id){
    for(let i = 0; i < data.length; i++){
        let produto = data[i]

        if(produto.id == id){
            return produto
        }
    }
    return "Produto não encontrado"
}


function verificaItemCarrinho(id){
    let item = document.querySelector('#item_carrinho_' + id)
    if(item == null){
        return false
    }else{
        return true
    }
}


function criarItemCarrinho(produto){
        let li = document.createElement('li')
        li.id = "item_carrinho_" + produto.id
        li.classList.add('card_carrinho')

        let imagem = document.createElement('img')
        imagem.classList.add('imagem_card_carrinho')
        imagem.src = produto.img
        li.appendChild(imagem)

        let containerDescricaoCarrinho = document.createElement('div')
        containerDescricaoCarrinho.classList.add('container_description_cart')
        li.appendChild(containerDescricaoCarrinho)

        let nome = document.createElement('span')
        nome.classList.add('nome_card_carrinho')
        nome.innerHTML = produto.nameItem
        containerDescricaoCarrinho.appendChild(nome)

        let preco = document.createElement('span')
        preco.classList.add('preco_card_carrinho')
        preco.innerHTML = `R$ ${produto.value.toFixed(2)}`
        containerDescricaoCarrinho.appendChild(preco)

        contador++
        quantidade.innerHTML = `${contador}`

        if(contador == 0){
            carrinhoVazio.style.display = 'flex'
        }else{
            carrinhoVazio.style.display = 'none'
            infoSection.style.display = 'flex'
        }

        soma += produto.value
        total.innerHTML = `R$ ${soma.toFixed(2)}`


        let remover = document.createElement('a')
        remover.classList.add('botao_remover_carrinho')
        remover.innerHTML = "Remover produto"
        containerDescricaoCarrinho.appendChild(remover)
        
        remover.addEventListener('click', function(){
            let card = document.querySelector('#item_carrinho_' + produto.id)
            card.remove()
            contador--

            if(contador == 0){
                carrinhoVazio.style.display = 'flex'
                infoSection.style.display = 'none'
            }else{
                carrinhoVazio.style.display = 'none'
                infoSection.style.display = 'flex'
            }    

            quantidade.innerHTML = `${contador}`
            soma -= produto.value
            total.innerHTML = `R$ ${soma.toFixed(2)}`
        })
    return li
}
