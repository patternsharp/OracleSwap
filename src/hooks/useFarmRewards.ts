import { getAddress } from '@ethersproject/address'
import { ChainId, Currency, JSBI, NATIVE, SUSHI, SUSHI_ADDRESS, Token } from '@sushiswap/core-sdk'
import { ARBITRUM_TOKENS, MATIC_TOKENS, XDAI_TOKENS, XORACLE, PROPHET } from 'app/config/tokens'
import { Chef, PairType } from 'app/features/onsen/enum'
import { usePositions, useUserInfo } from 'app/features/onsen/hooks'
import { aprToApy } from 'app/functions/convert'
import { MASTERCHEF_ADDRESS } from 'app/constants'
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

  const info = useSingleCallResult(contract, 'proPerBlock')?.result

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

export function useMasterChefTotalAllocPoint() {
  const contract = useMasterChefContract(false)

  const info = useSingleCallResult(contract, 'totalAllocPoint')?.result

  const value = info?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return useMemo(() => {
    if (amount) {
      const totalAllocPoint = JSBI.toNumber(amount)
      return totalAllocPoint
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
      allocPoint: 160,
      balance: 0,
      chef: 0,
      id: '2',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x1987E504E70b9ACbAa4E042FDDE4ecB6CEaf5b77',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 60,
      balance: 0,
      chef: 0,
      id: '0',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x5795377c85e0fdf6370fae1b74fe03b930c4a892',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 20,
      balance: 0,
      chef: 0,
      id: '1',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x728a6a7F7f4eeD1aeBB268e37BD5ca5071818457',
      slpBalance: 0,
      userCount: '0',
    },

    {
      accSushiPerShare: '',
      allocPoint: 140,
      balance: 0,
      chef: 0,
      id: '3',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xcAC275AF30B8D66c866F6C714d2119E87BA9c5b1',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 90,
      balance: 0,
      chef: 0,
      id: '4',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x5dc49c1deA70D84408fa86a0Ef97AD21F8B6aA3a',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 80,
      balance: 0,
      chef: 0,
      id: '5',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x6a4489858E7d168B940E03Da8933c377Af8f7863',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '6',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x110d911F007f90969131A83c0f74135429a6109a',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '7',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x4C71594d879310908A7ABF56689084eE4225b569',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '8',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x7Bf38785521b008FcDcB4655CBB55901BE9bD94c',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '9',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x97300650d6984259D0F9731173D96207cCBe67Be',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '10',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xE54f1aF5Fa8a23cE99a630Db21c351d4b9E56234',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 50,
      balance: 0,
      chef: 0,
      id: '11',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xcD307B9869d870BA67b6403EA234e02dbaC9f97A',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 30,
      balance: 0,
      chef: 0,
      id: '12',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x61db2FCd5e6bB80E33c08E3376F9677a0182E7e9',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 30,
      balance: 0,
      chef: 0,
      id: '13',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xf5Ede1927C339A5D209938f4C04A1D5008D4dfd4',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 30,
      balance: 0,
      chef: 0,
      id: '14',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xcF11e96BFa29332aF5BC3Bfcc1cBccEC94DB2919',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 20,
      balance: 0,
      chef: 0,
      id: '15',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x6eE75C89305b8D5D40361dA0685b2CE786b49B1b',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 20,
      balance: 0,
      chef: 0,
      id: '16',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0x30f1907D4B5D23c1AAC00D803211bC992D35F774',
      slpBalance: 0,
      userCount: '0',
    },
    {
      accSushiPerShare: '',
      allocPoint: 20,
      balance: 0,
      chef: 0,
      id: '17',
      lastRewardTime: 12505142,
      owner: {
        id: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
        totalAllocPoint: 1000,
      },
      pair: '0xfDb3c94cA8aD50A35516f2A3d13d257A57A57C02',
      slpBalance: 0,
      userCount: '0',
    },
  ]

  const liquidityTokens = useMemo(
    () =>
      farms.map((farm) => {
        if (farm.pair === '0x5795377c85e0fdf6370fae1b74fe03b930c4a892') {
          return XORACLE
        } else {
          const token = new Token(ChainId.SGB, getAddress(farm.pair), 18, 'OLP')
          return token
        }
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

  const swapPairs = [
    {
      decimals: 18,
      id: '0x5795377c85e0fdf6370fae1b74fe03b930c4a892',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x5795377c85e0fdf6370fae1b74fe03b930c4a892',
        name: 'OracleBar',
        symbol: 'xORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,

      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      type: 2,
      name: 'OracleBar',
      symbol: 'xORACLE',
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x728a6a7F7f4eeD1aeBB268e37BD5ca5071818457',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x8d32E20d119d936998575B4AAff66B9999011D27',
        name: 'CanaryX',
        symbol: 'CNYX',
        totalSupply: 1680,
      },

      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x1987E504E70b9ACbAa4E042FDDE4ecB6CEaf5b77',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },

    {
      decimals: 18,
      id: '0xcAC275AF30B8D66c866F6C714d2119E87BA9c5b1',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xf810576A68C3731875BDe07404BE815b16fC0B4e',
        name: 'Prophet',
        symbol: 'PRO',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x5dc49c1deA70D84408fa86a0Ef97AD21F8B6aA3a',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xf810576A68C3731875BDe07404BE815b16fC0B4e',
        name: 'Prophet',
        symbol: 'PRO',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },

    {
      decimals: 18,
      id: '0x6a4489858E7d168B940E03Da8933c377Af8f7863',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x5795377c85e0fdf6370fae1b74fe03b930c4a892',
        name: 'OracleFoundry',
        symbol: 'xORACLE',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },

    {
      decimals: 18,
      id: '0x110d911F007f90969131A83c0f74135429a6109a',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xe4671844Fcb3cA9A80A1224B6f9A0A6c2Ba2a7d5',
        name: 'CootieCoin',
        symbol: 'COOT',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x4C71594d879310908A7ABF56689084eE4225b569',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x8d32E20d119d936998575B4AAff66B9999011D27',
        name: 'CanaryX',
        symbol: 'CNYX',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x7Bf38785521b008FcDcB4655CBB55901BE9bD94c',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xC348F894d0E939FE72c467156E6d7DcbD6f16e21',
        name: 'Experimental Finance Token',
        symbol: 'EXFI',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x97300650d6984259D0F9731173D96207cCBe67Be',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x0D94e59332732D18CF3a3D457A8886A2AE29eA1B',
        name: 'Songbird Finance Token',
        symbol: 'SFIN',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0xE54f1aF5Fa8a23cE99a630Db21c351d4b9E56234',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x70Ad7172EF0b131A1428D0c1F66457EB041f2176',
        name: 'Canary Dollar',
        symbol: 'CAND',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0xcD307B9869d870BA67b6403EA234e02dbaC9f97A',
      reserve0: 0.0887405995540289756,
      reserve1: 0.04641,
      reserveETH: 1183.351142427706157233201110976883,
      reserveUSD: 0.004,
      timestamp: 1621898381,
      token0: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xd7565b16b65376e2ddb6c71e7971c7185a7ff3ff',
        name: 'OracleSwap.io',
        symbol: 'ORACLE',
        totalSupply: 1680,
      },
      token0Price: 0.749748,
      token1: {
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x612c20D14493dC6a389603aEF56006AD6a09A76f',
        name: 'DoodCatsToken',
        symbol: 'DOOD',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },

    {
      decimals: 18,
      id: '0x61db2FCd5e6bB80E33c08E3376F9677a0182E7e9',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xe4671844Fcb3cA9A80A1224B6f9A0A6c2Ba2a7d5',
        name: 'CootieCoin',
        symbol: 'COOT',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0xf5Ede1927C339A5D209938f4C04A1D5008D4dfd4',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0xC348F894d0E939FE72c467156E6d7DcbD6f16e21',
        name: 'Experimental Finance Token',
        symbol: 'EXFI',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0xcF11e96BFa29332aF5BC3Bfcc1cBccEC94DB2919',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x0D94e59332732D18CF3a3D457A8886A2AE29eA1B',
        name: 'Songbird Finance Token',
        symbol: 'SFIN',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x70Ad7172EF0b131A1428D0c1F66457EB041f2176',
        name: 'Canary Dollar',
        symbol: 'CAND',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0x30f1907D4B5D23c1AAC00D803211bC992D35F774',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x612c20D14493dC6a389603aEF56006AD6a09A76f',
        name: 'DoodCatsToken',
        symbol: 'DOOD',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
    {
      decimals: 18,
      id: '0xfDb3c94cA8aD50A35516f2A3d13d257A57A57C02',
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
        derivedETH: 0.0003068283960261003490764609134664169,
        id: '0x9dC8639bff70B019088f0b7D960561654269B5BE',
        name: 'Honey Stick',
        symbol: 'HS',
        totalSupply: 1680,
      },
      token1Price: 0.014,
      totalSupply: 0.316227765016,
      trackedReserveETH: 1183.351142427706157233201110976883,
      txCount: 81365,
      untrackedVolumeUSD: 46853.79482616671033425777223395,
      volumeUSD: 4684.23711596607606598865310647,
    },
  ]

  const averageBlockTime = useAverageBlockTime({ chainId })

  const masterChefV1TotalAllocPoint = useMasterChefTotalAllocPoint() //useMasterChefV1TotalAllocPoint()
  const masterChefV1SushiPerBlock = useMasterChefRewardPerBlock() // useMasterChefV1SushiPerBlock()

  console.log('masterChef', masterChefV1TotalAllocPoint, masterChefV1SushiPerBlock)

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

  const prolPrice = 0

  const blocksPerDay = 86400 / Number(averageBlockTime)

  // @ts-ignore TYPE NEEDS FIXING
  const map = (pool) => {
    // TODO: Deal with inconsistencies between properties on subgraph
    pool.owner = pool?.owner || pool?.masterChef || pool?.miniChef
    pool.balance = pool?.balance || pool?.slpBalance

    const liquidityToken = new Token(ChainId.SGB, getAddress(pool.pair), 18, 'OLP')

    const stakedAmount = useUserInfo(pool, liquidityToken)

    const amount = parseFloat(stakedAmount ? stakedAmount?.toSignificant(10) : '0')

    // // @ts-ignore TYPE NEEDS FIXING
    const swapPair = swapPairs?.find((pair) => pair.id === pool.pair)
    // // @ts-ignore TYPE NEEDS FIXING
    // const swapPair1d = swapPairs1d?.find((pair) => pair.id === pool.pair)
    // // @ts-ignore TYPE NEEDS FIXING
    // const kashiPair = kashiPairs?.find((pair) => pair.id === pool.pair)

    const pair = swapPair // || kashiPair

    const type = swapPair?.type ? swapPair.type : PairType.SWAP // swapPair ? PairType.SWAP : PairType.KASHI

    const blocksPerHour = 3600 / averageBlockTime

    function getRewards() {
      // TODO: Some subgraphs give sushiPerBlock & sushiPerSecond, and mcv2 gives nothing
      const sushiPerBlock =
        pool?.owner?.sushiPerBlock / 1e18 ||
        (pool?.owner?.sushiPerSecond / 1e18) * averageBlockTime ||
        masterChefV1SushiPerBlock

      pool.owner.totalAllocPoint = masterChefV1TotalAllocPoint

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
        token: 'PRO',
        icon: '/PRO.png',
        rewardPerBlock,
        currency: PROPHET,
        rewardPerDay: rewardPerBlock * blocksPerDay,
        rewardPrice: prolPrice,
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
          // pool.rewardToken.derivedETH = pair?.token1?.derivedETH
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

    // const tvl = (balance / Number(pair.totalSupply)) * Number(pair.reserveUSD)

    const tvl = balance

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
