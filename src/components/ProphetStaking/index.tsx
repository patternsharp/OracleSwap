import Slider from '@mui/material/Slider'
import Image from 'next/image'
import React, { useState } from 'react'
import Switch from '../Switch'
import Typography from '../Typography'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { HeadlessUiModal } from '../Modal'
import AssetInput from '../AssetInput'
import { PROPHET, XORACLE } from 'app/config/tokens'
import { useTokenBalance } from 'app/state/wallet/hooks'
import { useActiveWeb3React } from 'app/services/web3'
import Button from '../Button'
import { tryParseAmount } from 'app/functions'
import { ApprovalState, useApproveCallback, useProStakingContract } from 'app/hooks'
import { useFarmListItemDetailsModal } from 'app/features/onsen/FarmListItemDetails'
import { useAppDispatch } from 'app/state/hooks'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { setOnsenModalOpen } from 'app/features/onsen/onsenSlice'
import { PROSTAKING_ADDRESS } from 'app/constants'
import Web3Connect from '../Web3Connect'
import { useProStakingActions } from 'app/hooks/useProstaking'
import { useRowState } from 'react-table'
import { BigNumber } from '@ethersproject/bignumber'
import { isArray } from 'lodash'

export const ProphetStaking = () => {
  const [toggle, setToggle] = useState(true)
  const [depositValue, setDepositValue] = useState<string>()
  const [withdrawValue, setWithdrawValue] = useState<string>()

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1W',
    },
    {
      value: 2,
      label: '1M',
    },
    {
      value: 3,
      label: '6M',
    },
    {
      value: 4,
      label: '1Y',
    },
  ]
  function valuetext(value: any) {
    return `${value}`
  }
  const { account, chainId } = useActiveWeb3React()
  const liquidityToken = PROPHET

  const balance = useTokenBalance(account || '', liquidityToken)

  const stakedAmount = useTokenBalance(account || '', liquidityToken)

  const parsedDepositValue = tryParseAmount(depositValue, liquidityToken)
  const parsedWithdrawValue = tryParseAmount(withdrawValue, liquidityToken)
  // @ts-ignore TYPE NEEDS FIXING
  const [approvalState, approve] = useApproveCallback(parsedDepositValue, PROSTAKING_ADDRESS)

  const depositError = !parsedDepositValue
    ? 'Enter an amount'
    : balance?.lessThan(parsedDepositValue)
    ? 'Insufficient balance'
    : undefined
  const isDepositValid = !depositError
  const withdrawError = !parsedWithdrawValue
    ? 'Enter an amount'
    : // @ts-ignore TYPE NEEDS FIXING
    stakedAmount?.lessThan(parsedWithdrawValue)
    ? 'Insufficient balance'
    : undefined
  const isWithdrawValid = !withdrawError
  // const { setContent } = useFarmListItemDetailsModal()

  const dispatch = useAppDispatch()

  const addTransaction = useTransactionAdder()

  const { deposit, withdraw } = useProStakingActions()

  const [lockMode, setLockMode] = useState(2)

  return (
    <>
      <div className="flex flex-wrap mt-4 prophet-staking-wrapper">
        <div className="w-full md:w-[calc(100%-316px)] md:mr-4 md:pr-4 bg-dark-800 rounded-3xl p-5">
          <HeadlessUiModal.BorderedContent className="flex flex-col gap-4 bg-dark-800/40">
            <div className="flex justify-between">
              <Typography variant="h3" weight={700} className="text-high-emphesis">
                {toggle ? i18n._(t`Prophet Staking`) : i18n._(t`Prophet Unstake`)}
              </Typography>
              <Switch
                size="md"
                checked={toggle}
                onChange={() => setToggle(!toggle)}
                checkedIcon={<PlusIcon className="text-dark-1000" />}
                uncheckedIcon={<MinusIcon className="text-dark-1000" />}
              />
            </div>

            <AssetInput
              currencyLogo={false}
              currency={liquidityToken}
              value={toggle ? depositValue : withdrawValue}
              onChange={toggle ? setDepositValue : setWithdrawValue}
              balance={toggle ? undefined : stakedAmount}
              showMax={false}
            />
          </HeadlessUiModal.BorderedContent>

          {!toggle ? (
            <div className="flex flex-col w-full gap-1 p-4 stake-wrap">
              <div className="flex justify-between p-2 mt-2 mb-1 rounded-md box-wrapper">
                <p className="text-lg font-semibold">ORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">xORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">TIME LOCK</p>
                <p className="text-lg font-semibold text-red-500">1DAY 10 Min 5 Sec</p>
              </div>
              <p className="mt-2 text-red-500">
                *If you unstake your PRO before the time loack period is over you will forfiet 50% of your staked
                PRO/xORACLES!
              </p>

            </div>
          ) : (
            <div className="flex flex-col w-full gap-1 p-4 stake-wrap">
              <p>Space Time Lock</p>
              <div className="px-2 slider-wrapper">
                <div className="flex items-center justify-between mt-2 -mx-2 labels">
                  <p>1x</p>
                  <p>1.5x</p>
                  <p>2x</p>
                  <p>5x</p>
                  <p>10x</p>
                </div>
                <Slider
                  aria-labelledby="track-inverted-slider"
                  getAriaValueText={valuetext}
                  defaultValue={2}
                  marks={marks}
                  onChange={(e, value, activeThumb) => {
                    console.log(value, activeThumb)
                    if (isArray(value)) {
                      if (value && value.length > 0) {
                        setLockMode(value[0])
                      }
                    } else {
                      setLockMode(value)
                    }
                  }}
                  sx={{ color: 'yellow' }}
                  min={0}
                  max={4}
                  step={1}
                />
              </div>
              <div className="flex justify-between p-2 mt-4 mb-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">ORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">xORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
            </div>
          )}
          <div className="p-4">
            {toggle ? (
              !account ? (
                <Web3Connect size="lg" color="blue" fullWidth />
              ) : isDepositValid &&
                (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING) ? (
                <Button
                  fullWidth
                  loading={approvalState === ApprovalState.PENDING}
                  color="gradient"
                  onClick={approve}
                  disabled={approvalState !== ApprovalState.NOT_APPROVED}
                >
                  {i18n._(t`Approve`)}
                </Button>
              ) : (
                <Button
                  fullWidth
                  color={!isDepositValid && !!parsedDepositValue ? 'red' : 'blue'}
                  onClick={async () => {
                    try {
                      // KMP decimals depend on asset, OLP is always 18
                      // @ts-ignore TYPE NEEDS FIXING

                      console.log(
                        'parsedDepositValue',
                        parsedDepositValue,
                        parsedDepositValue?.quotient,
                        parsedDepositValue?.quotient.toString()
                      )
                      const tx = await deposit(BigNumber.from(parsedDepositValue?.quotient.toString()), lockMode)
                      if (tx?.hash) {
                        // setContent(
                        //   <HeadlessUiModal.SubmittedModalContent
                        //     txHash={tx?.hash}
                        //     header={i18n._(t`Success!`)}
                        //     subheader={i18n._(t`Success! Transaction successfully submitted`)}
                        //     onDismiss={() => dispatch(setOnsenModalOpen(false))}
                        //   />
                        // )
                        addTransaction(tx, {
                          summary: `Deposit `,
                        })
                      }
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  disabled={!isDepositValid}
                >
                  {depositError || i18n._(t`Confirm Deposit`)}
                </Button>
              )
            ) : !account ? (
              <Web3Connect color="blue" className="w-full" />
            ) : (
              <Button
                fullWidth
                color={!isWithdrawValid && !!parsedWithdrawValue ? 'red' : 'pink'}
                onClick={async () => {
                  try {
                    // KMP decimals depend on asset, OLP is always 18
                    // @ts-ignore TYPE NEEDS FIXING
                    const tx = await withdraw(BigNumber.from(parsedWithdrawValue?.quotient.toString()))
                    if (tx?.hash) {
                      addTransaction(tx, {
                        summary: `Withdraw in pro staking`,
                      })
                    }
                  } catch (error) {
                    console.error(error)
                  }
                }}
                disabled={!isWithdrawValid}
              >
                {withdrawError || i18n._(t`Confirm Withdraw`)}
              </Button>
            )}
          </div>
        </div>
        <div className="w-full md:w-[300px] flex flex-col">
          <div className="px-5 mt-4 mb-4 balance bg-dark-800 rounded-3xl py-7 md:mt-0">
            <h2 className="mb-2 text-xl">Stake Balance</h2>
            <div className="flex items-center pb-1 balance1">
              <Image
                src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_32,q_auto/https://app.sushi.com/images/logo.svg"
                height={30}
                width={30}
                alt="true"
              />
              <p className="ml-2">PRO: 1111</p>
            </div>
            <div className="flex items-center pb-1 balance2">
              <Image
                src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_32,q_auto/https://app.sushi.com/images/logo.svg"
                height={30}
                width={30}
                alt="true"
              />
              <p className="ml-2">PRO: 1111</p>
            </div>
            <div className="flex items-center pb-1 balance3">
              <Image
                src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,c_limit,w_32,q_auto/https://app.sushi.com/images/logo.svg"
                height={30}
                width={30}
                alt="true"
              />
              <p className="ml-2">PRO: 1111</p>
            </div>
            <p>
              YOUR TOTAL POOL SHARE:
              <br /> <span className="text-green-600">65000 = 0.1857%</span>
            </p>
            <p>
              TIME LOCK
              <br /> <span className={`text-red-600 ${toggle ? 'opacity-100' : 'opacity-0'}`}>65000 = 0.1857%</span>
            </p>
          </div>
          <div className="flex-1 px-5 rewards bg-dark-800 rounded-3xl py-7">
            <h2 className="mb-2 text-xl">Rewards</h2>
            <p className="flex items-center">
              <span className="w-1/2">SGB .01</span>
              <span className="w-1/2 text-xl">OLPs</span>
            </p>
            <p className="flex items-center">
              <span className="w-1/2">SGB .01</span>
              <span className="w-1/2">PRO/WSGB .01</span>
            </p>
            <p className="flex items-center">
              <span className="w-1/2">SGB .01</span>
              <span className="w-1/2">PRO/WSGB .01</span>
            </p>
            <p className="flex items-center">
              <span className="w-1/2">SGB .01</span>
              <span className="w-1/2">PRO/WSGB .01</span>
            </p>
            <p className="flex items-center">
              <span className="w-1/2">SGB .01</span>
              <span className="w-1/2">PRO/WSGB .01</span>
            </p>
            <button
              type="button"
              className="inline-block px-4 py-2 mt-4 text-xl font-semibold text-white rounded-md bg-yellow"
            >
              HARVEST
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
