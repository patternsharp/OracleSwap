import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, CurrencyAmount, JSBI, Token, ZERO } from '@sushiswap/core-sdk'
import { PROPHET, XORACLE } from 'app/config/tokens'
import { useActiveWeb3React } from 'app/services/web3'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'

import { useCallback, useMemo } from 'react'

import { useAllTokens } from './Tokens'

import { useProStakingContract } from './useContract'

export const useProStakingActions = () => {
  const addTransaction = useTransactionAdder()

  const prostakingContract = useProStakingContract()

  const deposit = useCallback(
    async (amount: BigNumber, lockMode: number) => {
      try {
        const tx = await prostakingContract?.deposit(amount, lockMode)

        return addTransaction(tx, { summary: 'Deposit in prostaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const harvest = useCallback(async () => {
    try {
      const tx = await prostakingContract?.harvest()

      return addTransaction(tx, { summary: 'harvest in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, prostakingContract])

  const withdraw = useCallback(
    async (amount: BigNumber) => {
      try {
        const tx = await prostakingContract?.withdraw(amount)

        return addTransaction(tx, { summary: 'withdraw in prostaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const increaseLockAmount = useCallback(
    async (amount: BigNumber) => {
      try {
        const tx = await prostakingContract?.increaseLockAmount(amount)

        return addTransaction(tx, { summary: 'increaseLockAmount in prostaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const oracleNFTStake = useCallback(
    async (tokenId: number) => {
      try {
        const tx = await prostakingContract?.NFTStake(tokenId)

        return addTransaction(tx, { summary: 'Oracle nft stake in ProStaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const oracleNFTWithdraw = useCallback(
    async (tokenId: number) => {
      try {
        const tx = await prostakingContract?.NFTWithdraw(tokenId)

        return addTransaction(tx, { summary: 'Oracle nft withdraw in ProStaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const extendLockMode = useCallback(
    async (lockMode: number) => {
      try {
        const tx = await prostakingContract?.extendLockTime(lockMode)

        return addTransaction(tx, { summary: 'extend lock time in ProStaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  return { deposit, withdraw, harvest, oracleNFTStake, oracleNFTWithdraw, extendLockMode, increaseLockAmount }
}

export function useProStakingRewardHistory() {
  const prostakingContract = useProStakingContract()

  const result1 = useSingleCallResult(prostakingContract, 'getRewardHistory')?.result

  console.log('getRewardHistory', result1)

  const times = result1?.times
  const rewards = result1?.rewards

  const history = useMemo(() => {
    if (!times || !rewards) {
      return []
    }
    let temp: any[] = []
    times.map((item: BigNumber, index: number) => {
      history.push({
        timestamp: item.toNumber(),
        reward: rewards[index],
      })
    })
    return temp
  }, [times, rewards])
}

export function useProStakingUserInfo() {
  const { account } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const results = useSingleCallResult(args ? contract : null, 'userLocks', args)?.result

  console.log('prostakers userLock', results)

  const lockModeInfo = results?.lockMode

  const lockedAmountInfo = results?.lockedAmount

  const nftWeightInfo = results?.nftWeight

  const totalWeightInfo = results?.totalWeight

  const unlockTimeInfo = results?.unlockTime

  const xOracleLockInfo = results?.xOracleLock

  const lockMode = lockModeInfo ? lockModeInfo.toNumber() : undefined

  const unlockTime = unlockTimeInfo ? unlockTimeInfo.toNumber() : undefined

  const lockedAmount = lockedAmountInfo ? JSBI.BigInt(lockedAmountInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const lockedProAmount = lockedAmount ? CurrencyAmount.fromRawAmount(PROPHET, lockedAmount) : undefined

  const nftWeight = nftWeightInfo ? JSBI.BigInt(nftWeightInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const userNFTWeight = nftWeight ? CurrencyAmount.fromRawAmount(PROPHET, nftWeight) : undefined

  const totalWeight = totalWeightInfo ? JSBI.BigInt(totalWeightInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const userTotalWeight = totalWeight ? CurrencyAmount.fromRawAmount(PROPHET, totalWeight) : undefined

  const xOracleLock = xOracleLockInfo ? JSBI.BigInt(xOracleLockInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const lockXOracle = xOracleLock ? CurrencyAmount.fromRawAmount(XORACLE, xOracleLock) : undefined

  return { lockMode, unlockTime, lockedProAmount, userNFTWeight, userTotalWeight, lockXOracle }
}

export function useProStakingNFTInfo() {
  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const userStakedNFTInfo = useSingleCallResult(args ? contract : null, 'userStakedNFT', args)?.result

  const userStakedNFT = userStakedNFTInfo?.[0]

  const userWalletNFTInfo = useSingleCallResult(args ? contract : null, 'userWalletNFT', args)?.result

  const userWalletNFT = userWalletNFTInfo?.[0]

  return { userStakedNFT, userWalletNFT }
}

export function useProStakingUserNFTCount() {
  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const userStakedNFTInfo = useSingleCallResult(args ? contract : null, 'userStakedNFTCount', args)?.result

  const userStakedNFT = userStakedNFTInfo?.[0]

  return userStakedNFT ? userStakedNFT.toNumber() : 0
}

export function useProPendingReward() {
  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const userPendingRewardInfo = useSingleCallResult(args ? contract : null, 'pendingRewards', args)?.result

  const rewardsInfo = userPendingRewardInfo?.rewards

  const alltokens = useAllTokens()

  const rewards = useMemo(() => {
    if (!rewardsInfo) {
      return []
    }
    let infos: any[] = []
    rewardsInfo.map((item: { token: string; amount: BigNumber }) => {
      const OLPToken = new Token(ChainId.SGB, item.token, 18, 'OLP', 'OracleSwap LP Token')
      const tokenInfo = alltokens[item.token] || OLPToken

      const amountInfo = item.amount ? JSBI.BigInt(item.amount.toString()) : undefined

      // @ts-ignore TYPE NEEDS FIXING
      const amount = tokenInfo && amountInfo ? CurrencyAmount.fromRawAmount(tokenInfo, amountInfo) : undefined

      if (amount && amount.greaterThan(ZERO)) {
        infos.push({
          token: tokenInfo,
          amount: amount,
        })
      }
    })
    return infos
  }, [rewardsInfo, alltokens])
  return rewards
}

export function useProStakingInfo() {
  const contract = useProStakingContract()

  const results = useSingleCallResult(contract, 'getGlobalStatus')?.result

  const totalPoolInfo = results?.poolSize

  const proAmountInfo = results?.proAmount

  const nftCountInfo = results?.nftCount

  const totalNFTCount = nftCountInfo ? nftCountInfo.toNumber() : undefined

  const xOracleAmountInfo = results?.xOracleAmount

  const totalPool = totalPoolInfo ? JSBI.BigInt(totalPoolInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const totalPoolSize = totalPool ? CurrencyAmount.fromRawAmount(PROPHET, totalPool) : undefined

  const proAmount = proAmountInfo ? JSBI.BigInt(proAmountInfo.toString()) : undefined
  // @ts-ignore TYPE NEEDS FIXING
  const totalProAmount = proAmount ? CurrencyAmount.fromRawAmount(PROPHET, proAmount) : undefined

  const xOracleAmount = xOracleAmountInfo ? JSBI.BigInt(xOracleAmountInfo.toString()) : undefined

  // @ts-ignore TYPE NEEDS FIXING
  const totalxOracleAmount = xOracleAmount ? CurrencyAmount.fromRawAmount(XORACLE, xOracleAmount) : undefined

  return { totalProAmount, totalxOracleAmount, totalPoolSize, totalNFTCount }
}

export function useTotalDistributedReward() {
  const contract = useProStakingContract()

  const results = useSingleCallResult(contract, 'distributedTotalReward')?.result

  const rewardsInfo = results?.rewards

  const alltokens = useAllTokens()

  const rewards = useMemo(() => {
    if (!rewardsInfo) {
      return []
    }
    let infos: any[] = []
    rewardsInfo.map((item: { token: string; amount: BigNumber }) => {
      const OLPToken = new Token(ChainId.SGB, item.token, 18, 'OLP', 'OracleSwap LP Token')
      const tokenInfo = alltokens[item.token] || OLPToken

      const amountInfo = item.amount ? JSBI.BigInt(item.amount.toString()) : undefined

      // @ts-ignore TYPE NEEDS FIXING
      const amount = tokenInfo && amountInfo ? CurrencyAmount.fromRawAmount(tokenInfo, amountInfo) : undefined

      infos.push({
        token: tokenInfo,
        amount: amount,
      })
    })
    return infos
  }, [rewardsInfo, alltokens])
  return rewards
}
