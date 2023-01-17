import { AddressMap, ChainId, JSBI, Percent } from '@sushiswap/core-sdk'

// TODO: Move some of this to config level...

// TODO: update weekly with new constant
export const WEEKLY_MERKLE_ROOT =
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-13/merkle-10959148-11550728.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-14/merkle-10959148-11596364.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-15/merkle-10959148-11641996.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-16/merkle-10959148-11687577.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-17/merkle-10959148-11733182.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-18/merkle-10959148-11778625.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-19/merkle-10959148-11824101.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-20/merkle-10959148-11869658.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-21/merkle-10959148-11915191.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-22/merkle-10959148-11960663.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-23/merkle-10959148-12006121.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/merkle-10959148-12051484.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/protocol-claim.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/merkle-10959148-12051484-2.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-25/merkle-10959148-12096934.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-26/merkle-10959148-12142433.json'
  'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-27/merkle-10959148-12171394.json'

export const PROTOCOL_MERKLE_ROOT =
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/protocol/merkle-10959148-12171394.json'
  'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/protocol-02/merkle-10959148-12171394.json'

export const NetworkContextName = 'NETWORK'

// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%

// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%

// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')

export const ONE_HUNDRED_PERCENT = new Percent('1')

export const ANALYTICS_URL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'https://analytics.sushi.com',
  [ChainId.MATIC]: 'https://analytics-polygon.sushi.com',
  [ChainId.FANTOM]: 'https://analytics-ftm.sushi.com',
  [ChainId.BSC]: 'https://analytics-bsc.sushi.com',
  [ChainId.XDAI]: 'https://analytics-xdai.sushi.com',
  [ChainId.HARMONY]: 'https://analytics-harmony.sushi.com',
  [ChainId.ARBITRUM]: 'https://analytics-arbitrum.sushi.com',
  [ChainId.FUSE]: 'https://analytics-fuse.sushi.com',
  [ChainId.MOONRIVER]: 'https://analytics-moonriver.sushi.com',
  [ChainId.CELO]: 'https://analytics-celo.sushi.com',
}

export const EIP_1559_ACTIVATION_BLOCK: { [chainId in ChainId]?: number } = {
  [ChainId.ETHEREUM]: 12965000,
  [ChainId.ROPSTEN]: 10499401,
  [ChainId.GÖRLI]: 5062605,
  [ChainId.RINKEBY]: 8897988,
}

export const MASTERCHEF_ADDRESS: AddressMap = {
  [ChainId.ETHEREUM]: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
  [ChainId.ROPSTEN]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.RINKEBY]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.GÖRLI]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.KOVAN]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.SGB]: '0xA5E4abe4c3693AB0018df7a2b3b35e33E15f3028',
}

export const ORACLE_DISTRIBUTOR_ADDRESS = '0xD14007c45aC31b7A6F0Cc797Fda899b37C79c402' // '0xC7A56c86959bf5592A4DA13bda241D970590a8ef' // '0xbCE1f75883aCDdf92A165f30e6Ad5da15f5a5E11'

export const PROPHET_SACRIFICE_ADDRESS = '0x5BB7874602aB5Bfecef55177701e667355B8aE2c'

export const ORACLE_NFT_ADDRESS = '0xCdB019C0990c033724DA55f5A04bE6fd6ec1809d'

export const ORACLE_NFT_WEIGHT_ADDRESS = '0x136993B9Bea254CC103d08A8965867e123622bD0'

export const PROSTAKING_ADDRESS =  '0x5fA06E86c6278fF88382bA2E73ca0dfb0d1C257e'// '0x5A0C046439E6C033F7710d19270c64FEbdd6f924' // 0xB93562456258d18d39ec6c5Af414493C9565CAA9'  //'0x9795C372EeA3a1c59EeDCa468743aF76e2E3bf48'

export const PROSTAKING_DISTRIBUTOR_ADDRESS = '0x70C4021dbf4a3978540479978B8A4209bBaD7343'



