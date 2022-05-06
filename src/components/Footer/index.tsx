import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DiscordIcon, TwitterIcon, TelegramIcon, YoutubeIcon } from 'app/components/Icon'
// import Typography from 'app/components/Typography'
// import { Feature } from 'app/enums'
// import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Container from '../Container'

import LogoImage from '../../../public/songbird.png'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useNetworkModalToggle } from 'app/state/application/hooks'
// import Image from 'next/image'
// import SGB from '../../../public/SGB.png'
// import { ChainId } from '@sushiswap/core-sdk'
// import { NETWORK_ICON } from 'app/config/networks'
const Footer = () => {
  const { i18n } = useLingui()
  const { library } = useActiveWeb3React()
  const isCoinbaseWallet = useIsCoinbaseWallet()

  const toggleNetworkModal = useNetworkModalToggle()

  return (
    <div className="z-10 w-full py-20 mt-20">
      <Container maxWidth="7xl" className="px-6 mx-auto">
        <div className="grid grid-cols-2 gap-2 pt-8 border-t xs:px-6 border-dark-900 sm:gap-3">
          <div className="flex flex-col col-span-2 gap-3 sm:col-span-1">
            {/* <div className="flex items-center justify-start gap-2">
              <div className="">
                <Image src="https://app.sushi.com/images/logo.svg" alt="OracleSwap logo" width="28px" height="28px" />
              </div>
              <Typography variant="h2" weight={700} className="tracking-[0.02em] scale-y-90 hover:text-high-emphesis">
                OracleSwap
              </Typography>
            </div> */}
            {/* <Typography variant="xs" className="text-low-emphesis">
              {i18n._(t`Our community is building a comprehensive decentralized trading platform for the future of finance. Join
              us!`)}
            </Typography> */}
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/Oracle_Swap" target="_blank" rel="noreferrer">
                <TwitterIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://t.me/OracleSwapOffical" target="_blank" rel="noreferrer">
                <TelegramIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://www.youtube.com/channel/UCIaaQbRoi5TV7epRLg8y3Mg" target="_blank" rel="noreferrer">
                <YoutubeIcon width={16} className="text-low-emphesis" />
              </a>
              <a href="https://discord.gg/WbDnWcRBxw" target="_blank" rel="noreferrer">
                <DiscordIcon width={16} className="text-low-emphesis" />
              </a>

              <Link href="/portfolio" passHref={true}>
                <a className="text-low-emphesis ">
                  {/*@ts-ignore*/}
                  {i18n._(t`Portfolio`)}
                </a>
              </Link>

              {library && (library.provider.isMetaMask || isCoinbaseWallet) && (
                <div
                  className="flex items-center text-sm  text-low-emphesis cursor-pointer pointer-events-auto select-none   whitespace-nowrap"
                  onClick={() => toggleNetworkModal()}
                >
                  {i18n._(t`Network`)}
                  {/* <div className="grid items-center grid-flow-col  justify-center bg-dark-1000 h-[36px] w-[36px] text-sm rounded pointer-events-auto auto-cols-max text-secondary"> */}
                  {/*@ts-ignore TYPE NEEDS FIXING*/}
                  {/* {chainId === ChainId.SGB ? (
                      <img src={SGB.src} className="rounded-md" width="22px" height="22px" />
                    ) : (
                      <Image
                        // @ts-ignore TYPE NEEDS FIXING
                        src={NETWORK_ICON[key]}
                        alt="Switch Network"
                        className="rounded-md"
                        width="22px"
                        height="22px"
                      />
                    )} */}

                  {/* </div> */}
                </div>
              )}

              <a href="https://help.oracleswap.io" target="_blank" rel="noreferrer">
                <span className="text-low-emphesis">{i18n._(t`Docs`)}</span>
              </a>
            </div>
          </div>
          {/* <div className="flex flex-col gap-1 text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Products`)}
            </Typography>
            <Link
              href={featureEnabled(Feature.TRIDENT, chainId || 1) ? '/trident/pools' : '/legacy/pools'}
              passHref={true}
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Liquidity Pools`)}
              </Typography>
            </Link>
            <Link href="/lend" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Lending`)}
              </Typography>
            </Link>
            <Link href="/miso" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Launchpad`)}
              </Typography>
            </Link>
            <a href="https://shoyunft.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Shoyu NFT`)}
              </Typography>
            </a>
            <Link href="/tools" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Tools`)}
              </Typography>
            </Link>
          </div> */}
          {/* <div className="flex flex-col gap-1 md:text-right lg:text-right"> */}
          {/* <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              <a href="https://help.oracleswap.io" target="_blank" rel="noreferrer">
                {i18n._(t`Help`)}
              </a>
            </Typography> */}
          {/* <a href="https://docs.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`What is OracleSwap?`)}
              </Typography>
            </a>
            <a href="https://discord.gg/NVPXN4e" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Discord`)}
              </Typography>
            </a>
            <a href="https://twitter.com/sushiswap" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Twitter`)}
              </Typography>
            </a>
            <a href="https://forum.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Ask on Forum`)}
              </Typography>
            </a> */}
          {/* </div> */}
          {/* <div className="flex flex-col gap-1 text-right xs:text-right md:text-left lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Developers`)}
            </Typography>
            <a href="https://docs.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`GitBook`)}
              </Typography>
            </a>
            <a href="https://github.com/sushiswap" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`GitHub`)}
              </Typography>
            </a>
            <a href="https://dev.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Development`)}
              </Typography>
            </a>
            <a href="https://docs.openmev.org" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`OracleSwap Relay`)}
              </Typography>
            </a>
          </div> */}
          {/* <div className="flex flex-col gap-1 md:text-right lg:text-right">
            <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Governance`)}
            </Typography>
            <a href="https://forum.sushi.com" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Forum & Proposals`)}
              </Typography>
            </a>
            <a href="https://snapshot.org/#/sushigov.eth" target="_blank" rel="noreferrer">
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Vote`)}
              </Typography>
            </a>
          </div> */}

          <div className="flex flex-row justify-start gap-1 text-right sm:justify-end">
            <div className="flex items-center ">
              <a href="https://flare.xyz/" target="_blank" rel="noreferrer">
                <img src={LogoImage.src} className={'h-[50px]'} alt="Logo" />
              </a>
            </div>
            {/* <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
              {i18n._(t`Protocol`)}
            </Typography>
            <a
              href="https://docs.google.com/document/d/19bL55ZTjKtxlom2CpVo6K8jL1e-OZ13y6y9AQgw_qT4"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Apply for Onsen`)}
              </Typography>
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSecahmrXOJytn-wOUB8tEfONzOTP4zjKqz3sIzNzDDs9J8zcA/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Apply for Miso`)}
              </Typography>
            </a> */}

            {/* <Link href="/vesting" passHref={true}>
              <Typography variant="xs" className="text-low-emphesis hover:text-high-emphesis">
                {i18n._(t`Vesting`)}
              </Typography>
            </Link> */}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
