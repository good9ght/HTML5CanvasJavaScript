const SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0;
SOM_EXPLOSAO.load();

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

  SOM_EXPLOSAO.currentTime = 0;
  SOM_EXPLOSAO.play();

}

Explosao.prototype = {
  atualizar: function() {
  },
  desenhar: function() {
    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
  }
}
