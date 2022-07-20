import { CurrencyAmount, JSBI, SUSHI, Token, ChainId } from '@sushiswap/core-sdk'
import { PROPHET } from 'app/config/tokens'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback, useMemo } from 'react'

import { useProphetSacrificeContract } from './useContract'

const useProphetSacrifice = () => {
  const addTransaction = useTransactionAdder()

  const prophetSacrifice = useProphetSacrificeContract()

  const burnPro = useCallback(async () => {
    try {
      const tx = await prophetSacrifice?.burnPro()

      return addTransaction(tx, { summary: 'Burn Pro in ProphetSacrifice' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prophetSacrifice])

  return { burnPro }
}

export function useProphetSacrificeAmount() {
  const contract = useProphetSacrificeContract()

  const result = useSingleCallResult(contract, 'totalBurnPro')?.result

  const value = result?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  const result1 = useSingleCallResult(contract, 'totalStakePro')?.result

  const value1 = result1?.[0]

  const amount1 = value1 ? JSBI.BigInt(value1.toString()) : undefined

  return useMemo(() => {
    if (amount && amount1) {
      const burnAmount = CurrencyAmount.fromRawAmount(PROPHET, amount)
      const stakerAmount = CurrencyAmount.fromRawAmount(PROPHET, amount1)
      return [burnAmount, stakerAmount]
    }
    return [undefined, undefined]
  }, [amount, amount1])
}

export default useProphetSacrifice
