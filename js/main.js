document.addEventListener('DOMContentLoaded', function() {
    let canvas = document.getElementById("canvas");
    let contexto = canvas.getContext("2d");
    let imagens = {
        espaco: 'img/fundo-espaco.png',
        estrelas: 'img/fundo-estrelas.png',
        nuvens: 'img/fundo-nuvens.png',
        nave: 'img/nave.png',
        ovni: 'img/ovni.png',
    }
    let imagensCarregadas = 0;
    let totalImagens = 0;
    let animacao;
    let teclado;
    let fundoEspaco;
    let fundoNuvens;
    let fundoEstrelas;
    let nave;
    let colisor;
    let criadorInimigos;


    function carregarImagens() {
        for(let key in imagens) {
            let img = new Image();
            img.src = imagens[key];
            imagens[key] = img;
            totalImagens++;
        }
    }

    function carregando() {
        imagensCarregadas++;
        if(imagensCarregadas == totalImagens) iniciarObjetos();
    }

    function iniciarObjetos() {
        animacao = new Animacao(contexto);
        teclado = new Teclado(document);
        colisor = new Colisor();

        fundoEspaco = new Fundo(contexto, imagens.espaco);
        fundoEstrelas = new Fundo(contexto, imagens.estrelas);
        fundoNuvens = new Fundo(contexto, imagens.nuvens);
        nave = new Nave(contexto, teclado, imagens.nave);

        animacao.novoSprite(fundoEspaco);
        animacao.novoSprite(fundoEstrelas);
        animacao.novoSprite(fundoNuvens);
        animacao.novoSprite(nave);


        colisor.novoSprite(nave);
        animacao.novoProcessamento(colisor);

        configuracoesIniciais();
    }

    function configuracoesIniciais() {
        // Fundos
        fundoEspaco.velocidade = 3;
        fundoNuvens.velocidade = 5;
        fundoEstrelas.velocidade = 10;

        // Nave
        nave.x = canvas.width / 2 - imagens.nave.width / 2;
        nave.y = canvas.height - imagens.nave.height;
        nave.velocidade = 5;

        teclado.disparou(ESPACO, function() { nave.atirar(); });

        animacao.ligar();
    }

    function criacaoInimigos() {
        criadorInimigos = {
            ultimoOvni: new Date().getTime(),
            processar: function() {
                let agora = new Date().getTime();
                decorrido = agora - this.ultimoOvni;

                if(decorrido > 1000) {
                    novoOvni();
                    this.ultimoOvni = agora;
                }
            }
        };
        animacao.novoProcessamento(criadorInimigos);
    }

    function novoOvni() {
        let ovni = new Ovni(imagens.ovni, contexto);

        // Mínimo: 5; máximo: 20
        ovni.velocidade = Math.floor(5 + Math.random() * (20 - 5 + 1));
        // Mínimo: 0;
        // máximo: largura do canvas - largura do ovni
        ovni.x = Math.floor(Math.random() * (canvas.width - imagens.ovni.width + 1));
        ovni.y = + imagens.ovni.height;

        animacao.novoSprite(ovni);
        colisor.novoSprite(ovni);
    }

    function aleatorio(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    carregarImagens();
    iniciarObjetos();
    criacaoInimigos();

}, false);
