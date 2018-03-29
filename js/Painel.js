class Painel {

    constructor(contexto, nave) {
        this.contexto = contexto;
        this.nave = nave;
        this.pontuacao = 0;
        this.spritesheet = new Spritesheet(contexto, nave.imagem, 3, 2);
        this.spritesheet.linha = 0;
        this.spritesheet.coluna = 0;
    }

    atualizar() {}

    desenhar() {
        // Reduz o desenho pela metade
        this.contexto.scale(0.5, 0.5);

        let x = 20;
        let y = 20;

        for(let i = 1; i <= this.nave.vidas; i++) {
            this.spritesheet.desenhar(x, y);
            x += 40;
        }

        // Faz os próximos desenhos serem desenhados no tamanho normal
        this.contexto.scale(2, 2);

        // Pontuação
        this.contexto.save();
        this.contexto.fillStyle = 'white';
        this.contexto.font = '18px sans-serif';
        this.contexto.fillText(this.pontuacao, 100, 27);
        this.contexto.restore();
    }
}
