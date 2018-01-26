function Ovni(imagem, contexto) {
  this.imagem = imagem;
  this.contexto = contexto;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
}

Ovni.prototype = {
  atualizar: function() {
    this.y += this.velocidade;

    // Se o ovni chegar ao fim da tela será excluido
    if(this.y > this.contexto.canvas.height) {
      this.animacao.excluirSprite(this);
    }
  },

  desenhar: function() {
    this.contexto.drawImage(
      this.imagem,
      this.x,
      this.y,
      this.imagem.width,
      this.imagem.height
    );
  },

  retangulosColisao: function() {

  },

  colidiuCom: function(outro) {

  }
}
