function Spritesheet(contexto, imagem, linhas, colunas) {
  this.contexto = contexto;
  this.imagem = imagem;
  this.linhas = linhas;
  this.colunas = colunas;
  this.intervalo = 0;
  this.linha = 0;
  this.coluna = 0;
  this.larguraQuadro;
  this.alturaQuadro;
  this.fimDoCliclo = null;
}

Spritesheet.prototype = {
  proximoQuadro: function() {
    // Momento atual
    let agora = new Date().getTime();

    // Se não tem o ultimo tempo medido
    if(!this.ultimoTempo) {
      this.ultimoTempo = agora;
    }

    // Se é hora de mudar de coluna
    if(agora - this.ultimoTempo < this.intervalo) return;

    // Se a coluna não for a ultima
    if(this.coluna < this.colunas - 1) {
      // passa para a próxima coluna
      this.coluna++;
    }
    // Se for a ultima
    else{
      // voltará para a primeira
      this.coluna = 0;

      // Quando acabar o ciclo
      if(this.fimDoCliclo) this.fimDoCliclo();
    }
  },
  desenhar: function(x, y) {
    this.larguraQuadro = this.imagem.width / this.colunas;
    this.alturaQuadro = this.imagem.height / this.linhas;


    this.contexto.drawImage(
      this.imagem,
      this.larguraQuadro * this.coluna,
      this.alturaQuadro * this.linha,
      this.larguraQuadro,
      this.alturaQuadro,
      x,
      y,
      this.larguraQuadro,
      this.alturaQuadro
    );
  }
}
