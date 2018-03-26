const SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.3;
SOM_EXPLOSAO.load();

class Explosao {

    constructor(contexto, imagem, x, y) {
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

    atualizar() {}

    desenhar() {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
}
