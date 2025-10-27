// cotações de moedas do dia
const USD = 5.40
const EUR = 6.25
const GBP = 7.22

// obtendo os elementos
const form = document.querySelector('form')
const amountInput = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// manipular o input para receber só números e separador decimal
amountInput.addEventListener("input", () => {
  // permite apenas dígitos, vírgula e ponto
  amountInput.value = amountInput.value.replace(/[^\d.,]/g, "")
})

// captura do evento submit (enviar) do form
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const raw = amountInput.value.trim()
  if (!raw) return

  // normaliza vírgula para ponto para converter corretamente
  const value = Number(raw.replace(',', '.'))
  if (Number.isNaN(value)) {
    alert("Valor inválido")
    return
  }

  switch (currency.value) {
    case "USD":
      convertCurrency(value, USD, "US$")
      break

    case "EUR":
      convertCurrency(value, EUR, "€")
      break

    case "GBP":
      convertCurrency(value, GBP, "£")
      break

    default:
      return
  }
})

// função para converter a moeda
function convertCurrency(amountValue, price, symbol) {
  try {
    // exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    const total = amountValue * price

    if (Number.isNaN(total)) {
      throw new Error("O valor informado não é um número")
    }

    result.textContent = `${formatCurrencyBRL(total)}`
    // aplica a classe que exibe o footer p/ mostrar o resultado
    footer.classList.add('show-result')
  } catch (error) {
    console.error(error)
    footer.classList.remove("show-result")
    alert("Não foi possível converter. Tente novamente.")
  }
}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}