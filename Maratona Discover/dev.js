
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
//
// DESSA OUTRA FORMA APENAS UMA LINHA DE CODIGO É UTILIZADA DEVIDO AO 'TOGGLE' 
// QUE TROCA CLASSES EXISTENTES

const Modal = {
    open () {
        document.querySelector('.modal-overlay').classList.add('active');
    },

    close () {
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const transcactions = [{
    id: 1,
    description: 'aluguel',
    amount: -25000,
    date: '04/01/2021',
},
{
    id: 2,
    description: 'salario',
    amount: 150000,
    date: '04/01/2021',

},
{
    id: 3,
    description: 'iphone',
    amount: -30000,
    date: '04/01/2021',
},
]

const Transaction = {
    incomes () {
        // calcular as entradas
    },
    expenses () {
        //calcular as saídas
    },
    total () {
        // entradas - saídas 
    },
}


//SUBSTITUIR OS DADOS DO HTML COM OS DADOS DO JS
// Para isso, é possível usar a função innerHTML do java script. xD

const DOM = {
    // CONTAINER DAS TRANSAÇÕES  OU SEJA, ONDE ESTÃO AS TABELAS DAS TRANSAÇÕES.
    transactionsContainer = document.querySelector('#data-table tbody'), 

    // APÓS CRIAR DEFINIR O CONTAINER DAS TRANSAÇÕES, COM O MÉTODO DE ADICIONARR TRANSAÇÕES
    // É CRIADO O TR (LINHA DA COLUNA) E ADICIONADO O HTML NELA POR MEIO DO "innerHTML", APÓS ISSO, O CONTAINER 
    // RECEBE O TR POR MEIO DO "appendChild."
    addTransaction (transaction, index) { 
      
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction () {
        CSSclass = transaction.amount > 0 ? "income" : "expense"
      const html = ` 
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="/Maratona Discover/assets/minus.svg" alt="Remover Transação"></td>
    `
    return html
    },
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
}) 

