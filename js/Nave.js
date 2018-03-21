function Nave(contexto, teclado, imagem) {
    this.contexto = contexto;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.vidas = 3;
    this.spritesheet = new Spritesheet(contexto, imagem, 3,2);
    this.imgWidth = 36;
    this.imgHeght = 48;
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
        if (this.teclado.pressionada(SETA_ESQUERDA))
          this.spritesheet.linha = 1
        if (this.teclado.pressionada(SETA_DIREITA))
          this.spritesheet.linha = 2
        else
          this.spritesheet.linha = 0;

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
    morrer: function() {
        this.vidas--;
    },
    destruirInimigo: function(inimigo) {
        this.animacao.excluirSprite(inimigo);
        this.colisor.excluirSprite(inimigo);
    },
    colidiuCom: function(outro) {
        if(outro instanceof Ovni) {

            this.morrer();
            this.destruirInimigo();

            if(this.vidas < 1 ) {
                this.animacao.desligar();
                alert("SE FODEU");
            }
            else {
                this.recomecar();
            }
        }
    },
    recomecar: function() {
      nave.x = this.contexto.canvas.width / 2 - 18;
      nave.y = this.contexto.canvas.height - 48;
    }
}
