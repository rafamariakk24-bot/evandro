function getUrlParams() {
    return new URLSearchParams(window.location.search);
}

function getQueryItens() {
    const urlParams = getUrlParams();
    return urlParams.get('itens') ? urlParams.get('itens').split(',') : [];
}

function getQueryTipo() {
    const urlParams = getUrlParams();
    return urlParams.get('tipo') || 'simples';
}

function getLocalInput() {
    return document.getElementById('local');
}

function getResumoPedidoElement() {
    return document.getElementById('itens-pedido');
}

function atualizarResumoPedido() {
    const itens = getQueryItens();
    const tipo = getQueryTipo();
    const localInput = getLocalInput();
    const resumoPedido = getResumoPedidoElement();
    if (!resumoPedido) return;

    const localText = localInput && localInput.value ? '<p>Local: ' + localInput.value + '</p>' : '';
    resumoPedido.innerHTML =
        '<p>Churrasqueiro: Evando</p>' +
        '<p>Itens selecionados: ' + (itens.length ? itens.join(', ') : 'Nenhum item selecionado') + '</p>' +
        '<p>Churrasqueira inclusa no serviço</p>' +
        '<p>Tipo: ' + tipo + '</p>' +
        localText;
}

function editarCardapio() {
    const itens = getQueryItens();
    const tipo = getQueryTipo();
    window.location.href = 'index.html?edit=evando&itens=' + encodeURIComponent(itens.join(',')) + '&tipo=' + encodeURIComponent(tipo);
}

function contatoWhatsApp() {
    const base = 'Olá, Evando! Gostaria de solicitar um orçamento.';
    const pessoas = document.getElementById('pessoas') ? document.getElementById('pessoas').value : '';
    const gaconetes = document.getElementById('gaconetes') ? document.getElementById('gaconetes').value : '';
    const espetinhos = document.getElementById('espetinhos') ? document.getElementById('espetinhos').value : '';
    const local = document.getElementById('local') ? document.getElementById('local').value : '';
    const itens = getQueryItens();
    const tipo = getQueryTipo();

    const infoItens = itens.length > 0 ? '\nItens selecionados: ' + itens.join(', ') : '\nNenhum item selecionado.';
    const infoTipo = tipo ? '\nTipo: ' + tipo : '';
    const infoPessoas = pessoas ? '\nNúmero de pessoas: ' + pessoas : '';
    const infoGaconetes = gaconetes ? '\nNúmero de garçons: ' + gaconetes : '';
    const infoEspetinhos = espetinhos ? '\nNúmero de espetinhos: ' + espetinhos : '';
    const infoLocal = local ? '\nLocal do evento: ' + local : '';
    const mensagem = encodeURIComponent(base + infoItens + infoTipo + infoPessoas + infoGaconetes + infoEspetinhos + infoLocal + '\nPor favor, confirme disponibilidade e detalhes.');
    const numero = '55869994038114';
    const url = 'https://wa.me/' + numero + '?text=' + mensagem;
    window.open(url, '_blank');
}

window.addEventListener('DOMContentLoaded', () => {
    atualizarResumoPedido();
    const localInput = getLocalInput();
    if (localInput) {
        localInput.addEventListener('input', atualizarResumoPedido);
    }
});

