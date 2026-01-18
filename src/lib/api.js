const STACKS_API_BASE = 'https://api.mainnet.stacks.co'

export async function fetchBalance(address) {
  try {
    const response = await fetch(`${STACKS_API_BASE}/extended/v1/address/${address}/balances`)
    if (!response.ok) {
      throw new Error('Failed to fetch balance')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching balance:', error)
    throw error
  }
}

export async function fetchTransactions(address, limit = 10) {
  try {
    const response = await fetch(`${STACKS_API_BASE}/extended/v1/address/${address}/transactions?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch transactions')
    }
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

export async function fetchTransaction(txId) {
  try {
    const response = await fetch(`${STACKS_API_BASE}/extended/v1/tx/${txId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch transaction')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching transaction:', error)
    throw error
  }
}

export async function fetchAccountInfo(address) {
  try {
    const response = await fetch(`${STACKS_API_BASE}/v2/accounts/${address}`)
    if (!response.ok) {
      throw new Error('Failed to fetch account info')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error
  }
}
