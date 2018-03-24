function Explosao(contexto, imagem, x, y) {
  this.spritesheet = new Spritesheet(contexto, imagem, 1, 5);
  this.spritesheet.intervalo = 75;
  this.x = x;
  this.y = y;
  this.fimDaExplosao = null;
  var explosao = this;
  this.spritesheet.fimDoCliclo = function() {
    explosao.animacao.excluirSprite(explosao);
    if(explosao.fimDaExplosao) explosao.fimDaExplosao();
  }
}

Explosao.prototype = {
  atualizar: function() {
  },
  desenhar: function() {
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
  }
}
