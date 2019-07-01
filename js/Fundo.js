class Fundo {

  constructor(context, imagem) {
    this.context = context
    this.imagem = imagem
    this.velocidade = 0
    this.posicaoEmenda = 0
  }

  atualizar() {
    // px/s  - pixels por segundo
    this.posicaoEmenda += this.velocidade * (this.animacao.decorrido / 1000)

    if (this.posicaoEmenda > this.imagem.height)
      this.posicaoEmenda = 0
  }

  desenhar() {
    let img = this.imagem

    let posicaoY = this.posicaoEmenda - img.height
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)

    posicaoY = this.posicaoEmenda
    this.context.drawImage(img, 0, posicaoY, img.width, img.height)
  }

}
