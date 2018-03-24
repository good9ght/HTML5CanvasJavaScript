document.addEventListener('DOMContentLoaded', function() {
    let canvas = document.getElementById("canvas");
    let contexto = canvas.getContext("2d");
    let imagens = {
        espaco: 'img/fundo-espaco.png',
        estrelas: 'img/fundo-estrelas.png',
        nuvens: 'img/fundo-nuvens.png',
        nave: 'img/nave-spritesheet.png',
        ovni: 'img/ovni.png',
        explosao: 'img/explosao.png',
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
        nave = new Nave(contexto, teclado, imagens.nave, imagens.explosao);

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
        fundoEspaco.velocidade = 60;
        fundoNuvens.velocidade = 150;
        fundoEstrelas.velocidade = 500;

        // Nave
        nave.x = ( canvas.width / 2 ) - 18;
        nave.y = canvas.height - 48;
        nave.velocidade = 200;

        // Inimigos
        gerarInimigos();

        teclado.disparou(ESPACO, () => { nave.atirar(); });
        teclado.disparou(ENTER, pausarJogo)

        animacao.ligar();
    }

    function gerarInimigos() {
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

    function pausarJogo() {
      // Pausa
      if(animacao.ligado) {
        animacao.desligar();
        ativarTiro(false);

        // Escrever "Pausado"
        contexto.save();
        contexto.fillStyle = "white";
        contexto.strokeStyle = "black";
        contexto.font = "50px sans-serif";
        contexto.fillText("Pausado", 160, 200);
        contexto.strokeText("Pausado", 160, 200);
        contexto.restore();
      }
      else {

        // Impede que um inimigo seja gerado logo após 'despausar'
        criadorInimigos.ultimoOvni = new Date();

        ativarTiro(true);
        animacao.ligar();
      }
    }

    function ativarTiro(ativar) {
      if(ativar) {
        teclado.disparou(ESPACO, function() {
          nave.atirar();
        })
      }
      else {
        teclado.disparou(ESPACO, null);
      }
    }

    function novoOvni() {
        let imgOvni = imagens.ovni;
        let ovni = new Ovni(imgOvni, contexto, imagens.explosao);
        // Mínimo: 5; máximo: 20
        ovni.velocidade = Math.floor( 5 + Math.random() * (20 - 5 + 1));
        // Mínimo: 0;
        // máximo: largura do canvas - largura do ovni
        ovni.x = Math.floor(Math.random() * (canvas.width - imgOvni.width + 1));
        // Descontar a altura
        ovni.y = -imgOvni.height;
        animacao.novoSprite(ovni);
        colisor.novoSprite(ovni);
    }

    carregarImagens();
    iniciarObjetos();

}, false);
