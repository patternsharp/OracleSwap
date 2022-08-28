import { ChainId, Currency, Token, WNATIVE } from '@sushiswap/core-sdk'
import useHttpLocations from 'app/hooks/useHttpLocations'
import { WrappedTokenInfo } from 'app/state/lists/wrappedTokenInfo'
import React, { FunctionComponent, useMemo } from 'react'

// import Image from '../../components/Image'
import Logo, { UNKNOWN_ICON } from '../Logo'
import CAND from '../../../public/CAND.png'
import CNYX from '../../../public/CNYX.png'
import HS from '../../../public/HS.png'
import COOT from '../../../public/COOT.png'
import ORACLE from '../../../public/ORACLE.png'
import SFIN from '../../../public/SFIN.png'
import SGB from '../../../public/SGB.png'

import WSGB from '../../../public/WSGB.png'
import XFIN from '../../../public/XFIN.png'
import xORACLE from '../../../public/xORACLE.png'

import EXFI from '../../../public/EXFI.png'

import DOOD from '../../../public/DOOD.png'

import PRO from '../../../public/PRO.png'

import LOVE from '../../../public/LOVE.png'

import SFORT from '../../../public/sFORT.png'

import PSB from '../../../public/PNG.png'

import SDOOD from '../../../public/sDOOD.png'


// import PRO_Logo3Gold from '../../../public/PRO_Logo3Gold.png'

const BLOCKCHAIN = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.BSC]: 'binance',
  [ChainId.CELO]: 'celo',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.AVALANCHE_TESTNET]: 'fuji',
  [ChainId.FUSE]: 'fuse',
  [ChainId.HARMONY]: 'harmony',
  [ChainId.HECO]: 'heco',
  [ChainId.MATIC]: 'matic',
  [ChainId.MOONRIVER]: 'moonriver',
  [ChainId.OKEX]: 'okex',
  [ChainId.PALM]: 'palm',
  [ChainId.TELOS]: 'telos',
  [ChainId.XDAI]: 'xdai',
  [ChainId.ARBITRUM]: 'arbitrum',
  [ChainId.AVALANCHE]: 'avalanche',
  [ChainId.HARDHAT]: 'hardhat',
  [ChainId.SGB]: 'songbird',
}

// @ts-ignore TYPE NEEDS FIXING
export const getCurrencyLogoUrls = (currency): string[] => {
  const urls: string[] = []

  if (currency.chainId in BLOCKCHAIN) {
    urls.push(
      // @ts-ignore TYPE NEEDS FIXING
      `https://raw.githubusercontent.com/sushiswap/logos/main/network/${BLOCKCHAIN[currency.chainId]}/${
        currency.address
      }.jpg`
    )
    urls.push(
      // @ts-ignore TYPE NEEDS FIXING
      `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${
        currency.address
      }/logo.png`
    )
    urls.push(
      // @ts-ignore TYPE NEEDS FIXING
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${
        currency.address
      }/logo.png`
    )

    if (currency.chainId === ChainId.SGB) {
      // const hostname = window.location.hostname
      // const protocal = window.location.protocol
      // console.log('window.origin', window.origin)

      urls.push(
        // @ts-ignore TYPE NEEDS FIXING
        `${window.origin}/${currency.symbol}.png`
      )
    }
  }
  return urls
}

const AvalancheLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/avax.jpg'
const BinanceCoinLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/bnb.jpg'
const EthereumLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg'
const FantomLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/ftm.jpg'
const HarmonyLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/one.jpg'
const HecoLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/heco.jpg'
const MaticLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/polygon.jpg'
const MoonbeamLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg'
const OKExLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/okt.jpg'
const xDaiLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/xdai.jpg'
const CeloLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/celo.jpg'
const PalmLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/palm.jpg'
const MovrLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/movr.jpg'
const FuseLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/fuse.jpg'
const TelosLogo = 'https://raw.githubusercontent.com/sushiswap/logos/main/token/telos.jpg'
const SongbirdLogo = 'https://s2.coinmarketcap.com/static/img/coins/64x64/12186.png'

const LOGO: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: EthereumLogo,
  [ChainId.KOVAN]: EthereumLogo,
  [ChainId.RINKEBY]: EthereumLogo,
  [ChainId.ROPSTEN]: EthereumLogo,
  [ChainId.GÖRLI]: EthereumLogo,
  [ChainId.FANTOM]: FantomLogo,
  [ChainId.FANTOM_TESTNET]: FantomLogo,
  [ChainId.MATIC]: MaticLogo,
  [ChainId.MATIC_TESTNET]: MaticLogo,
  [ChainId.XDAI]: xDaiLogo,
  [ChainId.BSC]: BinanceCoinLogo,
  [ChainId.BSC_TESTNET]: BinanceCoinLogo,
  [ChainId.MOONBEAM_TESTNET]: MoonbeamLogo,
  [ChainId.AVALANCHE]: AvalancheLogo,
  [ChainId.AVALANCHE_TESTNET]: AvalancheLogo,
  [ChainId.HECO]: HecoLogo,
  [ChainId.HECO_TESTNET]: HecoLogo,
  [ChainId.HARMONY]: HarmonyLogo,
  [ChainId.HARMONY_TESTNET]: HarmonyLogo,
  [ChainId.OKEX]: OKExLogo,
  [ChainId.OKEX_TESTNET]: OKExLogo,
  [ChainId.ARBITRUM]: EthereumLogo,
  [ChainId.ARBITRUM_TESTNET]: EthereumLogo,
  [ChainId.CELO]: CeloLogo,
  [ChainId.PALM]: PalmLogo,
  [ChainId.PALM_TESTNET]: PalmLogo,
  [ChainId.MOONRIVER]: MovrLogo,
  [ChainId.FUSE]: FuseLogo,
  [ChainId.TELOS]: TelosLogo,
  [ChainId.HARDHAT]: EthereumLogo,
  [ChainId.SGB]: SongbirdLogo,
}

export interface CurrencyLogoProps {
  currency?: Currency
  size?: string | number
  style?: React.CSSProperties
  className?: string
}

const CurrencyLogo: FunctionComponent<CurrencyLogoProps> = ({ currency, size = '24px', className, style }) => {
  const uriLocations = useHttpLocations(
    currency instanceof WrappedTokenInfo ? currency.logoURI || currency.tokenInfo.logoURI : undefined
  )

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative || currency?.equals(WNATIVE[currency.chainId])) {
      // @ts-ignore TYPE NEEDS FIXING
      return [LOGO[currency.chainId], UNKNOWN_ICON]
    }

    if (currency?.isToken) {
      const defaultUrls = [...getCurrencyLogoUrls(currency)]
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls, UNKNOWN_ICON]
      }
      return defaultUrls
    }

    return [UNKNOWN_ICON]
  }, [currency, uriLocations])

  if (currency?.equals(WNATIVE[currency.chainId]) && currency?.chainId === ChainId.SGB) {
    return <img src={WSGB.src} width={size} height={size} className={className} />
  }

  if (currency?.isNative && currency?.chainId === ChainId.SGB) {
    return <img src={SGB.src} width={size} height={size} className={className} />
  }

  if (currency?.chainId === ChainId.SGB) {
    if (currency.symbol === 'ORACLE') {
      return <img src={ORACLE.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'LOVE') {
      return <img src={LOVE.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'SFORT') {
      return <img src={SFORT.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'SDOOD') {
      return <img src={SDOOD.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'PSB') {
      return <img src={PSB.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'PRO') {
      return <img src={PRO.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'CAND') {
      return <img src={CAND.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'CNYX') {
      return <img src={CNYX.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'EXFI') {
      return <img src={EXFI.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'HS') {
      return <img src={HS.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'COOT') {
      return <img src={COOT.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'SFIN') {
      return <img src={SFIN.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'SGB') {
      return <img src={SGB.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'WSGB') {
      return <img src={WSGB.src} width={size} height={size} className={className} />
    }
    if (currency.symbol === 'XFIN') {
      return <img src={XFIN.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'xORACLE') {
      return <img src={xORACLE.src} width={size} height={size} className={className} />
    }

    if (currency.symbol === 'DOOD') {
      return <img src={DOOD.src} width={size} height={size} className={className} />
    }
  }

  if (currency instanceof Token) {
    if (currency.chainId === ChainId.SGB) {
      if (currency.symbol === 'ORACLE') {
        return <img src={ORACLE.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'LOVE') {
        return <img src={LOVE.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'SFORT') {
        return <img src={SFORT.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'SDOOD') {
        return <img src={SDOOD.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'PSB') {
        return <img src={PSB.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'CAND') {
        return <img src={CAND.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'CNYX') {
        return <img src={CNYX.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'EXFI') {
        return <img src={EXFI.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'HS') {
        return <img src={HS.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'COOT') {
        return <img src={COOT.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'SFIN') {
        return <img src={SFIN.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'SGB') {
        return <img src={SGB.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'WSGB') {
        return <img src={WSGB.src} width={size} height={size} className={className} />
      }
      if (currency.symbol === 'XFIN') {
        return <img src={XFIN.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'xORACLE') {
        return <img src={xORACLE.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'PRO') {
        return <img src={PRO.src} width={size} height={size} className={className} />
      }

      if (currency.symbol === 'DOOD') {
        return <img src={DOOD.src} width={size} height={size} className={className} />
      }
    }
  }

  if (currency instanceof WrappedTokenInfo) {
    if (currency.tokenInfo.chainId === ChainId.SGB) {
      if (currency.tokenInfo.symbol === 'CAND') {
        return <img src={CAND.src} width={size} height={size} className={className} />
      }

      if (currency.tokenInfo.symbol === 'LOVE') {
        return <img src={LOVE.src} width={size} height={size} className={className} />
      }

      if (currency.tokenInfo.symbol === 'CNYX') {
        return <img src={CNYX.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'EXFI') {
        return <img src={EXFI.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'HS') {
        return <img src={HS.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'COOT') {
        return <img src={COOT.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'ORACLE') {
        return <img src={ORACLE.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'SFIN') {
        return <img src={SFIN.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'SGB') {
        return <img src={SGB.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'WSGB') {
        return <img src={WSGB.src} width={size} height={size} className={className} />
      }
      if (currency.tokenInfo.symbol === 'XFIN') {
        return <img src={XFIN.src} width={size} height={size} className={className} />
      }

      if (currency.tokenInfo.symbol === 'xORACLE') {
        return <img src={xORACLE.src} width={size} height={size} className={className} />
      }

      if (currency.tokenInfo.symbol === 'PRO') {
        return <img src={PRO.src} width={size} height={size} className={className} />
      }

      if (currency.tokenInfo.symbol === 'DOOD') {
        return <img src={DOOD.src} width={size} height={size} className={className} />
      }

      return (
        <img src={CAND.src} width={size} height={size} className={className} />
        // <Image src={`/CAND.png`} width={size} height={size} alt={currency?.symbol} className={className} />
        // <Logo
        //   srcs={['/CAND.png']}
        //   width={size}
        //   height={size}
        //   alt={currency?.symbol}
        //   className={className}
        //   style={style}
        // />
      )
    }
  }

  return <Logo srcs={srcs} width={size} height={size} alt={currency?.symbol} className={className} style={style} />
}

export default CurrencyLogo
