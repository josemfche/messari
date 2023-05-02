import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Table from './components/Table'
import CryptoInvestment from './components/CryptoInvestment'
import Layout from './components/Layout'
import { CryptoData } from './utils/types'

const socket = io('http://localhost:3001')

function App() {
  const [investment, setInvestment] = useState<number>(0);
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [marketData, setMarketData] = useState<CryptoDataProps | null>(null);

  interface CryptoDataProps {
    data: CryptoData[]
  }

  socket.on('market:data', (response: { marketData: CryptoDataProps }) => {
    setMarketData(response.marketData);
  })


  const handleClick = () => {
    socket.emit('investment:anual', investment)
    setInvestment(0)
    setInitialInvestment(investment)
  }

  return (
    <>
      <Layout>
        <div className='flex flex-row'>
          <div className="w-1/4 p-4">
            <CryptoInvestment
              socket={socket}
              setInvestment={setInvestment}
              calculateInvestment={handleClick}
              investment={investment}
              initialInvestment={initialInvestment}

            />
          </div>
          <div className='w-3/4 p-4'>
            <Table data={marketData} />
          </div>
        </div >
      </Layout>
    </>
  )
}

export default App