function salvar_cadastro(){
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;
    const valor = document.getElementById("valor").value;
    const item = {
        descricao,
        categoria,
        data,
        valor, 
    }
    const lista = JSON.parse(localStorage.getItem("webFinance")) ?? [];
    lista.push(item)
    dados = JSON.stringify(lista)
    console.log(dados)
    localStorage.setItem("webFinance", dados)
}

