class Nave {

  constructor(context, teclado, imagem, imgExplosao) {
    this.context = context
    this.teclado = teclado
    this.imagem = imagem
    this.x = 0
    this.y = 0
    this.velocidade = 0
    this.spritesheet = new Spritesheet(context, imagem, 3, 2)
    this.spritesheet.linha = 0
    this.spritesheet.intervalo = 100
    this.imgExplosao = imgExplosao
    this.acabaramVidas = null
    this.vidas = 3
    this.imgWidth = 36
    this.imgHeght = 48
  }


  atualizar() {

    let incremento = this.velocidade * this.animacao.decorrido / 1000

    if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
      this.x -= incremento

    if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imgWidth)
      this.x += incremento

    if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
      this.y -= incremento

    if (this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.imgHeght)
      this.y += incremento

  }

  desenhar() {
    if (this.teclado.pressionada(SETA_ESQUERDA)) {
      this.spritesheet.linha = 1
    }
    else if (this.teclado.pressionada(SETA_DIREITA)) {
      this.spritesheet.linha = 2
    }
    else {
      this.spritesheet.linha = 0
    }

    this.spritesheet.desenhar(this.x, this.y)
    this.spritesheet.proximoQuadro()
  }

  atirar() {
    let tiro = new Tiro(this.context, this.teclado, this)
    this.animacao.novoSprite(tiro)
    this.colisor.novoSprite(tiro)
  }

  retangulosColisao() {
    let retangulos =
      [
        { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
        { x: this.x + 13, y: this.y + 3, largura: 10, altura: 33 },
        { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
      ]

    // Mostrando a hitbox
    this.showHitbox(retangulos)

    return retangulos
  }

  colidiuCom(outro) {
    // Se colidiu com um Ovni...
    if (outro instanceof Ovni) {

      let nave = this
      this.animacao.excluirSprite(outro)
      this.colisor.excluirSprite(outro)
      this.animacao.excluirSprite(nave)
      this.colisor.excluirSprite(nave)

      let explosaoNave = new Explosao(
        this.context, this.imgExplosao, outro.x, outro.y)

      let explosao2 = new Explosao(
        this.context, this.imgExplosao, this.x, this.y)

      this.animacao.novoSprite(explosaoNave)
      this.animacao.novoSprite(explosao2)

      explosaoNave.fimDaExplosao = function () {
        nave.vidas--
        if (nave.vidas < 0) {
          if (nave.acabaramVidas) nave.acabaramVidas()
        }
        else {
          nave.animacao.novoSprite(nave)
          nave.colisor.novoSprite(nave)
          nave.posicionar()
        }
      }
    }
  }

  posicionar() {
    this.x = this.context.canvas.width / 2 - 18
    this.y = this.context.canvas.height - 48
  }

  showHitbox(retangulos) {
    for (let i in retangulos) {
      this.context.save()
      this.context.strokeStyle = "yellow"
      this.context.strokeRect(
        retangulos[i].x,
        retangulos[i].y,
        retangulos[i].largura,
        retangulos[i].altura
      )

      this.context.restore()
    }
  }
}
