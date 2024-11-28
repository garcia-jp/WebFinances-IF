// Função para formatar valores monetários
function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para salvar transações no LocalStorage
function salvarTransacao(transacao) {
    let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    transacoes.push(transacao);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    atualizarTela();
}

// Função para carregar transações do LocalStorage
function carregarTransacoes() {
    return JSON.parse(localStorage.getItem('transacoes')) || [];
}

// Função para atualizar a listagem de transações e o resumo financeiro
function atualizarTela() {
    const transacoes = carregarTransacoes();
    const transacoesList = document.getElementById('transacoes-list');
    const totalReceitas = transacoes.filter(t => t.categoria === 'Receita').reduce((acc, t) => acc + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.categoria === 'Despesa').reduce((acc, t) => acc + t.valor, 0);
    const saldoFinal = totalReceitas - totalDespesas;

    // Atualizar resumo financeiro
    document.getElementById('total-receitas').textContent = formatarValor(totalReceitas);
    document.getElementById('total-despesas').textContent = formatarValor(totalDespesas);
    document.getElementById('saldo-final').textContent = formatarValor(saldoFinal);

    // Atualizar tabela de transações
    transacoesList.innerHTML = '';
    transacoes.forEach((transacao, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${transacao.nome}</td>
            <td>${transacao.categoria}</td>
            <td>${new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
            <td>${formatarValor(transacao.valor)}</td>
            <td>
                <button class="edit" onclick="editarTransacao(${index})">Editar</button>
                <button class="delete" onclick="excluirTransacao(${index})">Excluir</button>
            </td>
        `;
        transacoesList.appendChild(tr);
    });
}

// Função para excluir transação
function excluirTransacao(index) {
    let transacoes = carregarTransacoes();
    transacoes.splice(index, 1);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    atualizarTela();
}

// Função para editar transação
function editarTransacao(index) {
    let transacoes = carregarTransacoes();
    const transacao = transacoes[index];

    document.getElementById('nome').value = transacao.nome;
    document.getElementById('categoria').value = transacao.categoria;
    document.getElementById('data').value = transacao.data;
    document.getElementById('valor').value = transacao.valor;

    // Alterar o evento do botão de submit para editar
    const form = document.getElementById('transacao-form');
    form.onsubmit = function(event) {
        event.preventDefault();
        transacoes[index] = {
            nome: document.getElementById('nome').value,
            categoria: document.getElementById('categoria').value,
            data: document.getElementById('data').value,
            valor: parseFloat(document.getElementById('valor').value)
        };
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
        atualizarTela();
        form.onsubmit = adicionarTransacao;  // Voltar ao comportamento original de adicionar
    };
}

// Função para adicionar transação
function adicionarTransacao(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (nome && categoria && data && valor) {
        salvarTransacao({ nome, categoria, data, valor });
    }
}

// Iniciar a aplicação
document.getElementById('transacao-form').onsubmit = adicionarTransacao;

// Carregar transações ao iniciar
atualizarTela();
