function Explosao(contexto, imagem, x, y) {
  this.spritesheet = new Spritesheet(contexto, imagem, 1, 5);
  this.spritesheet.intervalo = 75;
  this.x = x;
  this.y = y;
  let explosao = this;
  this.spritesheet.fimDoCliclo = function(explosao) {
    explosao.animacao.excluirSprite(explosao);
  }
}

Explosao.prototype = {
  atualizar: function() {
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro()
  },
  desenhar: function() {

  }
}
