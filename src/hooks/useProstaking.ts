import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, CurrencyAmount, JSBI, Token, ZERO } from '@sushiswap/core-sdk'
import { PROPHET, XORACLE } from 'app/config/tokens'
import { PROSTAKING_ADDRESS } from 'app/constants'
import { useActiveWeb3React } from 'app/services/web3'
import { useSingleCallResult, useSingleContractMultipleData } from 'app/state/multicall/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAllTokens } from './Tokens'
import { useOracleNFTContract, useProStakingContract, useProStakingDistributorContract, useProStakingOracleWeightContract } from './useContract'

const fetchNFTMetaInfo = async (id: number) => {
  const url = `https://the-oracles.fra1.cdn.digitaloceanspaces.com/metadata/${id}.json`
  const response = await axios.get(url)
  const token = response.data

  return token
}

export const useProStakingDistributeAction = () => {

  const addTransaction = useTransactionAdder()

  const distributor = useProStakingDistributorContract()

  const distribute = useCallback(
    async () => {
      try {
        const tx = await distributor?.distribute()

        return addTransaction(tx, { summary: 'distribute in prostaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, distributor]
  )

  return { distribute }
}

export function useCheckPossibleDistribute() {
  const contract = useProStakingDistributorContract()


  const possibleDistribute = useSingleCallResult(contract , 'possibleDistribute')?.result

  const check = possibleDistribute?.[0]

  return check 
}

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

  const oracleMultiNFTStake = useCallback(
    async (tokenIds: number[]) => {
      try {
        const tx = await prostakingContract?.batchNFTStake(tokenIds)

        return addTransaction(tx, { summary: 'Oracle nft stake in ProStaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  const oracleMultiNFTWithdraw = useCallback(
    async (tokenIds: number[]) => {
      try {
        const tx = await prostakingContract?.batchNFTWithdraw(tokenIds)

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

  const shortenLockMode = useCallback(
    async (lockMode: number) => {
      try {
        const tx = await prostakingContract?.shortenLockTime(lockMode)

        return addTransaction(tx, { summary: 'shorten lock time in ProStaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, prostakingContract]
  )

  return { deposit, withdraw, harvest, oracleNFTStake, oracleNFTWithdraw, extendLockMode, increaseLockAmount,oracleMultiNFTStake,oracleMultiNFTWithdraw,shortenLockMode }
}

export function useProStakingRewardHistory() {
  const prostakingContract = useProStakingContract()

  const result1 = useSingleCallResult(prostakingContract, 'getRewardHistory')?.result

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

export function useProStakingNFTWeightInfo() : { [address: string]: number } {

  const { account } = useActiveWeb3React()

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

  const weightContract = useProStakingOracleWeightContract()

  const weightArgs = useMemo(() => {
    if (!userStakedNFT || !userWalletNFT) {
      return
    }
    return [...userStakedNFT,...userWalletNFT].map((tokenId) => [String(tokenId.toNumber())])
  }, [userStakedNFT,userWalletNFT])

  // @ts-ignore TYPE NEEDS FIXING
  const nftWeightInfo = useSingleContractMultipleData(weightArgs ? weightContract : null, 'oracleNFTWeight', weightArgs)

  return useMemo(() => {

    if (!nftWeightInfo) {
      return {}
    }

    let map = {}
    nftWeightInfo.map((data, i) => (
      // @ts-ignore TYPE NEEDS FIXING
      map[weightArgs[i][0]] = data.result?.[0].toNumber() || 0
    ))

    return map;
  }, [weightArgs, nftWeightInfo])

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

  // const weightContract = useProStakingOracleWeightContract()


  // const weightArgs = useMemo(() => {
  //   if (!userStakedNFT || !userWalletNFT) {
  //     return
  //   }
  //   return [...userStakedNFT,...userWalletNFT].map((tokenId) => [String(tokenId.toNumber())])
  // }, [userStakedNFT,userWalletNFT])

  // // @ts-ignore TYPE NEEDS FIXING
  // const nftWeightInfo = useSingleContractMultipleData(weightArgs ? weightContract : null, 'oracleNFTWeight', weightArgs)

  // const oracleStakingWeight =  useMemo(() => {
  //   if (!nftWeightInfo) {
  //     return undefined
  //   }

  //   let map = {}
  //   nftWeightInfo.map((data, i) => (
  //     // @ts-ignore TYPE NEEDS FIXING
  //     map[weightArgs[i][0]] = data.result?.[0].toNumber() || 0
  //   ))

  //   return map;
  // }, [weightArgs, nftWeightInfo])


  const [walletNFT, setWalletNFT] = useState<Array<any>>([])

  const [stakedNFT, setStakedNFT] = useState<Array<any>>([])

  const walletNFTFetch = useCallback(async () => {
    if (!userWalletNFT) {
      return []
    }
    const ids = userWalletNFT.map((item: BigNumber) => item.toNumber())

    let promises: Promise<any>[] = []
    let result: any[] = []

    ids.forEach((id: number) => {
      promises.push(fetchNFTMetaInfo(id))
    })

    if (promises.length) {
      const data = await Promise.allSettled(promises)
      data.forEach((el) => {
        if (el.status !== 'fulfilled') return
        const tokenResponse = el.value
        if (!tokenResponse) return
        if (tokenResponse) result.push(tokenResponse)
      })
    }
    setWalletNFT(result)
    return result
  }, [userWalletNFT])

  const stakedNFTFetch = useCallback(async () => {
    if (!userStakedNFT) {
      return []
    }
    const ids = userStakedNFT.map((item: BigNumber) => item.toNumber())

    let promises: Promise<any>[] = []
    let result: any[] = []

    ids.forEach((id: number) => {
      promises.push(fetchNFTMetaInfo(id))
    })

    if (promises.length) {
      const data = await Promise.allSettled(promises)
      data.forEach((el) => {
        if (el.status !== 'fulfilled') return
        const tokenResponse = el.value
        if (!tokenResponse) return
        if (tokenResponse) result.push(tokenResponse)
      })
    }
    setStakedNFT(result as any[])
    return result
  }, [userStakedNFT])

  useEffect(() => {
    if (userWalletNFT && userWalletNFT.length > 0) {
      walletNFTFetch()
    }else{
      if(userWalletNFT?.length === 0){
        setWalletNFT([])
      }
    }
  }, [walletNFTFetch, userWalletNFT])

  useEffect(() => {
    if (userStakedNFT && userStakedNFT.length > 0) {
      stakedNFTFetch()
    }else{
      if(userStakedNFT?.length === 0){
        setStakedNFT([])
      }
    }
  }, [stakedNFTFetch, userStakedNFT])

  return { walletNFT, stakedNFT }
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

export function useOracleNFTAllApproved() {
  const { account, chainId } = useActiveWeb3React()

  const contract = useOracleNFTContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account), PROSTAKING_ADDRESS]
  }, [account])

  const approvedInfo = useSingleCallResult(args ? contract : null, 'isApprovedForAll', args)?.result

  const approved = approvedInfo?.[0]

  return approved
}

export function useOracleNFTWeight(tokenId: number) {
  const contract = useProStakingOracleWeightContract()

  const args = useMemo(() => {
    if (!tokenId) {
      return
    }
    return [String(tokenId)]
  }, [tokenId])

  const weightInfo = useSingleCallResult(args ? contract : null, 'oracleNFTWeight', args)?.result

  const weight = weightInfo?.[0]

  return weight ? weight.toNumber() : undefined
}

export function useOracleNFTApproved(tokenId: number) {
  const contract = useOracleNFTContract()

  const args = useMemo(() => {
    if (!tokenId) {
      return
    }
    return [String(tokenId)]
  }, [tokenId])

  const approvedInfo = useSingleCallResult(args ? contract : null, 'getApproved', args)?.result

  const operator = approvedInfo?.[0]

  return operator && operator.toLowerCase() === PROSTAKING_ADDRESS.toLowerCase()
}

export function useOracleNFTApprove() {
  const contract = useOracleNFTContract()

  const addTransaction = useTransactionAdder()

  const approveAll = useCallback(async () => {
    try {
      const tx = await contract?.setApprovalForAll(PROSTAKING_ADDRESS, true)
      return addTransaction(tx, { summary: 'approve all oracle nft in prostaking' })
    } catch (e) {
      return e
    }
  }, [addTransaction, contract])

  const approveStaker = useCallback(
    async (tokenId: number) => {
      try {
        const tx = await contract?.approve(PROSTAKING_ADDRESS, tokenId)
        return addTransaction(tx, { summary: 'approve oracle nft in prostaking' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, contract]
  )

  return { approveAll, approveStaker }
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
      let tokenInfo = alltokens[item.token] || OLPToken

      if(item.token == '0x0000000000000000000000000000000000000000'){
        tokenInfo = new Token(ChainId.SGB, item.token, 18, 'SGB', 'SGB');
      }


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

export function useProUserTotalReward() {
  const { account, chainId } = useActiveWeb3React()

  const contract = useProStakingContract()

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(account)]
  }, [account])

  const userPendingRewardInfo = useSingleCallResult(args ? contract : null, 'distributedUserTotalReward', args)?.result

  const rewardsInfo = userPendingRewardInfo?.rewards

  const alltokens = useAllTokens()

  const rewards = useMemo(() => {
    if (!rewardsInfo) {
      return []
    }
    let infos: any[] = []
    rewardsInfo.map((item: { token: string; amount: BigNumber }) => {
      const OLPToken = new Token(ChainId.SGB, item.token, 18, 'OLP', 'OracleSwap LP Token')

      let tokenInfo = alltokens[item.token] || OLPToken

      if(item.token == '0x0000000000000000000000000000000000000000'){
        tokenInfo = new Token(ChainId.SGB, item.token, 18, 'SGB', 'SGB');
      }

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

export function useMinProAmount() {
  const contract = useProStakingContract()

  const results = useSingleCallResult(contract, 'minProAmount')?.result

  const value = results?.[0]
  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  // @ts-ignore TYPE NEEDS FIXING
  const minPro = amount ? CurrencyAmount.fromRawAmount(PROPHET, amount) : undefined

  return minPro
}

export function useMinXOracleAmount() {
  const contract = useProStakingContract()
  const results = useSingleCallResult(contract, 'minxOracleAmount')?.result

  const value = results?.[0]
  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  // @ts-ignore TYPE NEEDS FIXING
  const minXOracle = amount ? CurrencyAmount.fromRawAmount(XORACLE, amount) : undefined

  return minXOracle
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

      let tokenInfo = alltokens[item.token] || OLPToken

      if(item.token == '0x0000000000000000000000000000000000000000'){
        tokenInfo = new Token(ChainId.SGB, item.token, 18, 'SGB', 'SGB');
      }

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
