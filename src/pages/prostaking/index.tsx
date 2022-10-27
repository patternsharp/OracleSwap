
import { XIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { BAR_ADDRESS, ChainId, SUSHI, ZERO } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import Container from 'app/components/Container'
import Dots from 'app/components/Dots'
import Input from 'app/components/Input'
import { ProphetStaking } from 'app/components/ProphetStaking'
import QuestionHelper from 'app/components/QuestionHelper'
import { SelectedOracles } from 'app/components/SelectedOracles'
import Typography from 'app/components/Typography'
import { ORACLE, XORACLE } from 'app/config/tokens'
import { Feature } from 'app/enums'
import { classNames } from 'app/functions'
import { tryParseAmount } from 'app/functions/parse'
import { ApprovalState, useApproveCallback } from 'app/hooks/useApproveCallback'
import { useProPendingReward, useProStakingInfo, useTotalDistributedReward } from 'app/hooks/useProstaking'
import useSushiBar from 'app/hooks/useSushiBar'
import TransactionFailedModal from 'app/modals/TransactionFailedModal'
import { useActiveWeb3React } from 'app/services/web3'
import { useDexWarningOpen, useProStakingWarningOpen, useToggleProStakingWarning, useWalletModalToggle } from 'app/state/application/hooks'
import { useTokenBalance } from 'app/state/wallet/hooks'
import Head from 'next/head'
// import Image from 'next/image'
import React, { useState } from 'react'

import NetworkGuard from '../../guards/Network'

const INPUT_CHAR_LIMIT = 18

const sendTx = async (txFunc: () => Promise<any>): Promise<boolean> => {
  let success = true
  try {
    const ret = await txFunc()
    if (ret?.error) {
      success = false
    }
  } catch (e) {
    console.error(e)
    success = false
  }
  return success
}

const tabStyle = 'flex justify-center items-center h-full w-full rounded-lg cursor-pointer text-sm md:text-base'
const activeTabStyle = `${tabStyle} text-high-emphesis font-bold bg-dark-900`
const inactiveTabStyle = `${tabStyle} text-secondary`

const buttonStyle =
  'flex justify-center items-center w-full h-14 rounded font-bold md:font-medium md:text-lg mt-5 text-sm focus:outline-none focus:ring'
const buttonStyleEnabled = `${buttonStyle} text-high-emphesis bg-gradient-to-r from-pink-red to-light-brown hover:opacity-90`
const buttonStyleInsufficientFunds = `${buttonStyleEnabled} opacity-60`
const buttonStyleDisabled = `${buttonStyle} text-secondary bg-dark-700`
const buttonStyleConnectWallet = `${buttonStyle} text-high-emphesis bg-blue hover:bg-opacity-90`

function ProStaking() {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()

  const {totalProAmount,totalxOracleAmount ,totalPoolSize,totalNFTCount} = useProStakingInfo()

  const distributedReward =  useTotalDistributedReward()

  const showUseDexWarning = useDexWarningOpen()

  const showWarning  = useProStakingWarningOpen()

  const toggleWarning = useToggleProStakingWarning()

  return (
    <Container id="prostaking-page" className="py-4 md:py-8 lg:py-12" maxWidth="5xl">
      <Head>
        <title key="title">Oracle Swap | ProStaking</title>
        <meta key="description" name="description" content="ProStaking" />
        <meta key="twitter:url" name="twitter:url" content="https://dex.oracleswap.io/stake" />
        <meta key="twitter:title" name="twitter:title" content="STAKE ORACLE" />
        <meta key="twitter:description" name="twitter:description" content="ProStaking" />
        {/* <meta key="twitter:image" name="twitter:image" content="https://app.sushi.com/images/xsushi-sign.png" /> */}
        <meta key="og:title" property="og:title" content="STAKE ORACLE" />
        {/* <meta key="og:url" property="og:url" content="https://app.sushi.com/stake" /> */}
        {/* <meta key="og:image" property="og:image" content="https://app.sushi.com/images/xsushi-sign.png" /> */}
        <meta key="og:description" property="og:description" content="ProStaking" />
      </Head>
      {showWarning && (
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
            {`WARNING: THIS FEATURE IS STILL IN THE EXPERIMENTAL/TESTING STAGE. IT IS NOT RECOMMENDED TO STAKE MORE THAN 3% OF YOUR HOLDINGS! 
USE AT YOUR OWN RISK!`}
          </Typography>
        </div>
      )}

      <div className="flex flex-col w-full min-h-full">
        <div className={classNames('', showUseDexWarning && 'mt-5')}>
          <div className="flex flex-wrap top-area">
            <div className="w-full md:w-[calc(100%-300px)] md:pr-4">
              <h1 className="text-[30px] sm:text-[40px] lg:text-[50px]">The Oracles/PRO Multi Staking</h1>
              <div className="mb-4 content">
                <p>
                  This is were The Oracles and PRO unite.
                  <br /> Stake PRO,THE ORACLE NFTs, & xORACLE to harvest the rewards generated by the Oracle Factory,
                  Oracle Distributor, Prophet Sacrifice & more.
                  <br /> This staking system distributes a variety of tokens and token pairs. Some tokens are PRO,
                  xORACLE, ORACLE OLPs and more. Main examples of OLPs are PRO pairs like PRO/SGB, PRO/ORACLE. OLPs from
                  future pairs with PRO will be distributed here.
                </p>
              </div>
              <div className="p-5 mb-4 bg-red-500 rounded-md warning">
                <p>
                  Warning: 1% of your PRO will be burnt when you STAKE/UNSTAKE. Be mindful of this when staking. If you
                  break your timelocks you will loose 50% of your PROXXORACLE stake. Rewards are generated by user
                  transactions and are unpredictable. Rewards may take time to cover burn losses. Use at your own risk.
                </p>
              </div>
              <div className="flex flex-wrap p-5 rounded-md global-stat bg-dark-800">
                <div className="w-full sm:w-1/2">
                  <h3 className="text-2xl">Global Stats</h3>
                  <p>{`Current Global Pool Size:  ${totalPoolSize? totalPoolSize.toSignificant(6): ''}`}</p>
                  <p>{`Total PRO Locked:  ${totalProAmount? totalProAmount.toSignificant(6): ''}`}</p>
                  <p>{`Total Oracle NFTs Locked:  ${totalNFTCount? totalNFTCount: ''}`}</p>
                  <p>{`Total XORACLE Locked:  ${totalxOracleAmount? totalxOracleAmount.toSignificant(6): ''}`}</p>
                </div>
                <div className="w-full mt-5 sm:w-1/2 sm:mt-0">
                  <p className="text-lg">DISTRIBUTED</p>
                  {
                    distributedReward.map((item,index) => (<p key={`rewardinfo-${index}`}>{`${item.token.symbol}: ${item.amount?item.amount.toSignificant(6):''}`}</p>))
                  }
                  {/* <p>SGB: 3500</p>
                  <p>W56B: 3500</p>
                  <p>PRO: 5000</p>
                  <p>ORACLE: 10000</p>
                  <p>XORACLE: 2000</p>
                  <p>OLPs Total: 500</p> */}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[300px] mt-4 md:mt-0 bg-dark-800 rounded-3xl p-5">
              <h2 className="mb-2 text-2xl">Prophet Parameters</h2>
              <p>
                -Stake just PRO with or without a timelock. The timelock multiplies your PRO Power giving you a larger
                share of the pool.
                <br />
                -To add Oracle NFTS you must stake a min of 1111 PRO one time. You must also stake 100 xORACLE per NFT
                you staked.
                <br />
                -Consequences for breaking the spacetime barrier: Forfeit 50% of your locked PRO/xORACLE. Half of this
                PRO/xORACLE gets sent to the void. Half goes back to the Loyal Stakers.
              </p>
            </div>
          </div>
          <ProphetStaking  totalPoolSize={totalPoolSize} />
          <SelectedOracles />
        </div>
      </div>
    </Container>
  )
}
ProStaking.Guard = NetworkGuard(Feature.VESTING)
export default ProStaking
