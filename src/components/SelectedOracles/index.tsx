import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { ZERO } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import { WalletIcon } from 'app/components/Icon'
import { HeadlessUiModal } from 'app/components/Modal'
import Typography from 'app/components/Typography'
import Web3Connect from 'app/components/Web3Connect'
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
import React, { useMemo, useState } from 'react'

// import Button from '../Button'
// import { WalletIcon } from '../Icon'
// import Typography from '../Typography'
// import Web3Connect from '../Web3Connect'

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

  const maxSelectAmount = 40

  ///ipfs://QmV3yAjc2WXQNZycGq3G8B6KGfNZutJFcQM3UuCRiXYgBH/61.json
  ///https://ipfs.io/ipfs/QmV3yAjc2WXQNZycGq3G8B6KGfNZutJFcQM3UuCRiXYgBH/61.json

  /// ipfs://QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/61.jpeg
  /// https://ipfs.io/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/61.jpeg

  const liquidityToken = XORACLE

  const balance = useTokenBalance(account ?? undefined, liquidityToken)

  // const [depositValue, setDepositValue] = useState<string>('100')

  const minXOracleAmount = useMinXOracleAmount()

  // const parsedDepositValue = tryParseAmount(depositValue, liquidityToken)

  const { lockedProAmount, lockMode, lockXOracle, unlockTime } = useProStakingUserInfo()

  const minProAmount = useMinProAmount()

  const lowProAmount = useMemo(() => {
    if (lockMode > 0) {
      if (lockedProAmount && lockedProAmount.equalTo(ZERO)) {
        return false
      }

      if (minProAmount && lockedProAmount) {
        return minProAmount.subtract(lockedProAmount).greaterThan(ZERO)
      }
      return true
    }
    return false
  }, [minProAmount, lockedProAmount, lockMode])

  const { walletNFT, stakedNFT } = useProStakingNFTInfo()

  const oracleStakingWeight = useProStakingNFTWeightInfo()

  // const [selectedOracles, setSelectedOracles] = useState<Array<any>>(walletNFT)

  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])

  const [updater, setUpdater] = useState(0)

  const [selectedStakedIDs, setSelectedStakedIDs] = useState<Array<number>>([])

  // const [selectedStakedOracles, setSelectedStakedOracles] = useState<Array<any>>(stakedNFT)

  // const selectedStaledIDs = useMemo(() => {
  //   let ids: number[] = []

  //   selectedStakedOracles.map((item) => {
  //     if (item.selected) {
  //       ids.push(item.edition)
  //     }
  //   })
  //   return ids
  // }, [selectedStakedOracles])

  // @ts-ignore TYPE NEEDS FIXING
  const [approvalState, approve] = useApproveCallback(
    minXOracleAmount?.multiply(selectedIDs.length),
    PROSTAKING_ADDRESS
  )

  const depositError = !minXOracleAmount
    ? 'Invalid xOracle'
    : balance?.lessThan(minXOracleAmount?.multiply(selectedIDs.length)) && lockMode > 0
    ? 'Insufficient xOracle balance'
    : lowProAmount
    ? 'Low Prophet Staked'
    : undefined

  const isDepositValid = !depositError

  const { oracleNFTStake, oracleNFTWithdraw, oracleMultiNFTStake, oracleMultiNFTWithdraw } = useProStakingActions()

  const handleSelectOracles = (id: number) => {
    let ids = [...selectedIDs]

    if (selectedIDs.includes(id)) {
      let index = ids.indexOf(id)

      if (index > -1) {
        selectedIDs.splice(index, 1)
      }
      setSelectedIDs(selectedIDs)

      setUpdater(Date.now())
    } else {
      ids.push(id)
      if (ids.length >= 50) {
        return
      }
      setSelectedIDs(ids)
    }
  }
  const handleAllSelect = (isSelect: boolean) => {
    if (isSelect) {
      let ids: number[] = []
      walletNFT.map((item) => {
        if (ids.length <= maxSelectAmount) {
          ids.push(item.edition)
        }
      })
      setSelectedIDs(ids)
    } else {
      setSelectedIDs([])
    }
  }


  const handleStakedSelectOracles = (id: number) => {
    let ids = [...selectedStakedIDs]

    if (selectedStakedIDs.includes(id)) {
      let index = ids.indexOf(id)

      if (index > -1) {
        selectedStakedIDs.splice(index, 1)
      }
      setSelectedStakedIDs(selectedStakedIDs)

      setUpdater(Date.now())
    } else {
      ids.push(id)
      if (ids.length >= 50) {
        return
      }
      setSelectedStakedIDs(ids)
    }
  }

  const handleStakedAllSelect = (isSelect: boolean) => {
    if (isSelect) {
      let ids: number[] = []
      stakedNFT.map((item) => {
        if (ids.length <= maxSelectAmount) {
          ids.push(item.edition)
        }
      })
      setSelectedStakedIDs(ids)
    } else {
      setSelectedStakedIDs([])
    }
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
    if (!account || selectedStakedIDs?.length === 0) {
      return
    } else {

      if(freeLockTime){
        setPendingTx(true)

        const success = await sendTx(() => oracleMultiNFTWithdraw(selectedStakedIDs))
        if (!success) {
          setPendingTx(false)
          return
        }
  
        setPendingTx(false)
      }else{
        setShowConfirmation(true)
      }
    }
  }

  const withdrawXOracle =  useMemo(()=>{
    if(selectedStakedIDs && selectedStakedIDs.length> 0 && minXOracleAmount && lockXOracle){
      if(minXOracleAmount.multiply(selectedStakedIDs.length).greaterThan(lockXOracle)){
        return lockXOracle.divide(2)

      }else{
        return minXOracleAmount.multiply(selectedStakedIDs.length).divide(2)
      }
    }
    return lockXOracle;
  },[selectedStakedIDs,minXOracleAmount,lockXOracle])

  const multiUnStakeNFTAction = async () => {
    if (!account || selectedStakedIDs?.length === 0) {
      return
    } else {

      setPendingTx(true)

      const success = await sendTx(() => oracleMultiNFTWithdraw(selectedStakedIDs))
      if (!success) {
        setPendingTx(false)
        return
      }

      setPendingTx(false)
      setShowConfirmation(false)
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

  var current = Date.now()

  const freeLockTime = useMemo(() => {
    if (lockMode > 0  && lockedProAmount?.greaterThan(ZERO)) {
      if (unlockTime) {
        if (unlockTime * 1000 > current) {
          return false
        } else {
          return true
        }
      }
    }
    return true
  }, [current, unlockTime, lockMode,lockedProAmount])

  const [showConfirmation, setShowConfirmation] = useState(false)

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
        {walletNFT.map((nft) => (
          <div
            key={nft.edition}
            className={`item p-4 mb-5 sm:mb-0 w-full sm:w-[calc(50%-20px)] md:w-[calc(25%-20px)] rounded-md border-[5px] border-solid ${
              selectedIDs.includes(nft.edition) ? 'border-green-500' : 'border-green-500/0'
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
            <div className="flex flex-col pb-1 text-xs">
              <p>{nft.name}</p>
              <p>Weight: {Object.values(oracleStakingWeight).length > 0 ? oracleStakingWeight[nft.edition] : ''}</p>
            </div>

            <img
              className="object-cover object-center w-full"
              src={`https://oracle.mypinata.cloud/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/${nft.edition}.jpeg`}
              alt="oracle"
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
            {minXOracleAmount && lockMode > 0
              ? `${minXOracleAmount.multiply(selectedIDs.length).toSignificant(6)} ${minXOracleAmount.currency.symbol}`
              : '0 xORACLE'}
          </Typography>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {!account ? (
          <Web3Connect size="lg" color="blue" fullWidth />
        ) : isDepositValid &&
          lockMode > 0 &&
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

      {stakedNFT?.length > 0 && (
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
            {stakedNFT.map((nft) => (
              <div
                key={nft.edition}
                className={`item p-4 mb-5 sm:mb-0 w-full sm:w-[calc(50%-20px)] md:w-[calc(25%-20px)] rounded-md border-[5px] border-solid ${
                  selectedStakedIDs.length === 0 || !selectedStakedIDs.includes(nft.edition)
                    ? 'border-green-500/0'
                    : 'border-green-500'
                }`}
                onClick={() => {
                  handleStakedSelectOracles(nft.edition)
                }}
              >
                <div className="flex flex-col pb-1 text-xs">
                  <p>{nft.name}</p>
                  <p>Weight: {Object.values(oracleStakingWeight).length > 0 ? oracleStakingWeight[nft.edition] : ''}</p>
                </div>

                <img
                  src={`https://oracle.mypinata.cloud/ipfs/QmfZhkQgWgG98JmaoaiUR5qNYPJh6ZS6HVFk5U6gRPaf1W/${nft.edition}.jpeg`}
                  alt="oracle"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              fullWidth
              color={selectedStakedIDs.length === 0 ? 'red' : 'blue'}
              onClick={multiUnStakeNFT}
              disabled={pendingTx || !account || selectedStakedIDs.length === 0}
            >
              {i18n._(t`Unstake NFT`)}
            </Button>
          </div>
        </div>
      )}

      <HeadlessUiModal.Controlled isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxWidth="md">
        <div className="flex flex-col gap-4">
          <HeadlessUiModal.Header header={i18n._(t`Confirm`)} onClose={() => setShowConfirmation(false)} />
          <HeadlessUiModal.BorderedContent className="flex flex-col gap-3 !border-yellow/40  border-0">
            <Typography variant="lg" weight={700} className="text-white ">
              {i18n._(t`Warning you are about to break your time lock!.`)}
            </Typography>
            <Typography variant="sm" weight={700} className="text-red">
              {i18n._(t`You will lose: `)}  {withdrawXOracle?.toSignificant(5)}  {' xORACLE'}
            </Typography>
          </HeadlessUiModal.BorderedContent>
          <Button
            id="confirm-expert-mode"
            color="red"
            variant="filled"
            onClick={() => {
              multiUnStakeNFTAction()
            }}
          >
            {i18n._(t`Break Lock`)}
          </Button>
        </div>
      </HeadlessUiModal.Controlled>
    </div>
  )
}
