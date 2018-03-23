function Tiro(contexto, teclado, nave) {
  this.contexto = contexto;
  this.nave = nave;
  this.teclado = teclado;

  this.cor = "yellow";
  this.largura = 4;
  this.altura = 15;
  this.x = nave.x + 18;
  this.y = nave.y - this.altura;

  this.velocidadePadrao = 10;
  this.velocidadePadrao;
  this.velocidadeY = this.velocidadePadrao;
  this.velocidadeX = 0;

  this.executar();
}

Tiro.prototype = {
  atualizar: function() {
    this.y -= this.velocidadeY * ( this.animacao.decorrido / 1000 );
    this.x -= this.velocidadeX * ( this.animacao.decorrido / 1000 );

    // se o tiro passar do começo da tela será excluido
    if(this.y < -this.altura) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }
  },

  desenhar: function() {
    let contexto = this.contexto;

    contexto.save();
    contexto.fillStyle = this.cor;
    contexto.fillRect(this.x, this.y, this.largura, this.altura);
    contexto.restore();
  },

  retangulosColisao: function() {
    return [{x: this.x, y: this.y, largura: this.largura, altura: this.altura}];
  },
  executar: function() {
    if(this.teclado.pressionada(SETA_ESQUERDA)) {
        if(this.teclado.pressionada(SETA_ACIMA))
            this.velocidadeX = this.velocidadePadrao;

        else if(this.teclado.pressionada(SETA_ABAIXO))
            this.velocidadeX = -this.velocidadePadrao;

        else if(this.teclado.pressionada(SHIFT)) {
            this.velocidadeY = 0;
            this.velocidadeX = this.velocidadePadrao;
            this.largura = 20;
            this.altura = 4;
            this.y = nave.y + (nave.imagem.height / 2);
            this.x = nave.x - nave.imagem.width/2;
        }
    }

    if(this.teclado.pressionada(SETA_DIREITA)) {
        if(this.teclado.pressionada(SETA_ACIMA))
            this.velocidadeX = -this.velocidadePadrao;

        else if(this.teclado.pressionada(SETA_ABAIXO))
            this.velocidadeX = +this.velocidadePadrao;

        else if(this.teclado.pressionada(SHIFT)) {
            this.velocidadeY = 0;
            this.velocidadeX = -this.velocidadePadrao;
            this.largura = 20;
            this.altura = 4;
            this.y = nave.y + (nave.imagem.height / 2);
            this.x = nave.x + nave.imagem.width;
        }
    }
  },
  colidiuCom: function() {}
}
