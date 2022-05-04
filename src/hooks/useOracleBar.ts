import { ChainId, CurrencyAmount, JSBI, SUSHI_ADDRESS, Token } from '@sushiswap/core-sdk'
import { XORACLE } from 'app/config/tokens'
import { useActiveWeb3React } from 'app/services/web3'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback, useMemo } from 'react'
import { useTokenContract } from '.'

import { useSushiBarContract } from './useContract'

export function useOracleBar() {
  const { account, chainId } = useActiveWeb3React()

  const oracleTokenContract = useTokenContract(SUSHI_ADDRESS[ChainId.SGB])

  const result1 = useSingleCallResult(oracleTokenContract, 'balanceOf', [XORACLE.address])?.result

  const value1 = result1?.[0]

  const amount1 = value1 ? JSBI.BigInt(value1.toString()) : undefined

  const contract = useSushiBarContract()

  const result = useSingleCallResult(contract, 'totalSupply')?.result

  const value = result?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return useMemo(() => {
    if (amount && amount1) {
      const ratio = JSBI.toNumber(amount1) / JSBI.toNumber(amount)
      const totalSupply = CurrencyAmount.fromRawAmount(XORACLE, amount)
      return [ratio, totalSupply]
    }
    return [undefined, undefined]
  }, [amount, amount1])
}
