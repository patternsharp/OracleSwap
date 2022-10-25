import Slider from '@mui/material/Slider'
import Image from 'next/image'
import React, { useState } from 'react'

export const ProphetStaking = () => {
  const [isActive, setActive] = useState(false)
  const toggleClass = () => {
    setActive(!isActive)
  }
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
  return (
    <>
      <div className="flex flex-wrap mt-4 prophet-staking-wrapper">
        <div className="w-full md:w-[calc(100%-316px)] md:mr-4 md:pr-4 bg-dark-800 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4 head">
            <h2 className="text-2xl">Prophet Staking</h2>
            <div
              onClick={toggleClass}
              className={`action cursor-pointer relative w-[60px] h-[30px] rounded-3xl bg-dark-700`}
            >
              <div
                className={`circle absolute top-0 h-[30px] w-[30px] text-2xl rounded-full bg-white text-dark-1000 flex items-center justify-center transition-all ${
                  isActive ? 'left-0' : 'right-0'
                }`}
              >
                {isActive ? '-' : '+'}
              </div>
            </div>
          </div>
          {isActive ? (
            <div className="max-w-lg unstake-wrap">
              <div className="p-4 mb-4 rounded-md box-wrapper">
                <div className="flex items-end justify-between top">
                  <p className="opacity-50">
                    0.00
                    <br />
                    <span className="text-xs">$00</span>
                  </p>
                  <p className="text-xl">PRO</p>
                </div>
                <div className="top flex justify-between items-end pt-2 mt-2 border-t-[1px] border-solid border-white/10">
                  <p className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                      />
                    </svg>

                    <span className="ml-2">Balance:</span>
                  </p>
                  <p>0 PPO</p>
                </div>
              </div>
              <div className="flex justify-between p-4 mt-6 mb-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">ORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-4 rounded-md box-wrapper">
                <p className="text-lg font-semibold">xORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-4 rounded-md box-wrapper">
                <p className="text-lg font-semibold">TIME LOCK</p>
                <p className="text-lg font-semibold text-red-500">1DAY 10 Min 5 Sec</p>
              </div>
              <p className="mt-4 text-red-500">
                *If you unstake your PRO before the time loack period is over you will forfiet 50% of your staked
                PRO/xORACLES!
              </p>
              <button
                type="button"
                className="inline-block px-8 py-2 mt-8 text-xl font-semibold text-white bg-red-500 rounded-md"
              >
                UNSTAKE
              </button>
            </div>
          ) : (
            <div className="max-w-lg stake-wrap">
              <div className="p-4 mb-4 rounded-md box-wrapper">
                <div className="flex items-end justify-between top">
                  <p className="opacity-50">
                    0.00
                    <br />
                    <span className="text-xs">$00</span>
                  </p>
                  <p className="text-xl">PRO</p>
                </div>
                <div className="top flex justify-between items-end pt-2 mt-2 border-t-[1px] border-solid border-white/10">
                  <p className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                      />
                    </svg>

                    <span className="ml-2">Balance:</span>
                  </p>
                  <p>0 PPO</p>
                </div>
              </div>
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
                  onChange={(e, vaule, activeThumb) => {
                    console.log(vaule, activeThumb)
                  }}
                  sx={{ color: 'yellow' }}
                  min={0}
                  max={4}
                  step={1}
                />
              </div>
              <div className="flex justify-between p-4 mt-6 mb-2 rounded-md box-wrapper">
                <p className="text-lg font-semibold">ORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <div className="flex justify-between p-4 rounded-md box-wrapper">
                <p className="text-lg font-semibold">xORACLES SELECTED</p>
                <p className="text-lg font-semibold">333</p>
              </div>
              <button
                type="button"
                className="inline-block px-8 py-2 mt-8 text-xl font-semibold text-white rounded-md bg-yellow"
              >
                STAKE
              </button>
            </div>
          )}
        </div>
        <div className="w-full md:w-[300px]">
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
              <br /> <span className={`text-red-600 ${isActive ? 'opacity-100' : 'opacity-0'}`}>65000 = 0.1857%</span>
            </p>
          </div>
          <div className="px-5 rewards bg-dark-800 rounded-3xl py-7">
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
