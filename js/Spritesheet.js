class Spritesheet {

  constructor(context, imagem, linhas, colunas) {
    this.context = context
    this.imagem = imagem
    this.linhas = linhas
    this.colunas = colunas
    this.intervalo = 0
    this.linha = 0
    this.coluna = 0
    this.fimDoCliclo = null
  }

  proximoQuadro() {
    // Momento atual
    let agora = new Date().getTime()

    // Se não tem o ultimo tempo medido
    if (!this.ultimoTempo) this.ultimoTempo = agora

    // Se é hora de mudar de coluna
    if (agora - this.ultimoTempo < this.intervalo) return

    // Se a coluna não for a ultima
    if (this.coluna < this.colunas - 1) {
      // passa para a próxima coluna
      this.coluna++
    }
    // Se for a ultima
    else {
      // voltará para a primeira
      this.coluna = 0

      // Quando acabar o ciclo
      if (this.fimDoCliclo) this.fimDoCliclo()
    }

    // Guardar hora da última mudança
    this.ultimoTempo = agora

  }

  desenhar(x, y) {
    let larguraQuadro = this.imagem.width / this.colunas
    let alturaQuadro = this.imagem.height / this.linhas


    this.context.drawImage(
      this.imagem,
      larguraQuadro * this.coluna,
      alturaQuadro * this.linha,
      larguraQuadro,
      alturaQuadro,
      x,
      y,
      larguraQuadro,
      alturaQuadro
    )
  }
}
