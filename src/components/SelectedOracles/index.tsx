import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { ZERO } from '@sushiswap/core-sdk'
import { XORACLE } from 'app/config/tokens'
import { PROSTAKING_ADDRESS } from 'app/constants'
import { classNames } from 'app/functions'
import { ApprovalState, useApproveCallback } from 'app/hooks'
import {
  useMinProAmount,
  useMinXOracleAmount,
  useOracleNFTAllApproved,
  useOracleNFTApprove,
  useProStakingActions,
  useProStakingNFTInfo,
  useProStakingNFTWeightInfo,
  useProStakingUserInfo,
} from 'app/hooks/useProstaking'
import { useActiveWeb3React } from 'app/services/web3'
import { useTokenBalance } from 'app/state/wallet/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { string } from 'yup'

import Button from '../Button'
import { WalletIcon } from '../Icon'
import Typography from '../Typography'
import Web3Connect from '../Web3Connect'

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
export const SelectedOracles = () => {
  const { account } = useActiveWeb3React()

  ///ipfs://QmV3yAjc2WXQNZycGq3G8B6KGfNZutJFcQM3UuCRiXYgBH/61.json
  ///https://ipfs.io/ipfs/QmV3yAjc2WXQNZycGq3G8B6KGfNZutJFcQM3UuCRiXYgBH/61.json

  /// ipfs://QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/61.jpeg
  /// https://ipfs.io/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/61.jpeg

  const liquidityToken = XORACLE

  const balance = useTokenBalance(account ?? undefined, liquidityToken)

  // const [depositValue, setDepositValue] = useState<string>('100')

  const minXOracleAmount = useMinXOracleAmount()

  // const parsedDepositValue = tryParseAmount(depositValue, liquidityToken)

  const { lockedProAmount } = useProStakingUserInfo()

  const minProAmount = useMinProAmount()

  const lowProAmount = useMemo(() => {
    if (minProAmount && lockedProAmount) {
      return minProAmount.subtract(lockedProAmount).greaterThan(ZERO)
    }
    return true
  }, [minProAmount, lockedProAmount])

  const { walletNFT, stakedNFT } = useProStakingNFTInfo()

  const oracleStakingWeight = useProStakingNFTWeightInfo()

  const [selectedOracles, setSelectedOracles] = useState<Array<any>>(walletNFT)

  const selectedIDs = useMemo(() => {
    let ids: number[] = []

    selectedOracles.map((item) => {
      if (item.selected) {
        ids.push(item.edition)
      }
    })
    return ids
  }, [selectedOracles])

  const [selectedStakedOracles, setSelectedStakedOracles] = useState<Array<any>>(stakedNFT)

  const selectedStaledIDs = useMemo(() => {
    let ids: number[] = []

    selectedStakedOracles.map((item) => {
      if (item.selected) {
        ids.push(item.edition)
      }
    })
    return ids
  }, [selectedStakedOracles])

  useEffect(() => {
    if (selectedOracles.length === 0 && walletNFT.length > 0) {
      setSelectedOracles(walletNFT)
    }
  }, [walletNFT, selectedOracles])

  useEffect(() => {
    if (selectedStakedOracles.length === 0 && stakedNFT.length > 0) {
      setSelectedStakedOracles(stakedNFT)
    }
  }, [stakedNFT, selectedStakedOracles])

  // @ts-ignore TYPE NEEDS FIXING
  const [approvalState, approve] = useApproveCallback(
    minXOracleAmount?.multiply(selectedIDs.length),
    PROSTAKING_ADDRESS
  )

  const depositError = !minXOracleAmount
    ? 'Invalid xOracle'
    : balance?.lessThan(minXOracleAmount?.multiply(selectedIDs.length))
    ? 'Insufficient xOracle balance'
    : lowProAmount
    ? 'Low Prophet Staked'
    : undefined

  const isDepositValid = !depositError

  const { oracleNFTStake, oracleNFTWithdraw, oracleMultiNFTStake, oracleMultiNFTWithdraw } = useProStakingActions()

  const handleSelectOracles = (id: number) => {
    // setSelected(id)
    setSelectedOracles(
      selectedOracles.map((item) => {
        if (item.edition === id) {
          return { ...item, selected: !item.selected }
        }
        return item
      })
    )
  }
  const handleAllSelect = (isSelect: boolean) => {
    setSelectedOracles(selectedOracles.map((item) => ({ ...item, selected: isSelect })))
  }

  const handleStakedSelectOracles = (id: number) => {
    setSelectedStakedOracles(
      selectedStakedOracles.map((item) => {
        if (item.edition === id) {
          return { ...item, selected: !item.selected }
        }
        return item
      })
    )
  }
  const handleStakedAllSelect = (isSelect: boolean) => {
    setSelectedStakedOracles(selectedStakedOracles.map((item) => ({ ...item, selected: isSelect })))
  }

  // const [selected, setSelected] = useState<number>()

  // const [stakedSelected, setStakedSelected] = useState<number>()

  const [pendingTx, setPendingTx] = useState(false)

  // const stakeNFT = async () => {
  //   if (!account || !selected) {
  //     return
  //   } else {
  //     setPendingTx(true)

  //     const success = await sendTx(() => oracleNFTStake(selected))
  //     if (!success) {
  //       setPendingTx(false)
  //       return
  //     }

  //     setPendingTx(false)
  //   }
  // }

  const multiStakeNFT = async () => {
    if (!account || selectedIDs?.length === 0) {
      return
    } else {
      setPendingTx(true)

      const success = await sendTx(() => oracleMultiNFTStake(selectedIDs))
      if (!success) {
        setPendingTx(false)
        return
      }

      setPendingTx(false)
    }
  }

  // const UnStakeNFT = async () => {
  //   if (!account || !stakedSelected) {
  //     return
  //   } else {
  //     setPendingTx(true)
  //     const success = await sendTx(() => oracleNFTWithdraw(stakedSelected))
  //     if (!success) {
  //       setPendingTx(false)
  //       return
  //     }
  //     setPendingTx(false)
  //   }
  // }

  const multiUnStakeNFT = async () => {
    if (!account || selectedStaledIDs?.length === 0) {
      return
    } else {
      setPendingTx(true)

      const success = await sendTx(() => oracleMultiNFTWithdraw(selectedStaledIDs))
      if (!success) {
        setPendingTx(false)
        return
      }

      setPendingTx(false)
    }
  }

  const { approveAll, approveStaker } = useOracleNFTApprove()

  // const isOracleNFTApproved = useOracleNFTApproved(selected ? selected : 0)

  const isApprovedAll = useOracleNFTAllApproved()

  const approveNFT = async () => {
    if (!account || selectedIDs?.length === 0) {
      return
    } else {
      setPendingTx(true)

      // const success = await sendTx(() => approveStaker(selected))
      const success = await sendTx(() => approveAll())
      if (!success) {
        setPendingTx(false)
        return
      }

      setPendingTx(false)
    }
  }

  return (
    <div className="mt-5 select-oracles">
      <h2 className="text-xl">Select Your Oracles</h2>
      <p className="mb-2">
        Select The Oracles you would like to deploy. Some Oracles weild more power than others, choose wisely! Each
        Oracle selected must be pair with XORACLE The more Oracles you select the more XORACLE you must pair. Tap to
        select or select all
      </p>
      <button
        onClick={() => {
          handleAllSelect(true)
        }}
        className="inline-block px-2 py-1 mr-2 text-xs text-white rounded-md bg-green/50"
      >
        SELECT ALL
      </button>
      <button
        onClick={() => {
          handleAllSelect(false)
        }}
        className="inline-block px-2 py-1 text-xs text-white rounded-md bg-green/50"
      >
        UNSELECT ALL
      </button>
      <div className="flex flex-wrap justify-between mt-5 items-wrapper">
        {selectedOracles.map((nft) => (
          <div
            key={nft.edition}
            className={`item p-4 mb-5 sm:mb-0 w-full sm:w-[calc(50%-20px)] md:w-[calc(25%-20px)] rounded-md border-[5px] border-solid ${
              nft.selected ? 'border-green-500' : 'border-green-500/0'
            }`}
            onClick={() => {
              // if (selected === nft.edition) {
              //   setSelected(undefined)
              // } else {
              //   setSelected(nft.edition)
              // }
              handleSelectOracles(nft.edition)
            }}
          >
            <p className="flex flex-col pb-1 text-xs">
              <p>{nft.name}</p>
              <p>Weight: {Object.values(oracleStakingWeight).length > 0 ? oracleStakingWeight[nft.edition] : ''}</p>
            </p>

            <img
              src={`https://ipfs.io/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/${nft.edition}.jpeg`}
              alt="oracle"
              className="w"
            />
          </div>
        ))}
      </div>

      <div className="grid justify-center grid-cols-1 sm:flex">
        <div className={classNames('flex justify-between py-2 px-3 w-content')}>
          <div className="flex items-center gap-1.5 mr-1">
            <WalletIcon
              width={16}
              height={14}
              className={classNames(balance ? 'text-high-emphesis' : 'text-low-emphesis')}
            />

            <Typography variant="sm" className={classNames(balance ? 'text-high-emphesis' : 'text-low-emphesis')}>
              {i18n._(t`Balance:`)}
            </Typography>
          </div>
          <Typography
            variant="sm"
            weight={700}
            className={classNames(balance ? 'text-high-emphesis' : 'text-low-emphesis', 'truncate')}
            // onClick={() => onClick(balance)}
            id={'xoracle approve'}
          >
            {balance ? `${balance.toSignificant(6)} ${balance.currency.symbol}` : '0.0000'}
          </Typography>
        </div>

        <div className={classNames('flex justify-between py-2 px-3 w-content')}>
          <div className="flex items-center gap-1.5 mr-1">
            <Typography
              variant="sm"
              className={classNames(minXOracleAmount ? 'text-high-emphesis' : 'text-low-emphesis')}
            >
              {i18n._(t`Min xOracle Amount:`)}
            </Typography>
          </div>
          <Typography
            variant="sm"
            weight={700}
            className={classNames(minXOracleAmount ? 'text-high-emphesis' : 'text-low-emphesis', 'truncate')}
            // onClick={() => onClick(balance)}
            id={'xoracle approve'}
          >
            {minXOracleAmount ? `${minXOracleAmount.toSignificant(6)} ${minXOracleAmount.currency.symbol}` : '0.0000'}
          </Typography>
        </div>

        <div className={classNames('flex justify-between py-2 px-3 w-content')}>
          <div className="flex items-center gap-1.5 mr-1">
            <Typography variant="sm" className={classNames(minProAmount ? 'text-high-emphesis' : 'text-low-emphesis')}>
              {i18n._(t`Min Lock Prophet Amount:`)}
            </Typography>
          </div>
          <Typography
            variant="sm"
            weight={700}
            className={classNames(minProAmount ? 'text-high-emphesis' : 'text-low-emphesis', 'truncate')}
            // onClick={() => onClick(balance)}
            id={'xoracle approve'}
          >
            {minProAmount ? `${minProAmount.toSignificant(6)} ${minProAmount.currency.symbol}` : '0.0000'}
          </Typography>
        </div>
      </div>

      <div className="grid justify-center grid-cols-1 sm:flex">
        <div className={classNames('flex justify-between py-2 px-3 w-content')}>
          <div className="flex items-center gap-1.5 mr-1">
            <Typography variant="sm" className={'text-white'}>
              {i18n._(t`xOracle Selected:`)}
            </Typography>
          </div>
          <Typography
            variant="sm"
            weight={700}
            className={classNames(minXOracleAmount ? 'text-high-emphesis' : 'text-low-emphesis', 'truncate')}
            id={'xoracle approve'}
          >
            {minXOracleAmount
              ? `${minXOracleAmount.multiply(selectedIDs.length).toSignificant(6)} ${minXOracleAmount.currency.symbol}`
              : '0.0000'}
          </Typography>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {!account ? (
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
            {i18n._(t`Approve xORACLE`)}
          </Button>
        ) : !isApprovedAll ? (
          <Button
            fullWidth
            color={'blue'}
            onClick={approveNFT}
            disabled={pendingTx || !account || selectedIDs?.length === 0}
          >
            {i18n._(t`Approve Oracle NFT`)}
          </Button>
        ) : (
          <Button
            fullWidth
            color={selectedIDs?.length === 0 ? 'red' : 'blue'}
            onClick={multiStakeNFT}
            disabled={pendingTx || !account || selectedIDs?.length === 0 || !isDepositValid}
          >
            {depositError || i18n._(t`Stake NFT`)}
          </Button>
        )}

        {/* <Button
          color={'gradient'}
          size={'sm'}
          variant={'filled'}
          disabled={pendingTx || !account || !selected}
          onClick={stakeNFT}
          className="inline-flex items-center px-8 font-bold text-white rounded-full cursor-pointer bg-gradient-to-r from-yellow to-red"
        >
          {`Stake NFT`}
        </Button> */}
      </div>

      {selectedStakedOracles?.length > 0 && (
        <div>
          <h2 className="mt-3 text-xl">Select Your Staked Oracles</h2>

          <button
            onClick={() => {
              handleStakedAllSelect(true)
            }}
            className="inline-block px-2 py-1 mr-2 text-xs text-white rounded-md bg-green/50"
          >
            SELECT ALL
          </button>
          <button
            onClick={() => {
              handleStakedAllSelect(false)
            }}
            className="inline-block px-2 py-1 text-xs text-white rounded-md bg-green/50"
          >
            UNSELECT ALL
          </button>

          <div className="flex flex-wrap justify-between mt-5 items-wrapper">
            {selectedStakedOracles.map((nft) => (
              <div
                key={nft.edition}
                className={`item p-4 mb-5 sm:mb-0 w-full sm:w-[calc(50%-20px)] md:w-[calc(25%-20px)] rounded-md border-[5px] border-solid ${
                  nft.selected ? 'border-green-500' : 'border-green-500/0'
                }`}
                onClick={() => {
                  // if (stakedSelected === nft.edition) {
                  //   setStakedSelected(undefined)
                  // } else {
                  //   setStakedSelected(nft.edition)
                  // }

                  // handleSelectOracles(nft.edition)
                  handleStakedSelectOracles(nft.edition)
                }}
              >
                <p className="flex flex-col pb-1 text-xs">
                  <p>{nft.name}</p>
                  <p>Weight: {Object.values(oracleStakingWeight).length > 0 ? oracleStakingWeight[nft.edition] : ''}</p>
                </p>

                <img
                  src={`https://ipfs.io/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/${nft.edition}.jpeg`}
                  alt="oracle"
                  className="w"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              fullWidth
              color={selectedStaledIDs.length === 0 ? 'red' : 'blue'}
              onClick={multiUnStakeNFT}
              disabled={pendingTx || !account || selectedStaledIDs.length === 0}
            >
              {i18n._(t`Unstake NFT`)}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
