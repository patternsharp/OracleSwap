import { BigNumber } from '@ethersproject/bignumber'
import { useActiveWeb3React } from 'app/services/web3'
import { useSingleCallResult, useSingleContractMultipleData } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback, useMemo } from 'react'

import { useProStakingContract } from './useContract'

const useProStakingActions = () => {
  const addTransaction = useTransactionAdder()

  const prostakingContract = useProStakingContract()

  const deposit = useCallback(async (amount:BigNumber,lockMode:number) => {
    try {
      const tx = await prostakingContract?.deposit(amount,lockMode)

      return addTransaction(tx, { summary: 'Deposit in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const harvest = useCallback(async () => {
    try {
      const tx = await prostakingContract?.harvest()

      return addTransaction(tx, { summary: 'harvest in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const withdraw = useCallback(async (amount:BigNumber) => {
    try {
      const tx = await prostakingContract?.withdraw(amount)

      return addTransaction(tx, { summary: 'withdraw in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const increaseLockAmount = useCallback(async (amount:BigNumber) => {
    try {
      const tx = await prostakingContract?.increaseLockAmount(amount)

      return addTransaction(tx, { summary: 'increaseLockAmount in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  
  const oracleNFTStake = useCallback(async (tokenId:number) => {
    try {
      const tx = await prostakingContract?.NFTStake(tokenId)

      return addTransaction(tx, { summary: 'Oracle nft stake in ProStaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const oracleNFTWithdraw = useCallback(async (tokenId:number) => {
    try {
      const tx = await prostakingContract?.NFTWithdraw(tokenId)

      return addTransaction(tx, { summary: 'Oracle nft withdraw in ProStaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const extendLockMode = useCallback(async (lockMode:number) => {
    try {
      const tx = await prostakingContract?.extendLockTime(lockMode)

      return addTransaction(tx, { summary: 'extend lock time in ProStaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  return { deposit,withdraw,harvest,oracleNFTStake,oracleNFTWithdraw,extendLockMode,increaseLockAmount }
}

export function useProStakingRewardHistory(){
  const prostakingContract = useProStakingContract()

  const result1 = useSingleCallResult(prostakingContract, 'getRewardHistory')?.result

  console.log('getRewardHistory',result1)

  const times = result1?.times;
  const rewards =  result1?.rewards;

  const history = useMemo(()=>{
    if(!times || !rewards){
      return []
    }
    let temp: any[] = []
    times.map((item:BigNumber,index:number)=> {
      history.push({
        timestamp:item.toNumber(),
        reward:rewards[index]
      })
    })
    return temp;

  },[times,rewards])
}

export function useProStakingUserInfo(){

  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const userLockInfo = useSingleCallResult(args ? contract : null, 'userLocks', args)?.result

  const userLock = userLockInfo?.[0]

  const userStakedNFTInfo = useSingleCallResult(args ? contract : null, 'userStakedNFT', args)?.result

  const userStakedNFT = userStakedNFTInfo?.[0]

  const userWalletNFTInfo = useSingleCallResult(args ? contract : null, 'userWalletNFT', args)?.result

  const userWalletNFT = userWalletNFTInfo?.[0]

  const userPendingRewardInfo = useSingleCallResult(args ? contract : null, 'pendingRewards', args)?.result

  const userPendingReward = userPendingRewardInfo?.[0]

  return {userLock }

}

export function useProStakingInfo(){

  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const totalNFTCountInfo = useSingleCallResult( contract , 'totalNFTCount')?.result

  const totalNFTCount = totalNFTCountInfo?.[0]

  const totalNFTWeightInfo = useSingleCallResult( contract , 'totalNFTWeight')?.result

  const totalNFTWeight = totalNFTWeightInfo?.[0]

  const totalPoolWeightInfo = useSingleCallResult( contract , 'totalPoolWeight')?.result

  const totalPoolWeight = totalPoolWeightInfo?.[0]

  const totalProAmountInfo = useSingleCallResult( contract , 'totalProAmount')?.result

  const totalProAmount = totalProAmountInfo?.[0]


  const results = useSingleContractMultipleData( contract , 'totalProAmount',[[0],[1],[2],[3],[4]])

  const proAmountForLock = useMemo(()=>{
    if (results && Array.isArray(results) && results.length === 5) {
      console.log('proAmountForLock',results);
      return [0,0,0,0,0]
      // return results.map<BigNumber | undefined>((el) => {
      //   if (el.result && Array.isArray(el.result) && el.result.length > 0) {

      //     const value = el.result[0]
          
      //     const amount = value ? JSBI.BigInt(value[0].toString()) : undefined
      //     return amount;
      //   }
      //     return undefined
      // })
    }
  
    return Array(5).fill(undefined)
  },[results])


  return {totalNFTCount }

}


// export function useOracleBar() {
//   const { account, chainId } = useActiveWeb3React()

//   const oracleTokenContract = useTokenContract(SUSHI_ADDRESS[ChainId.SGB])

//   const result1 = useSingleCallResult(oracleTokenContract, 'balanceOf', [XORACLE.address])?.result

//   const value1 = result1?.[0]

//   const amount1 = value1 ? JSBI.BigInt(value1.toString()) : undefined

//   const contract = useSushiBarContract()

//   const result = useSingleCallResult(contract, 'totalSupply')?.result

//   const value = result?.[0]

//   const amount = value ? JSBI.BigInt(value.toString()) : undefined

//   return useMemo(() => {
//     if (amount && amount1) {
//       const ratio = JSBI.toNumber(amount1) / JSBI.toNumber(amount)
//       const totalSupply = CurrencyAmount.fromRawAmount(XORACLE, amount)
//       return [ratio, totalSupply]
//     }
//     return [undefined, undefined]
//   }, [amount, amount1])
// }
