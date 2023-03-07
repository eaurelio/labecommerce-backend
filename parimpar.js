const escolhatipo = process.argv[2]
const escolhanum = Number(process.argv[3])

const random = Math.floor(Math.random() * 100)

function validaParImpar(num1, num2) {
  if((num1 + num2) % 2 == 0) {
    return 'par'
  } else {
    return 'impar'
  }
}

function parImar () {
  const escolhaPC = random;
  const resultado = validaParImpar(escolhaPC, escolhanum)
  if (resultado === 'par' && escolhatipo === 'par') {
    console.log(`Você escolheu ${escolhanum} e o computador escolheu ${escolhaPC}. O resultado foi ${resultado}. Você ganhou!`)
  } else if (resultado === 'impar' && escolhatipo === 'impar') {
    console.log(`Você escolheu ${escolhanum} e o computador escolheu ${escolhaPC}. O resultado foi ${resultado}. Você ganhou!`)
  } else {
    console.log(`Você escolheu ${escolhanum} e o computador escolheu ${escolhaPC}. O resultado foi ${resultado}. Você perdeu...`)
  }
}

parImar()
