class Ovni {

    constructor(imagem, contexto, imgExplosao) {
        this.imagem = imagem;
        this.contexto = contexto;
        this.x = 0;
        this.y = 0;
        this.velocidade = 0;
        this.imgExplosao = imgExplosao;
    }

    atualizar() {

        this.y += this.velocidade * ( this.animacao.decorrido / 1000 );

        // Se o ovni chegar ao fim da tela será excluido
        if(this.y > this.contexto.canvas.height) {
        this.animacao.excluirSprite(this);
        this.colisor.excluirSprite(this);
        }
    }

    desenhar() {
        this.contexto.drawImage(
        this.imagem,
        this.x,
        this.y,
        this.imagem.width,
        this.imagem.height
        );
    }

    retangulosColisao() {
        let retangulos = [
            {x: this.x + 20, y: this.y + 1, largura: 25, altura: 10 },
            {x: this.x + 2, y: this.y + 11, largura: 60, altura: 12 },
            {x: this.x + 20, y: this.y + 23, largura: 25, altura: 7 },
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
    }

    colidiuCom(outro) {
        if (outro instanceof Tiro) {
            // Removendo a nave e o tiro da tela
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);

            // Explosão
            let explosao = new Explosao(this.contexto, this.imgExplosao, this.x, this.y);
            this.animacao.novoSprite(explosao);
        }
    }
}
