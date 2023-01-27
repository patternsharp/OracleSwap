
import { useSingleCallResult,  } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback} from 'react'
import {useProOracleDistributorContract } from './useContract'


export const useProOracleDistributeAction = () => {

    const addTransaction = useTransactionAdder()
  
    const distributor = useProOracleDistributorContract()
  
    const distribute = useCallback(
      async () => {
        try {
          const tx = await distributor?.distribute()
  
          return addTransaction(tx, { summary: 'distribute pro' })
        } catch (e) {
          return e
        }
      },
      [addTransaction, distributor]
    )
  
    return { distribute }
  }
  
  export function useNextOracleDistributeTime() {
    const contract = useProOracleDistributorContract()
  
    const possibleDistribute = useSingleCallResult(contract , 'nextDistribution')?.result
  
    const check = possibleDistribute?.[0]
  
    return check ? check.toNumber(): 0
  }
  
