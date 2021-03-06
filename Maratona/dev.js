
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

// DARK MODE // 

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    bg: getStyle(html, "--bg"),
    bgHeader: getStyle(html, "--bg-header"),
    bgHeadings: getStyle(html, "--bg-headings"),
    bgTotal: getStyle(html, "--bg-total"),
}
const darkMode = {
    bg: "#010409",
    bgHeader: "#333333",
    bgHeadings: "#009585",
    bgTotal:"#009585",
}


const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}
checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})








const Modal = {
    toggle() {
        document.querySelector('.modal-overlay').classList.toggle('active')
    },
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}


const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload() // chamado para reiniciar a aplicação e adicinar novas transações.
    },
    remove(index) {
        // splice identifica o número do array.
        Transaction.all.splice(index, 1)
        // reinicia a aplicação para que a transação seja removida do HTML.
        App.reload()
    },

    incomes() {
        let income = 0;
        // calcular as entradas, para isso eu devo:
        // pegar todas as transações,
        Transaction.all.forEach(function (transaction) {
            // para cada transação, verificar quais são maior que 0 (positivas)
            if (transaction.amount > 0) {
                // somar a uma varíavel e retorna-la  
                income = income + transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        // calcular as saídas, para isso eu devo:
        // pegar todas as transações,
        Transaction.all.forEach(function (transaction) {
            // para cada transação eu verifico quais saõ menores que 0 (negativas)
            if (transaction.amount < 0) {
                // somo a uma variavel e retorno ela.
                expense = expense + transaction.amount;
            }
        })
        return expense;
    },

    total() {
        // subtrair as entradas das saidas 
        return Transaction.incomes() + Transaction.expenses();
    },
}

//SUBSTITUIR OS DADOS DO HTML COM OS DADOS DO JS
// Para isso, é possível usar a função innerHTML do java script. xD

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'), // CONTAINER DAS TRANSAÇÕES  OU SEJA, ONDE ESTÃO AS TABELAS DAS TRANSAÇÕES. APÓS CRIAR DEFINIR O CONTAINER DAS TRANSAÇÕES, COM O MÉTODO DE ADICIONARR TRANSAÇÕES É CRIADO O TR (LINHA DA COLUNA) E ADICIONADO O HTML NELA POR MEIO DO "innerHTML", APÓS ISSO, O CONTAINER RECEBE O TR POR MEIO DO "appendChild."

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)  // "appendChield" utilizado.
    },
    innerHTMLTransaction(transaction, index) {
        CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)
        const html = ` 
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img onclick="Transaction.remove(${index})"src="/Maratona/assets/minus.svg" alt="Remover Transação">
            </td>
        `
        return html
    },
   
    updateBalance() {
        // selecionar os elementos no HTML e trocar as informações pelo JS.
        // o Utils é utilizado para formatar os números na moeda brasileira.  
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    },
}
const Utils = {
    formatAmount(value) {
        value = value * 100
        return Math.round(value)
    },

    formatDate(date) {
        const splittedDate = date.split("-") // O SPLIT É USADO EM STRINGS PARA FAZER SEPARAÇÕES
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    // METODO PARA CONVERTER O VALOR EM REAIS//
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""  // adicionar sinais de subtração
        value = String(value).replace(/\D/g, "") // transformar o value em string e selecionar os numeros
        value = Number(value) / 100  // dividir os numeros por 100
        value = value.toLocaleString('pt-br', {  // função 'toLocaleString' para formatar os valores 
            // no padrão brasileiro.
            style: "currency",
            currency: "BRL"
        })
        return signal + value // o método retorna o valor convertido e concateia com o signal.
    },
}

const Form = {
    // SELECIONAR NO DOCUMENTO OS ESPAÇOS PARA SEREM PREENCHIDOS.
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    // PEGAR OS VALORES PREENCHIDOS.
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFilds() {
        // tirar do objeto os valores preenchidos para validar os dados.
        const { description, amount, date } = Form.getValues()

        // verificar se os dados estão vazios
        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Dados incompletos, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return {
            description,
            amount,
            date
        }

    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        try {
            Form.validateFilds() //verificar se todas as informações foram preenchidas.
            const transaction = Form.formatValues() // formatar os dados preenchidos para salvar.
            Transaction.add(transaction) // salvar os dados, atualizar a aplicação com a nova transação.
            Form.clearFields()  // apagar os dados preenchidos do formulário.
            Modal.toggle()  // fechar o modal do formulário.

        } catch (error) {
            alert(error.message)
        }
        event.preventDefault() // não fazer a definição padrão do formulário.
    },
}

const App = { // INICIALIZAÇÃO E REINICIALIZAÇÃO DA APLICAÇÃO. //
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload() { // RELOAD, REFAZ A POPULAÇÃO DAS TRANSAÇÕES E DO BALANÇO, ADICIONANDO O QUE FOR NOVO.
        DOM.clearTransactions()
        App.init()
    },
}

// CHAMADAS // 

App.init()

