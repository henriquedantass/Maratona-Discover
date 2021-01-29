const Modal = {
    open (){
        //ABRIR MODAL
        //ADICIONAR A CLASS ACTIVE AO MODAL
        document
        .querySelector('.modal-overlay')
        .classList.add('active')
    },

    close() {
        //FECHAR MODAL
        //REMOVER A CLASS ACTIVE DO MODAL
        document.querySelector('.modal-overlay')
        .classList.remove('active')
        
    }
}