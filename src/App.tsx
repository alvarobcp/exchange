
import { useEffect, useState } from 'react'
import './App.css'
import { getExchangeData } from './useFetch'
import type { exchangeData } from './interfaces/dataInterface';

function App() {

  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondCurrency, setSecondCurrency] = useState("USD");

  const [rate, setRate] = useState(1);

  const [myCurrency, setMyCurrency] = useState("");
  const [converted, setConverted] = useState(0);

  const [exchangeRates, setExchangeRates] = useState<exchangeData>();

  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() =>{

    const data = async () => {
        const exchangeRates = await getExchangeData(`https://api.fxratesapi.com/latest?base=${firstCurrency}&resolution=1m&amount=1&places=6&format=json`)
        setExchangeRates(exchangeRates);
        setRate(exchangeRates.rates[secondCurrency])
        setCurrencies(Object.keys(exchangeRates.rates));
    }

    data();

  },[firstCurrency, secondCurrency])

  function handleSubmit(e: React.FormEvent){

    e.preventDefault();
    let result:number = Number(myCurrency) * rate;
    setConverted(result);

  }

  function flipCurrencies(){
    let first:string = firstCurrency;
    let second:string = secondCurrency;
    setFirstCurrency(second);
    setSecondCurrency(first);
    setConverted(0);
    setMyCurrency("");
  
  }


  return (
    <>
      <div className = "currencyContainer">
        
        <div className="formContainer">

          <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="0"
            value={myCurrency}
            onChange={(e) => setMyCurrency(e.target.value)}
          />
          
          
          
          <select value={firstCurrency} onChange={(e) => setFirstCurrency(e.target.value)}>
          <option value="">Select currency</option>
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button type="submit">Convert</button>
          <button onClick={()=> flipCurrencies()}>Flip</button>
          </form>
        </div>

        <div className="formContainer">

          {exchangeRates && <p className='convertedText'>{converted.toFixed(2)}</p>}

          <select value={secondCurrency} onChange={(e) => setSecondCurrency(e.target.value)}>
            <option value="">Select currency</option>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

        </div>

      </div>

    </>
  )
}

export default App


//https://api.fxratesapi.com/latest?base=EUR&resolution=1m&amount=1&places=6&format=json