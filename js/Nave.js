function Nave(contexto, teclado, imagem, imgExplosao) {
    this.contexto = contexto;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.vidas = 3;
    this.imgWidth = 36;
    this.imgHeght = 48;
    this.spritesheet = new Spritesheet(contexto, imagem, 3,2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
    this.imgExplosao = imgExplosao;
}

Nave.prototype = {
    atualizar: function() {

        let incremento = this.velocidade * ( this.animacao.decorrido / 1000 );

        if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
            this.x -= incremento;

        if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.contexto.canvas.width - this.imgWidth)
            this.x += incremento;

        if(this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
            this.y -= incremento;

        if(this.teclado.pressionada(SETA_ABAIXO) && this.y < this.contexto.canvas.height - this.imgHeght)
            this.y += incremento;

    },

    desenhar: function() {
        if (this.teclado.pressionada(SETA_ESQUERDA)) {
          this.spritesheet.linha = 1;
        }
        else if (this.teclado.pressionada(SETA_DIREITA)) {
          this.spritesheet.linha = 2;
        }
        else {
          this.spritesheet.linha = 0;
        }

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },

    atirar: function() {
        let tiro = new Tiro(this.contexto, this.teclado, this);
        this.animacao.novoSprite(tiro);
        this.colisor.novoSprite(tiro);
    },

    retangulosColisao: function() {
        let retangulos =
        [
            {x: this.x + 2,  y: this.y + 19, largura: 9,  altura: 13},
            {x: this.x + 13, y: this.y + 3,  largura: 10, altura: 33},
            {x: this.x + 25, y: this.y + 19, largura: 9,  altura: 13}
        ];

        // Mostrando a hitbox
        // for(let i in retangulos) {
        //   this.contexto.save();
        //   this.contexto.strokeStyle = "yellow";
        //   this.contexto.strokeRect(
        //       retangulos[i].x,
        //       retangulos[i].y,
        //       retangulos[i].largura,
        //       retangulos[i].altura
        //   );
        //
        //   this.contexto.restore();
        // }

        return retangulos;
    },
    colidiuCom: function(outro) {
        // Se colidiu com um Ovni...
        if(outro instanceof Ovni) {

            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);

            let explosao1 = new Explosao(
              this.contexto, this.imgExplosao, outro.x, outro.y);

            let explosao2 = new Explosao(
              this.contexto, this.imgExplosao, this.x, this.y);

            this.animacao.novoSprite(explosao1);
            this.animacao.novoSprite(explosao2);

            let nave = this;
            this.vidas--;
            if(this.vidas < 1 ) {
              explosao1.fimDaExplosao = function() {
                nave.animacao.desligar();
                alert("SE FODEU");
              }
            }

            this.recomecar();
        }
    },
    recomecar: function() {
      this.x = this.contexto.canvas.width / 2 - 18;
      this.y = this.contexto.canvas.height - 48;
    }
}
