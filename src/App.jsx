import { useState } from "react"
import CurrencyField from "./components/CurrencyField"
import useCurrencyInfo from "./hooks/useCurrencyInfo"

function App() {
  const [amount, setAmount] = useState(0)
  const [currencyFrom, setCurrencyFrom] = useState('usd')
  const [currencyTo, setCurrencyTo] = useState('pkr')

  const currencyInfo = useCurrencyInfo(currencyFrom)
  const currencyList = Object.keys(currencyInfo)

  const [convertedAmount, setConvertedAmount] = useState(0)

  const swapCurrency = () => {
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1600590711251-c439ffcc61bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN1cnJlbmN5JTIwZXhjaGFuZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80')`,}}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/20">
            <h1 className="text-2xl text-center text-gray-100 mb-6">Currency Convertor</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConvertedAmount(amount * currencyInfo[currencyTo]);
              }}
            >
                <div className="w-full mb-1">
                  <CurrencyField
                   label="From"
                   amount={ amount }
                   currencyOptions={ currencyList }
                   onCurrencyChange={ (currency) => { setCurrencyFrom(currency) } }
                   selectedCurrency={ currencyFrom }
                   onAmountChange={ (currency) => { setAmount(currency) } }
                  />
                </div>
                <div className="relative w-full h-0.5">
                  <button onClick={swapCurrency} type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-emerald-600 text-white px-2 py-0.5">
                    swap
                  </button>
                </div>
                <div className="w-full mt-1 mb-4">
                  <CurrencyField
                   label="To"
                   amount={ convertedAmount }
                   currencyOptions={ currencyList }
                   onCurrencyChange={ (currency) => setCurrencyTo(currency) }
                   selectedCurrency={ currencyTo }
                   amountDisabled={ true }
                  />
                </div>

                <button type="submit" className="w-full border hover:bg-emerald-900 text-white px-4 py-3 rounded-lg">
                  Convert {currencyFrom.toUpperCase()} to {currencyTo.toUpperCase()}
                </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
