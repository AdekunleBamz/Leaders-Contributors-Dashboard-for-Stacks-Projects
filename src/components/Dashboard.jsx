import { useEffect, useState } from 'react'
import { getUserAddress, isConnected } from '../lib/wallet'
import { fetchBalance, fetchTransactions } from '../lib/api'

export default function Dashboard() {
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const address = getUserAddress()

  useEffect(() => {
    if (isConnected() && address) {
      loadDashboardData()
    }
  }, [address])

  async function loadDashboardData() {
    try {
      setLoading(true)
      setError(null)

      // Fetch balance
      const balanceData = await fetchBalance(address)
      setBalance(balanceData)

      // Fetch recent transactions
      const txData = await fetchTransactions(address, 10)
      setTransactions(txData)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected()) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to view the dashboard</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadDashboardData}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Wallet Address */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Wallet Address</h2>
        <p className="font-mono text-sm break-all">{address}</p>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Balance</h2>
        {balance ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">STX Balance</p>
              <p className="text-2xl font-bold">{balance.stx.balance}</p>
            </div>
            <div>
              <p className="text-gray-600">Available STX</p>
              <p className="text-2xl font-bold">{balance.stx.availableStx}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Unable to load balance</p>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((tx, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium capitalize">{tx.tx_type}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(tx.burn_block_time_iso).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      tx.tx_status === 'success' ? 'text-green-600' :
                      tx.tx_status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {tx.tx_status}
                    </p>
                    <p className="text-xs text-gray-500">{tx.tx_id.slice(0, 10)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent transactions found</p>
        )}
      </div>
    </div>
  )
}
