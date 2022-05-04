import { getAddress } from '@ethersproject/address'
import { ChainId, Currency, JSBI, MASTERCHEF_ADDRESS, NATIVE, SUSHI, SUSHI_ADDRESS, Token } from '@sushiswap/core-sdk'
import { ARBITRUM_TOKENS, MATIC_TOKENS, XDAI_TOKENS } from 'app/config/tokens'
import { Chef, PairType } from 'app/features/onsen/enum'
import { usePositions, useUserInfo } from 'app/features/onsen/hooks'
import { aprToApy } from 'app/functions/convert'
import {
  useAverageBlockTime,
  useCeloPrice,
  useEthPrice,
  useFantomPrice,
  useFarms,
  useFusePrice,
  useGnoPrice,
  useKashiPairs,
  useMagicPrice,
  useMasterChefV1SushiPerBlock,
  useMasterChefV1TotalAllocPoint,
  useMaticPrice,
  useMovrPrice,
  useOhmPrice,
  useOneDayBlock,
  useOnePrice,
  useSpellPrice,
  useSushiPairs,
  useSushiPrice,
} from 'app/services/graph'
import { useActiveWeb3React } from 'app/services/web3'
import { useSingleCallResult } from 'app/state/multicall/hooks'
import { useTokenBalances } from 'app/state/wallet/hooks'
import toLower from 'lodash/toLower'
import { useCallback, useMemo } from 'react'
import { useMasterChefContract } from '.'

export function useMasterChefRewardPerBlock() {
  const contract = useMasterChefContract(false)

  const info = useSingleCallResult(contract, 'oraclePerBlock')?.result

  const value = info?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return useMemo(() => {
    if (amount) {
      const rewardPerblock = JSBI.toNumber(amount) / 1e18
      return rewardPerblock
    }
    return 0
  }, [amount])
}

export default function useFarmRewards() {
  const { chainId } = useActiveWeb3React()

  // @ts-ignore TYPE NEEDS FIXING
  // const positions = usePositions(chainId)

  // console.log({ positions })

  const block1d = useOneDayBlock({ chainId, shouldFetch: !!chainId })

  // @ts-ignore TYPE NEEDS FIXING
  // const farms = useFarms({ chainId })

  const farms = [
    {
      accSushiPerShare: '',
      allocPoint: 100,
      balance: 0,
      chef: 0,
      id: '0',
      lastRewardTime: 12505142,
      owner: {
        id: '0xF90C08C27B1a637804F3d85C155033696e25bFDB',
        totalAllocPoint: 100,
      },
      pair: '0x6eE75C89305b8D5D40361dA0685b2CE786b49B1b',
      slpBalance: 0,
      userCount: '0',
    },
  ]

  const liquidityTokens = useMemo(
    () =>
      farms.map((farm) => {
        const token = new Token(ChainId.SGB, getAddress(farm.pair), 18, 'OLP')
        return token
      }),
    [farms]
  )

  const farmAddresses = useMemo(() => farms.map((farm) => farm.pair), [farms])

  const stakedBalaces = useTokenBalances(MASTERCHEF_ADDRESS[ChainId.SGB], liquidityTokens)

  // const swapPairs = useSushiPairs({
  //   chainId,
  //   variables: {
  //     where: {
  //       id_in: farmAddresses.map(toLower),
  //     },
  //   },
  //   shouldFetch: !!farmAddresses,
  // })

  // const swapPairs1d = useSushiPairs({
  //   chainId,
  //   variables: {
  //     block: block1d,
  //     where: {
  //       id_in: farmAddresses.map(toLower),
  //     },
  //   },
  //   shouldFetch: !!block1d && !!farmAddresses,
  // })

  // const kashiPairs = useKashiPairs({
  //   chainId,
  //   variables: { where: { id_in: farmAddresses.map(toLower) } },
  //   shouldFetch: !!farmAddresses,
  // })

  const averageBlockTime = useAverageBlockTime({ chainId })

  const masterChefV1TotalAllocPoint = 100 //useMasterChefV1TotalAllocPoint()
  const masterChefV1SushiPerBlock = useMasterChefRewardPerBlock() // useMasterChefV1SushiPerBlock()

  const [
    sushiPrice,
    ethPrice,
    maticPrice,
    gnoPrice,
    onePrice,
    spellPrice,
    celoPrice,
    fantomPrice,
    movrPrice,
    ohmPrice,
    fusePrice,
    magicPrice,
  ] = [
    useSushiPrice(),
    useEthPrice(),
    useMaticPrice(),
    useGnoPrice(),
    useOnePrice(),
    useSpellPrice(),
    useCeloPrice(),
    useFantomPrice(),
    useMovrPrice(),
    useOhmPrice(),
    useFusePrice(),
    useMagicPrice(),
  ]

  const obelPrice = 0.02

  const blocksPerDay = 86400 / Number(averageBlockTime)

  // @ts-ignore TYPE NEEDS FIXING
  const map = (pool) => {
    // TODO: Deal with inconsistencies between properties on subgraph
    pool.owner = pool?.owner || pool?.masterChef || pool?.miniChef
    pool.balance = pool?.balance || pool?.slpBalance

    const liquidityToken = new Token(ChainId.SGB, getAddress(pool.pair), 18, 'OLP')

    const stakedAmount = useUserInfo(pool, liquidityToken)

    const amount = parseFloat(stakedAmount ? stakedAmount?.toSignificant(10) : '0')

    const pair = {
      decimals: 18,
      id: '0x6eE75C89305b8D5D40361dA0685b2CE786b49B1b',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED',
        name: 'Wrapped SGB',
        symbol: 'WSGB',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.034,
        id: '0x70Ad7172EF0b131A1428D0c1F66457EB041f2176',
        name: 'Canary Dollar',
        symbol: 'CAND',
        totalSupply: 16840,
      },

      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      type: 0,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    }

    // // @ts-ignore TYPE NEEDS FIXING
    // const swapPair = swapPairs?.find((pair) => pair.id === pool.pair)
    // // @ts-ignore TYPE NEEDS FIXING
    // const swapPair1d = swapPairs1d?.find((pair) => pair.id === pool.pair)
    // // @ts-ignore TYPE NEEDS FIXING
    // const kashiPair = kashiPairs?.find((pair) => pair.id === pool.pair)

    // const pair = swapPair || kashiPair

    const type = PairType.SWAP // swapPair ? PairType.SWAP : PairType.KASHI

    const blocksPerHour = 3600 / averageBlockTime

    function getRewards() {
      // TODO: Some subgraphs give sushiPerBlock & sushiPerSecond, and mcv2 gives nothing
      const sushiPerBlock =
        pool?.owner?.sushiPerBlock / 1e18 ||
        (pool?.owner?.sushiPerSecond / 1e18) * averageBlockTime ||
        masterChefV1SushiPerBlock

      // @ts-ignore TYPE NEEDS FIXING
      const rewardPerBlock = (pool.allocPoint / pool.owner.totalAllocPoint) * sushiPerBlock

      // const defaultReward = {
      //   currency: SUSHI[ChainId.ETHEREUM],
      //   rewardPerBlock,

      //   rewardPerDay: rewardPerBlock * blocksPerDay,
      //   rewardPrice: sushiPrice,
      // }

      const oracleTOken = new Token(ChainId.SGB, SUSHI_ADDRESS[ChainId.SGB], 18, 'ORACEL', 'OracleSwap.io')

      const defaultReward = {
        token: 'ORACLE',
        icon: '/oracle.png',
        rewardPerBlock,
        currency: SUSHI[ChainId.SGB],
        rewardPerDay: rewardPerBlock * blocksPerDay,
        rewardPrice: obelPrice,
      }

      let rewards: { currency: Currency; rewardPerBlock: number; rewardPerDay: number; rewardPrice: number }[] = [
        // @ts-ignore TYPE NEEDS FIXING
        defaultReward,
      ]

      if (pool.chef === Chef.MASTERCHEF_V2) {
        // override for mcv2...
        pool.owner.totalAllocPoint = masterChefV1TotalAllocPoint

        // CVX-WETH hardcode 0 rewards since ended, can remove after swapping out rewarder
        if (pool.id === '1') {
          pool.rewarder.rewardPerSecond = 0
        }

        // vestedQUARTZ to QUARTZ adjustments
        if (pool.rewarder.rewardToken === '0x5dd8905aec612529361a35372efd5b127bb182b3') {
          pool.rewarder.rewardToken = '0xba8a621b4a54e61c442f5ec623687e2a942225ef'
          pool.rewardToken.id = '0xba8a621b4a54e61c442f5ec623687e2a942225ef'
          pool.rewardToken.symbol = 'vestedQUARTZ'
          pool.rewardToken.derivedETH = pair.token1.derivedETH
          pool.rewardToken.decimals = 18
        }

        const decimals = 10 ** pool.rewardToken.decimals

        if (pool.rewarder.rewardToken !== '0x0000000000000000000000000000000000000000') {
          const rewardPerBlock =
            pool.rewardToken.symbol === 'ALCX'
              ? pool.rewarder.rewardPerSecond / decimals
              : pool.rewardToken.symbol === 'LDO'
              ? (77160493827160493 / decimals) * averageBlockTime
              : (pool.rewarder.rewardPerSecond / decimals) * averageBlockTime

          const rewardPerDay =
            pool.rewardToken.symbol === 'ALCX'
              ? (pool.rewarder.rewardPerSecond / decimals) * blocksPerDay
              : pool.rewardToken.symbol === 'LDO'
              ? (77160493827160493 / decimals) * averageBlockTime * blocksPerDay
              : (pool.rewarder.rewardPerSecond / decimals) * averageBlockTime * blocksPerDay

          const rewardPrice = pool.rewardToken.derivedETH * ethPrice

          const reward = {
            currency: new Token(
              ChainId.ETHEREUM,
              getAddress(pool.rewardToken.id),
              Number(pool.rewardToken.decimals),
              pool.rewardToken.symbol,
              pool.rewardToken.name
            ),
            rewardPerBlock,
            rewardPerDay,
            rewardPrice,
          }
          rewards[1] = reward
        }
      } else if (pool.chef === Chef.MINICHEF) {
        const sushiPerSecond = ((pool.allocPoint / pool.miniChef.totalAllocPoint) * pool.miniChef.sushiPerSecond) / 1e18
        const sushiPerBlock = sushiPerSecond * averageBlockTime
        const sushiPerDay = sushiPerBlock * blocksPerDay

        const rewardPerSecond =
          pool.rewarder.rewardPerSecond && chainId === ChainId.ARBITRUM
            ? pool.rewarder.rewardPerSecond / 1e18
            : ((pool.allocPoint / pool.miniChef.totalAllocPoint) * pool.rewarder.rewardPerSecond) / 1e18

        const rewardPerBlock = rewardPerSecond * averageBlockTime

        const rewardPerDay = rewardPerBlock * blocksPerDay

        const reward = {
          [ChainId.MATIC]: {
            currency: NATIVE[ChainId.MATIC],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: maticPrice,
          },
          [ChainId.XDAI]: {
            currency: XDAI_TOKENS.GNO,
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: gnoPrice,
          },
          [ChainId.HARMONY]: {
            currency: NATIVE[ChainId.HARMONY],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: onePrice,
          },
          [ChainId.CELO]: {
            currency: NATIVE[ChainId.CELO],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: celoPrice,
          },
          [ChainId.MOONRIVER]: {
            currency: NATIVE[ChainId.MOONRIVER],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: movrPrice,
          },
          [ChainId.FUSE]: {
            currency: NATIVE[ChainId.FUSE],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: fusePrice,
          },
          [ChainId.FANTOM]: {
            currency: NATIVE[ChainId.FANTOM],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: fantomPrice,
          },
        }

        if (chainId === ChainId.FUSE) {
          // Secondary reward only
          rewards[0] = reward[ChainId.FUSE]
        } else {
          // @ts-ignore TYPE NEEDS FIXING
          rewards[0] = {
            ...defaultReward,
            rewardPerBlock: sushiPerBlock,
            rewardPerDay: sushiPerDay,
          }
          // @ts-ignore TYPE NEEDS FIXING
          if (chainId in reward) {
            // @ts-ignore TYPE NEEDS FIXING
            rewards[1] = reward[chainId]
          }
        }

        if (chainId === ChainId.ARBITRUM && ['9', '11'].includes(pool.id)) {
          rewards[1] = {
            currency: ARBITRUM_TOKENS.SPELL,
            rewardPerBlock,
            rewardPerDay,
            rewardPrice: spellPrice,
          }
        }
        if (chainId === ChainId.ARBITRUM && ['12'].includes(pool.id)) {
          rewards[1] = {
            currency: ARBITRUM_TOKENS.gOHM,
            rewardPerBlock,
            rewardPerDay,
            rewardPrice: ohmPrice,
          }
        }
        if (chainId === ChainId.ARBITRUM && ['13'].includes(pool.id)) {
          rewards[1] = {
            currency: ARBITRUM_TOKENS.MAGIC,
            rewardPerBlock,
            rewardPerDay,
            rewardPrice: magicPrice,
          }
        }
        if (chainId === ChainId.MATIC && ['47'].includes(pool.id)) {
          const rewardTokenPerSecond = 0.00000462962963
          const rewardTokenPerBlock = rewardTokenPerSecond * averageBlockTime
          const rewardTokenPerDay = 0.4
          rewards[1] = {
            currency: MATIC_TOKENS.gOHM,
            rewardPerBlock: rewardTokenPerBlock,
            rewardPerDay: rewardTokenPerDay,
            rewardPrice: ohmPrice,
          }
        }
      } else if (pool.chef === Chef.OLD_FARMS) {
        const sushiPerSecond = ((pool.allocPoint / pool.miniChef.totalAllocPoint) * pool.miniChef.sushiPerSecond) / 1e18
        const sushiPerBlock = sushiPerSecond * averageBlockTime
        const sushiPerDay = sushiPerBlock * blocksPerDay

        const rewardPerSecond =
          pool.rewarder.rewardPerSecond && chainId === ChainId.ARBITRUM
            ? pool.rewarder.rewardPerSecond / 1e18
            : ((pool.allocPoint / pool.miniChef.totalAllocPoint) * pool.rewarder.rewardPerSecond) / 1e18

        const rewardPerBlock = rewardPerSecond * averageBlockTime

        const rewardPerDay = rewardPerBlock * blocksPerDay

        const reward = {
          [ChainId.CELO]: {
            currency: NATIVE[ChainId.CELO],
            rewardPerBlock,
            rewardPerDay: rewardPerSecond * 86400,
            rewardPrice: celoPrice,
          },
        }

        // @ts-ignore TYPE NEEDS FIXING
        rewards[0] = {
          ...defaultReward,
          rewardPerBlock: sushiPerBlock,
          rewardPerDay: sushiPerDay,
        }

        // @ts-ignore TYPE NEEDS FIXING
        if (chainId in reward) {
          // @ts-ignore TYPE NEEDS FIXING
          rewards[1] = reward[chainId]
        }
      }

      return rewards
    }

    const rewards = getRewards()

    let balance = Number(pool.balance / 1e18) // swapPair ? Number(pool.balance / 1e18) : pool.balance / 10 ** kashiPair.token0.decimals

    if (stakedBalaces) {
      const stakedBalance = Object.values(stakedBalaces).find(
        (token) => token.currency.address.toLowerCase() === pool.pair.toLowerCase()
      )
      console.log('stakedBalace:', pool.pair, stakedBalance?.toExact())
      if (stakedBalance) {
        balance = parseFloat(stakedBalance.toExact())
      }
    }

    const tvl = (balance / Number(pair.totalSupply)) * Number(pair.reserveUSD)

    // const tvl = swapPair
    //   ? (balance / Number(swapPair.totalSupply)) * Number(swapPair.reserveUSD)
    //   : balance * kashiPair.token0.derivedETH * ethPrice

    const feeApyPerYear = pair
      ? aprToApy((((((pair?.volumeUSD - pair?.volumeUSD) * 0.0025) / 7) * 365) / pair?.reserveUSD) * 100, 3650) / 100
      : 0

    // const feeApyPerYear =
    //   swapPair && swapPair1d
    //     ? aprToApy((((pair?.volumeUSD - swapPair1d?.volumeUSD) * 0.0025 * 365) / pair?.reserveUSD) * 100, 3650) / 100
    //     : 0

    const feeApyPerMonth = feeApyPerYear / 12
    const feeApyPerDay = feeApyPerMonth / 30
    const feeApyPerHour = feeApyPerDay / blocksPerHour

    const roiPerBlock =
      rewards.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
      }, 0) / tvl

    const rewardAprPerHour = roiPerBlock * blocksPerHour
    const rewardAprPerDay = rewardAprPerHour * 24
    const rewardAprPerMonth = rewardAprPerDay * 30
    const rewardAprPerYear = rewardAprPerMonth * 12

    const roiPerHour = rewardAprPerHour + feeApyPerHour
    const roiPerMonth = rewardAprPerMonth + feeApyPerMonth
    const roiPerDay = rewardAprPerDay + feeApyPerDay
    const roiPerYear = rewardAprPerYear + feeApyPerYear

    // const position = positions.find((position) => position.id === pool.id && position.chef === pool.chef)

    return {
      ...pool,
      pair: {
        ...pair,
        decimals: 18,
        type,
      },
      balance,
      feeApyPerHour,
      feeApyPerDay,
      feeApyPerMonth,
      feeApyPerYear,
      rewardAprPerHour,
      rewardAprPerDay,
      rewardAprPerMonth,
      rewardAprPerYear,
      roiPerBlock,
      roiPerHour,
      roiPerDay,
      roiPerMonth,
      roiPerYear,
      rewards,
      tvl,
      amount,
    }
  }

  return (
    farms
      // .filter((farm) => {
      //   return (
      //     // @ts-ignore TYPE NEEDS FIXING
      //     (swapPairs && swapPairs.find((pair) => pair.id === farm.pair)) ||
      //     // @ts-ignore TYPE NEEDS FIXING
      //     (kashiPairs && kashiPairs.find((pair) => pair.id === farm.pair))
      //   )
      // })
      .map(map)
  )
}
