function carregarDados(){
    const itensLista = document.getElementById("transacoes-list");
    const lista = JSON.parse(localStorage.getItem("webFinance")) ?? [];

    lista.forEach(element => {
        const newLine = document.createElement("tr");

        newLine.innerHTML = `
        <tr>
        <td>${element.descricao}</td>
        <td>${element.categoria}</td>
        <td>${new Date(element.data).toLocaleDateString('pt-BR')}</td>
        <td>${element.valor}</td>
        <td></td>
        </tr>
        `
        
        itensLista.appendChild(newLine);
    });

}

carregarDados();