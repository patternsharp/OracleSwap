import { ChainId } from '@sushiswap/core-sdk'
import { NETWORK_ICON } from 'app/config/networks'
import NetworkModel from 'app/modals/NetworkModal'
import { useActiveWeb3React } from 'app/services/web3'
import { useNetworkModalToggle } from 'app/state/application/hooks'
import Image from 'next/image'
import React from 'react'
import SGB from '../../../public/SGB.png'

function Web3Network(): JSX.Element | null {
  const { chainId } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <div
      className="flex items-center text-sm font-bold border-2 rounded cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-1000 hover:bg-dark-900 whitespace-nowrap"
      onClick={() => toggleNetworkModal()}
    >
      <div className="grid items-center grid-flow-col  justify-center bg-dark-1000 h-[36px] w-[36px] text-sm rounded pointer-events-auto auto-cols-max text-secondary">
        {/*@ts-ignore TYPE NEEDS FIXING*/}

        {chainId === ChainId.SGB ? (
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
        )}

        {/* <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" /> */}
      </div>
      <NetworkModel />
    </div>
  )
}

export default Web3Network
