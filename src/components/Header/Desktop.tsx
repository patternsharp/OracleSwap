import { NATIVE } from '@sushiswap/core-sdk'
import Container from 'app/components/Container'
import { NAV_CLASS } from 'app/components/Header/styles'
import useMenu from 'app/components/Header/useMenu'
import LanguageSwitch from 'app/components/LanguageSwitch'
import Web3Network from 'app/components/Web3Network'
import Web3Status from 'app/components/Web3Status'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'app/services/web3'
import { useETHBalances } from 'app/state/wallet/hooks'
// import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import Typography from 'app/components/Typography'
import { NavigationItem } from './NavigationItem'
import LogoImage from '../../../public/icons/icon-72x72.png'
import { XIcon } from '@heroicons/react/outline'
import { useDexWarningOpen, useToggleDexWarning } from 'app/state/application/hooks'
import ExternalLink from '../ExternalLink'
const HEADER_HEIGHT = 64

const Desktop: FC = () => {
  const menu = useMenu()
  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const isCoinbaseWallet = useIsCoinbaseWallet()
  const [showAlert, setShowAlert] = useState(true)

  const toggleWarning = useToggleDexWarning()
  const showUseDexWarning = useDexWarningOpen()

  console.log('showUseDexWarning', showUseDexWarning)

  return (
    <>
      <header className="fixed z-20 hidden w-full lg:block" style={{ height: HEADER_HEIGHT }}>
        <nav className={NAV_CLASS}>
          <Container maxWidth="7xl" className="mx-auto">
            {showUseDexWarning && (
              <div className="py-2 px-4 text-[1rem] text-high-emphesis bg-[#eb4326] relative">
                <div className="absolute right-1 top-1">
                  <div
                    className="flex items-center justify-center w-6 h-6 cursor-pointer hover:text-white"
                    onClick={toggleWarning}
                  >
                    <XIcon width={24} height={24} className="text-high-emphesis" />
                  </div>
                </div>
                <Typography variant="xs" weight={700} className="py-0 px-4 text-[1rem] text-high-emphesis bg-[#eb4326]">
                  {`You are using the Oracle Swap Beta platform on the Songbird Canary Network. OracleSwap is
  a brand new DEX on the Songbird Network with low liquidity. It is upto the Flare Community to
  increase the liquidity on this DEX. Please be aware of the associated risks with using DeFi
  platforms.`}
                </Typography>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 px-6">
              <div className="flex gap-4">
                <div className="flex items-center mr-4">
                  <ExternalLink href="https://www.oracleswap.io">
                    <img src={LogoImage.src} className={'w-[30px] h-[30px]'} alt="Logo" />
                    {/* <Image src="/logo.png" alt="OracleSwap logo" width="24px" height="24px" /> */}
                  </ExternalLink>
                </div>

                {menu.map((node) => {
                  return <NavigationItem node={node} key={node.key} />
                })}
              </div>
              <div className="flex items-center justify-end gap-2">
                {library && (library.provider.isMetaMask || isCoinbaseWallet) && (
                  <div className="hidden sm:inline-block">
                    <Web3Network />
                  </div>
                )}

                <div className="flex items-center w-auto text-sm font-bold border-2 rounded shadow cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-900 whitespace-nowrap">
                  {account && chainId && userEthBalance && (
                    <Link href="/portfolio" passHref={true}>
                      <a className="hidden px-3 text-high-emphesis text-bold md:block">
                        {/*@ts-ignore*/}
                        {userEthBalance?.toSignificant(4)} {NATIVE[chainId || 1].symbol}
                      </a>
                    </Link>
                  )}
                  <Web3Status />
                </div>
                <div className="hidden lg:flex">
                  <LanguageSwitch />
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </header>
      <div style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }} />
    </>
  )
}

export default Desktop
