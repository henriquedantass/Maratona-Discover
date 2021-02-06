
// PROGRAMAÇÃO ORIENTADA A OBJETOS 


// OBJETO MODAL E SEUS METODOS DE ABRIR E FECHAR 
// OPEN () {}   IRA SELECIONAR O ELEMENTO COM CLASSE MODAL-OVERLAY E APÓS ISSO
// IRÁ ADICIONAR UMA CLASSE AO ELEMENTO.

// CLOSE () {} IRA SELECIONAR O ELEMENTO COM CLASSE MODAL-OVERLAY E APÓS ISSO
// IRÁ REMOVAR UMA CLASSE DO ELEMENTO QUE NO CASO É A ACTIVE.
//const Modal = {
//    open () {
//        document.querySelector('.modal-overlay').classList.add('active');
//    },
//    close () {
//        document.querySelector('.modal-overlay').classList.remove('active');
//    }
//}

// DESSA OUTRA FORMA APENAS UMA LINHA DE CODIGO É UTILIZADA DEVIDO AO 'TOGGLE' 
// QUE TROCA CLASSES EXISTENTES

const Modal = {
    toggle () {
        document.querySelector('.modal-overlay').classList.toggle('active');
    },
};


const Transactions = {
    incomes () {},
    expenses () {},
}