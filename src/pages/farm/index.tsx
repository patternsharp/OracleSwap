import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, ZERO } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
// import Button from 'app/components/Button'
import ExternalLink from 'app/components/ExternalLink'
// import QuestionHelper from 'app/components/QuestionHelper'
import Search from 'app/components/Search'
import Typography from 'app/components/Typography'
import { ORACLE } from 'app/config/tokens'
import { PROPHET_SACRIFICE_ADDRESS } from 'app/constants'
import { Chef, PairType } from 'app/features/onsen/enum'
import FarmList from 'app/features/onsen/FarmList'
import { classNames } from 'app/functions'
// import OnsenFilter from 'app/features/onsen/FarmMenu'
import useFarmRewards from 'app/hooks/useFarmRewards'
import useFuse from 'app/hooks/useFuse'
import { useOracleDistributorCovertAmount } from 'app/hooks/useOracleDistributor'
import useProphetSacrifice, { useProphetSacrificeAmount } from 'app/hooks/useProphetSacrifice'
import { TridentBody } from 'app/layouts/Trident'
import { useActiveWeb3React } from 'app/services/web3'
import { useDexWarningOpen, useWalletModalToggle } from 'app/state/application/hooks'
import { useTokenBalance } from 'app/state/wallet/hooks'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import PROLOGO from '../../../public/PRO_Logo3Gold.png'

import LogoImage from '../../../public/ORACLEGold.png'
import Head from 'next/head'
import QuestionHelper from 'app/components/QuestionHelper'

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

export default function Farm(): JSX.Element {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()

  const router = useRouter()
  const type = router.query.filter === null ? 'all' : (router.query.filter as string)

  const FILTER = {
    // @ts-ignore TYPE NEEDS FIXING
    all: (farm) => farm.allocPoint !== '0' && farm.chef !== Chef.OLD_FARMS,
    // @ts-ignore TYPE NEEDS FIXING
    portfolio: (farm) => farm?.amount && farm.amount > 0,
    // @ts-ignore TYPE NEEDS FIXING
    sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    '2x': (farm) =>
      (farm.chef === Chef.MASTERCHEF_V2 || farm.chef === Chef.MINICHEF) &&
      farm.rewards.length > 1 &&
      farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    old: (farm) => farm.chef === Chef.OLD_FARMS,
  }

  const rewards = useFarmRewards()

  const data = rewards.filter((farm) => {
    // @ts-ignore TYPE NEEDS FIXING
    return type in FILTER ? FILTER[type](farm) : true
  })

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0.4,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })

  const showUseDexWarning = useDexWarningOpen()

  const [pendingTx, setPendingTx] = useState(false)

  const { account } = useActiveWeb3React()

  const oracleBalance = useTokenBalance(account ?? undefined, ORACLE)

  const sacrificeOracle = useTokenBalance(PROPHET_SACRIFICE_ADDRESS ?? undefined, ORACLE)

  const enabled = sacrificeOracle ? sacrificeOracle.greaterThan(ZERO) : false

  const { burnPro } = useProphetSacrifice()

  const walletConnected = !!account
  const toggleWalletModal = useWalletModalToggle()

  const burnProClick = async () => {
    if (!walletConnected) {
      toggleWalletModal()
    } else {
      setPendingTx(true)

      const success = await sendTx(() => burnPro())
      if (!success) {
        setPendingTx(false)
        return
      }

      setPendingTx(false)
    }
  }

  const [foundry, treasury, burned, prophet, total] = useOracleDistributorCovertAmount()

  const [burnAmount, stakerAmount] = useProphetSacrificeAmount()

  return (
    <>
      <Head>
        <title>Oracle Swap | Farm</title>
        <meta key="description" name="description" content="OracleSwap AMM" />
        <meta key="twitter:description" name="twitter:description" content="OracleSwap AMM" />
        <meta key="og:description" property="og:description" content="OracleSwap AMM" />
      </Head>
      {/* <TridentHeader className="sm:!flex-row justify-between items-center" pattern="bg-bubble">
        <div>
          <Typography variant="h2" className="text-high-emphesis" weight={700}>
            {i18n._(t`Onsen Menu`)}
          </Typography>
          <Typography variant="sm" weight={400}>
            {i18n._(t`Earn fees and rewards by depositing and staking your tokens to the platform.`)}
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button id="btn-create-new-pool" size="sm">
            <a
              href="https://docs.google.com/document/d/19bL55ZTjKtxlom2CpVo6K8jL1e-OZ13y6y9AQgw_qT4"
              target="_blank"
              rel="noreferrer"
            >
              {i18n._(t`Apply for Onsen`)}
            </a>
          </Button>
        </div>
      </TridentHeader> */}
      <TridentBody>
        <div className={classNames('flex flex-col w-full gap-6', showUseDexWarning && 'mt-5')}>
          <div className="flex items-center justify-center">
            <div
              className={classNames('flex flex-col flex-wrap p-4 rounded bg-dark-900', !showUseDexWarning && 'mt-3')}
            >
              <div className="flex flex-row justify-center mb-3">
                <img src={LogoImage.src} width={40} height={40} className="mr-5" alt="Logo" />
                <img src={PROLOGO.src} width={40} height={40} alt="Logo" />
              </div>

              <div className="flex flex-row mb-3">
                <p className="text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                  {i18n._(t`Prophet Sacrifice`)}
                </p>

                <QuestionHelper
                  className="!bg-dark-800 !shadow-xl p-2"
                  text={`The Prophet Sacrifice receives ORACLE from the Oracle Distributor and sacrifices it to buy and burn PRO. Some of the PRO could be distributed to stakers.`}
                />
              </div>

              <div className="flex flex-col flex-grow text-base md:mb-3">
                <p>
                  <span>&#128293;</span> Oracle Sacrificed: <span>{prophet?.toSignificant(6)}</span>
                </p>
                <p>
                  <span>&#128293;</span> PRO Burned: <span>{burnAmount?.toSignificant(6)}</span>
                </p>

                <p>
                  <span>&#129472;</span> ORACLE Available:{' '}
                  <span className={classNames(enabled ? 'text-green' : 'text-red')}>{enabled ? 'Yes' : 'No'}</span>
                </p>

                {oracleBalance?.equalTo(ZERO) && (
                  <div className="mt-2 text-base text-red">{`Your oracle balance is zero, so you cannot dist/burn olp`}</div>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    color={'gradient'}
                    size={'sm'}
                    variant={'filled'}
                    disabled={pendingTx || !account || !enabled || oracleBalance?.equalTo(ZERO)}
                    onClick={burnProClick}
                    className="inline-flex items-center px-8 font-bold text-white rounded-full cursor-pointer bg-gradient-to-r from-yellow to-red"
                  >
                    {`DIST/BURN`}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Search search={search} term={term} />
            {/* <OnsenFilter /> */}
          </div>
          <FarmList farms={result} term={term} />
          {chainId && chainId === ChainId.CELO && (
            <Typography variant="xs" weight={700} className="italic text-center text-secondary">
              {i18n._(t`Users can now bridge back to Celo using a new version of Optics.`)}{' '}
              <ExternalLink
                color="blue"
                id={`celo-optics-info-link`}
                href="https://medium.com/@0xJiro/celo-farms-update-migrating-to-the-optics-v2-bridge-e8075d1c9ea"
              >
                {i18n._(t`Click for more info on Optics V1 Migration.`)}
              </ExternalLink>
            </Typography>
          )}
        </div>
      </TridentBody>
    </>
  )
}
