const SOM_TIRO = new Audio()
SOM_TIRO.src = 'snd/tiro.mp3'
SOM_TIRO.volume = 0
SOM_TIRO.load()

class Tiro {

  constructor(context, teclado, nave) {
    this.context = context
    this.nave = nave
    this.teclado = teclado

    this.cor = "yellow"
    this.largura = 4
    this.altura = 15
    this.x = nave.x + 18
    this.y = nave.y - this.altura

    this.velocidadePadrao = 500
    this.velocidadePadrao
    this.velocidadeY = this.velocidadePadrao
    this.velocidadeX = 0

    this.executar()

    // Reiniciando o som
    SOM_TIRO.currentTime = 0.0
    SOM_TIRO.play()
  }

  atualizar() {
    this.y -= this.velocidadeY * (this.animacao.decorrido / 1000)
    this.x -= this.velocidadeX * (this.animacao.decorrido / 1000)

    // se o tiro passar do começo da tela será excluido
    if (this.y < -this.altura) {
      this.animacao.excluirSprite(this)
      this.colisor.excluirSprite(this)
    }
  }

  desenhar() {
    let context = this.context

    context.save()
    context.fillStyle = this.cor
    context.fillRect(this.x, this.y, this.largura, this.altura)
    context.restore()
  }

  retangulosColisao() {
    return [{ x: this.x, y: this.y, largura: this.largura, altura: this.altura }]
  }

  executar() {
    if (this.teclado.pressionada(SETA_ESQUERDA)) {
      if (this.teclado.pressionada(SETA_ACIMA))
        this.velocidadeX = this.velocidadePadrao

      else if (this.teclado.pressionada(SETA_ABAIXO))
        this.velocidadeX = -this.velocidadePadrao

      else if (this.teclado.pressionada(SHIFT)) {
        this.velocidadeY = 0
        this.velocidadeX = this.velocidadePadrao
        this.largura = 20
        this.altura = 4
        this.x = nave.x - 2
        this.y = nave.y - (this.altura * -2)
      }
    }

    if (this.teclado.pressionada(SETA_DIREITA)) {
      if (this.teclado.pressionada(SETA_ACIMA))
        this.velocidadeX = -this.velocidadePadrao

      else if (this.teclado.pressionada(SETA_ABAIXO))
        this.velocidadeX = +this.velocidadePadrao

      else if (this.teclado.pressionada(SHIFT)) {
        this.velocidadeY = 0
        this.velocidadeX = -this.velocidadePadrao
        this.largura = 20
        this.altura = 4
        this.x = nave.x + 18
        this.y = nave.y - (this.altura * -2)
      }
    }
  }

  colidiuCom() { }
}
