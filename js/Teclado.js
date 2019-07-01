// SETAS
// const SETA_ESQUERDA = 37
// const SETA_DIREITA = 39
// const SETA_ACIMA = 38
// const SETA_ABAIXO = 40

// W A S D
const SETA_ESQUERDA = 65
const SETA_DIREITA = 68
const SETA_ACIMA = 87
const SETA_ABAIXO = 83
const ESPACO = 32
const SHIFT = 16
const ENTER = 13
const IGUAL = 187
const MENOS = 189

class Teclado {

  constructor(elemento) {
    // Recebe o document
    this.elemento = elemento

    // Array de teclas pressionadas
    this.pressionadas = []

    // Array de teclas disparadas
    this.disparadas = []

    // Funções de disparo
    this.funcoesDisparo = []

    // Registrando teclas no Array
    let teclado = this

    // Define a tecla pressionada como true
    elemento.addEventListener("keydown", function (evento) {
      let tecla = evento.keyCode // Tornando mais legível
      teclado.pressionadas[tecla] = true

      // Dispara somente se for o primeiro clique da tecla
      // Caso a tecla seja mantida pressionada, execução interrompida
      if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
        teclado.disparadas[tecla] = true
        // Executa a função assossiada no array
        teclado.funcoesDisparo[tecla]()
      }
    })

    // Define a tecla pressionada como false
    elemento.addEventListener("keyup", function (evento) {
      let tecla = evento.keyCode // Tornando mais legível
      teclado.pressionadas[tecla] = false
      // Torna possível disparar novamente
      teclado.disparadas[tecla] = false
    })
  }



  pressionada(tecla) {
    return this.pressionadas[tecla]
  }

  disparou(tecla, callback) {
    this.funcoesDisparo[tecla] = callback
  }

}
