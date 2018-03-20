function Fundo(contexto, imagem) {
  this.contexto = contexto;
  this.imagem = imagem;
  this.velocidade = 0;
  this.posicaoEmenda = 0;
}

Fundo.prototype = {
  atualizar: function() {
    // px/s  - pixels por segundo
    this.posicaoEmenda += this.velocidade * (this.animacao.decorrido / 1000);

    if (this.posicaoEmenda > this.imagem.height)
      this.posicaoEmenda = 0;
  },

  desenhar: function() {
    let img = this.imagem;

    let posicaoY = this.posicaoEmenda - img.height;
    this.contexto.drawImage(img, 0, posicaoY, img.width, img.height);

    posicaoY = this.posicaoEmenda;
    this.contexto.drawImage(img, 0, posicaoY, img.width, img.height);
  }
}
