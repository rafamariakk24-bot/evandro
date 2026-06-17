function getItensChurrasqueiro(churrasqueiro) {
    const lista = document.querySelectorAll(`input[id^="${churrasqueiro}-"]`);
    return Array.from(lista).map(cb => cb.value);
}

function getTipoChurrasco(churrasqueiro) {
    const select = document.getElementById(`${churrasqueiro}-tipo`);
    if (select) {
        return select.value;
    }
    const tipoRadio = document.querySelector(`input[name="${churrasqueiro}-tipo"]:checked`);
    return tipoRadio ? tipoRadio.value : 'simples';
}

function atualizarOpcoesEvando() {
    const tipo = getTipoChurrasco('evando');
    const opcoes = document.getElementById('evando-opcoes');
    if (!opcoes) return;
    opcoes.style.display = 'block';
    const extraItems = document.querySelectorAll('#evando-opcoes .evando-extra');
    extraItems.forEach(item => {
        item.style.display = tipo === 'completo' ? 'list-item' : 'none';
    });
}

function atualizarMensagemTipo() {
    const tipo = getTipoChurrasco('evando');
    const mensagem = document.getElementById('tipo-mensagem');
    if (!mensagem) return;
    const descricaoBase = 'Carnes: Picanha, Leitão, Alcatra, Carneiro, Toscana, Frango.';
    const complementosSimples = 'Complementos: Vinagrete, Farofa, Pão com alho, Queijo, Abacaxi, Cebola, Carvão.';
    const complementosCompleto = 'Complementos: Vinagrete, Farofa, Pão com alho, Queijo, Abacaxi, Cebola, Carvão, Maria Isabel, Arroz Branco, Salada, Paçoca.';
    if (tipo === 'simples') {
        mensagem.innerHTML = `<strong>Churrasco simples</strong> — indicado para 40 pessoas ou mais.<br>${descricaoBase} ${complementosSimples}`;
    } else {
        mensagem.innerHTML = `<strong>Churrasco completo</strong> — indicado para 50 pessoas ou mais.<br>${descricaoBase} ${complementosCompleto}`;
    }
    mensagem.style.display = 'block';
    atualizarOpcoesEvando();
}

function atualizarSelecao(churrasqueiro) {
    const checkboxes = document.querySelectorAll(`input[id^="${churrasqueiro}-"]:checked`);
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    const resumo = document.getElementById(`${churrasqueiro}-selecionados`);
    if (!resumo) return;
    resumo.textContent = itensSelecionados.length > 0 ? 'Selecionado: ' + itensSelecionados.join(', ') : 'Nenhum item selecionado';
}

function escolherCardapio(churrasqueiro) {
    const tipo = getTipoChurrasco(churrasqueiro);
    const itens = getItensChurrasqueiro(churrasqueiro);
    if (itens.length === 0) {
        alert('Este churrasqueiro ainda não tem itens no cardápio.');
        return;
    }
    window.location.href = 'orcamento.html?churrasqueiro=' + encodeURIComponent(churrasqueiro) + '&itens=' + encodeURIComponent(itens.join(',')) + '&tipo=' + encodeURIComponent(tipo);
}

function selecionarItens(churrasqueiro) {
    const tipo = getTipoChurrasco(churrasqueiro);
    const checkboxes = document.querySelectorAll(`input[id^="${churrasqueiro}-"]:checked`);
    const itensSelecionados = Array.from(checkboxes).map(cb => cb.value);
    if (itensSelecionados.length === 0) {
        alert('Selecione pelo menos um item!');
        return;
    }
    const listaItens = itensSelecionados.join(',');
    window.location.href = 'orcamento.html?churrasqueiro=' + encodeURIComponent(churrasqueiro) + '&itens=' + encodeURIComponent(listaItens) + '&tipo=' + encodeURIComponent(tipo);
}

window.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const editChurrasqueiro = urlParams.get('edit');
    const editItens = urlParams.get('itens') ? urlParams.get('itens').split(',') : [];
    const editTipo = urlParams.get('tipo');
    if (editTipo) {
        const tipoSelect = document.getElementById('evando-tipo');
        if (tipoSelect) {
            tipoSelect.value = editTipo;
        }
    }
    if (editChurrasqueiro && editItens.length > 0) {
        editItens.forEach(item => {
            const checkbox = document.querySelector(`input[value="${item}"][id^="${editChurrasqueiro}-"]`);
            if (checkbox) checkbox.checked = true;
        });
        window.location.hash = '#evando';
    }
    atualizarSelecao('evando');
    atualizarMensagemTipo();
    const evandoCheckboxes = document.querySelectorAll('input[id^="evando-"]');
    evandoCheckboxes.forEach(cb => cb.addEventListener('change', () => atualizarSelecao('evando')));
    const evandoTipoSelect = document.getElementById('evando-tipo');
    if (evandoTipoSelect) {
        evandoTipoSelect.addEventListener('change', atualizarMensagemTipo);
    }
});

