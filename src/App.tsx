import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { getExchangeData } from './useFetch';
import type { chartData } from './interfaces/dataInterface';

import './App.css';

//Por hacer: Diseño responsive en móviles!

function App() {
  //Monedas a intercambiar, por defecto EUR a USD
  const [firstCurrency, setFirstCurrency] = useState('EUR');
  const [secondCurrency, setSecondCurrency] = useState('USD');

  //Ratio de intercambio
  const [rate, setRate] = useState(1);

  //Control de las variables y sus datos
  const [myCurrency, setMyCurrency] = useState('');
  const [converted, setConverted] = useState(0);
  const [isConverted, setIsConverted] = useState(false);

  //Arrays con el tipado
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [chartData, setCharData] = useState<chartData[]>([]);

  //Sacamos la info de la API (Solo el ratio de cambio, no me permite más)
  //La API utilizada es https://api.fxratesapi.com/
  useEffect(() => {
    const data = async () => {
      const exchangeRates = await getExchangeData(
        `https://api.fxratesapi.com/latest?base=${firstCurrency}&resolution=1m&amount=1&places=6&format=json`
      );

      setRate(exchangeRates.rates[secondCurrency]);
      setCurrencies(Object.keys(exchangeRates.rates));
    };

    data();
  }, [firstCurrency, secondCurrency]);

  //Función del botón Cambio
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let result: number = Number(myCurrency) * rate;
    setConverted(result);
    setIsConverted(true);
    setCharData(inventRates(rate));
  }

  //Función del botón Flip
  function flipCurrencies() {
    let first: string = firstCurrency;
    let second: string = secondCurrency;
    setFirstCurrency(second);
    setSecondCurrency(first);
    setConverted(0);
    setMyCurrency('');
    setIsConverted(false);
  }

  //Los datos de la tabla están inventados porque la API me pide suscripción de pago.
  //esto cambiarlo
  function inventRates(rateNow: number): chartData[] {
    let charInvented: chartData[] = [
      { name: '2019', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2020', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2021', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2022', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2023', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2024', Ratio: Number((rateNow + (Math.random() - 0.05)).toFixed(2)) },
      { name: '2025', Ratio: Number(rateNow.toFixed(2)) },
    ];

    return charInvented;
  }

  return (
    <>
      {/* Fondos de la web */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 10%, #f0f9ff 20%, #ecf8fe 60%, #93c5fd 100%)',
        }}
      />
      {/* Componentes y elementos */}
      <div className="flex flex-col gap-4">
        <h1 className="m-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text font-sans text-5xl font-bold text-transparent md:m-8 md:text-7xl">
          Conversor de divisas
        </h1>

        <div className="mx-8 font-sans text-3xl md:mx-0 md:text-4xl">
          <form onSubmit={handleSubmit}>
            <p className="pb-3 text-3xl font-semibold text-blue-500">¿Qué quieres cambiar? 🤑</p>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
              <p>Quiero cambiar </p>
              <select
                className="w-20 rounded-2xl border-2 border-gray-800 bg-gradient-to-bl from-blue-200 to-cyan-200 text-center text-2xl text-gray-900"
                value={firstCurrency}
                onChange={(e) => {
                  setFirstCurrency(e.target.value);
                  setConverted(0);
                  setMyCurrency('');
                  setIsConverted(false);
                }}
              >
                <option className="" value="">
                  ---
                </option>
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p>a</p>
              <select
                className="w-20 rounded-2xl border-2 border-gray-800 bg-gradient-to-bl from-blue-200 to-cyan-200 text-center text-2xl text-gray-900"
                value={secondCurrency}
                onChange={(e) => {
                  setSecondCurrency(e.target.value);
                  setConverted(0);
                  setMyCurrency('');
                  setIsConverted(false);
                }}
              >
                <option value="">Select</option>
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-2.5 py-2.5 text-center text-xl font-normal text-white transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={() => flipCurrencies()}
              >
                <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <g id="evaFlip2Fill0">
                    <g id="evaFlip2Fill1">
                      <path
                        id="evaFlip2Fill2"
                        fill="#fff"
                        d="M6.09 19h12l-1.3 1.29a1 1 0 0 0 1.42 1.42l3-3a1 1 0 0 0 0-1.42l-3-3a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.42l1.3 1.29h-12a1.56 1.56 0 0 1-1.59-1.53V13a1 1 0 0 0-2 0v2.47A3.56 3.56 0 0 0 6.09 19Zm-.3-9.29a1 1 0 1 0 1.42-1.42L5.91 7h12a1.56 1.56 0 0 1 1.59 1.53V11a1 1 0 0 0 2 0V8.53A3.56 3.56 0 0 0 17.91 5h-12l1.3-1.29a1 1 0 0 0 0-1.42a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 0 1.42Z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </div>

            <p className="pt-5 text-3xl font-semibold text-blue-500">¿Cuánto quieres cambiar? 💰</p>

            <div className="flex items-center justify-center gap-3">
              <input
                id="exhange-input"
                className="w-52 border-b-2 border-solid border-[#2B3040] px-4 py-3 text-center transition-colors duration-100 outline-none focus:border-[#596A95]"
                type="number"
                placeholder="100"
                value={myCurrency}
                onChange={(e) => setMyCurrency(e.target.value)}
              />
            </div>

            {isConverted ? (
              <div className="mx-auto my-5 mt-6 w-fit justify-center rounded-2xl p-5">
                <p className="">
                  {' '}
                  Tienes{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text font-medium text-transparent">
                    {converted.toFixed(2)}
                  </span>{' '}
                  {secondCurrency}
                </p>
                <p className="mt-2 text-2xl">Ratio de cambio: {rate.toFixed(2)}</p>
                {/* He usado recharts (https://www.npmjs.com/package/recharts) */}
                <div className="mx-auto my-5 mt-6 h-[300px] w-full max-w-2xl rounded-2xl p-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} className="mt-10 -ml-5 sm:-ml-8">
                      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                      <Line type="linear" dataKey="Ratio" stroke="#1e40af" strokeWidth={2} />
                      <XAxis
                        tick={{
                          fontFamily: 'Geist, sans-serif',
                          fontSize: 14,
                          fill: '#06b6d4',
                          dy: 10,
                        }}
                        dataKey="name"
                        className="mr-2 text-sm font-medium"
                      />
                      <YAxis
                        tick={{
                          fontFamily: 'Geist, sans-serif',
                          fontSize: 14,
                          fill: '#06b6d4',
                          dx: -10,
                        }}
                        className="mt-2 text-sm font-medium"
                      />
                      <Tooltip labelClassName="text-base" wrapperClassName="text-lg" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p></p>
            )}

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                className="me-2 mb-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-2xl font-normal text-white transition-transform duration-300 ease-in-out hover:scale-105"
                type="submit"
              >
                Convertir
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 flex w-full flex-col bg-gray-900 py-3 text-center text-sm text-white">
        <p className="">
          Developed by Álvaro Delgado to practise with React, TypeScript and TailwindCSS.
        </p>
        <a className="pt-2 underline" href="https://alvarobcp.github.io/alvaro-portfolio/">
          Visit my portfolio
        </a>
      </footer>
    </>
  );
}

export default App;
