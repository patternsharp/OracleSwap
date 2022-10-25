import React, { useState } from 'react'

export const SelectedOracles = () => {
  const [selectedOracles, setSelectedOracles] = useState([
    {
      id: 777,
      Power: 'Hi',
      image:
        'https://i.seadn.io/gae/aZW4aS8-yzmgUhQW-qqz6DxK6rXTaErh9JXOx8CEcDgjUpAxnZ_UgsnfsLyFdTl9etTuomhZgBTbW5JZY8ee9jNczzbrs-D5ZzAi-Kc?auto=format&w=1000',
      selected: true,
    },
    {
      id: 778,
      Power: 'Mi',
      image:
        'https://i.seadn.io/gae/aZW4aS8-yzmgUhQW-qqz6DxK6rXTaErh9JXOx8CEcDgjUpAxnZ_UgsnfsLyFdTl9etTuomhZgBTbW5JZY8ee9jNczzbrs-D5ZzAi-Kc?auto=format&w=1000',
      selected: false,
    },
    {
      id: 779,
      Power: 'Low',
      image:
        'https://i.seadn.io/gae/aZW4aS8-yzmgUhQW-qqz6DxK6rXTaErh9JXOx8CEcDgjUpAxnZ_UgsnfsLyFdTl9etTuomhZgBTbW5JZY8ee9jNczzbrs-D5ZzAi-Kc?auto=format&w=1000',
      selected: false,
    },
    {
      id: 780,
      Power: 'Hi',
      image:
        'https://i.seadn.io/gae/aZW4aS8-yzmgUhQW-qqz6DxK6rXTaErh9JXOx8CEcDgjUpAxnZ_UgsnfsLyFdTl9etTuomhZgBTbW5JZY8ee9jNczzbrs-D5ZzAi-Kc?auto=format&w=1000',
      selected: false,
    },
  ])
  const handleSelectOracles = (id: number) => {
    setSelectedOracles(
      selectedOracles.map((item) => {
        if (item.id === id) {
          return { ...item, selected: !item.selected }
        }
        return item
      })
    )
  }
  const handleAllSelect = (isSelect: boolean) => {
    setSelectedOracles(selectedOracles.map((item) => ({ ...item, selected: isSelect })))
  }
  return (
    <div className="select-oracles mt-5">
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
        className="inline-block text-xs text-white px-2 py-1 rounded-md bg-green/50 mr-2"
      >
        SELECT ALL
      </button>
      <button
        onClick={() => {
          handleAllSelect(false)
        }}
        className="inline-block text-xs text-white px-2 py-1 rounded-md bg-green/50"
      >
        UNSELECT ALL
      </button>
      <div className="items-wrapper flex flex-wrap justify-between mt-5">
        {Object.values(selectedOracles).map((selectApp) => (
          <div
            key={selectApp.id}
            className={`item p-4 mb-5 sm:mb-0 w-full sm:w-[calc(50%-20px)] md:w-[calc(25%-20px)] rounded-md border-[5px] border-solid ${
              selectApp.selected == true ? 'border-green-500' : 'border-green-500/0'
            }`}
            onClick={() => {
              handleSelectOracles(selectApp.id)
            }}
          >
            <p className="text-xs flex items-center justify-between pb-1">
              <span>ORACLE #{selectApp.id}</span>
              <span>POWER: {selectApp.Power}</span>
            </p>
            <img src={selectApp.image} alt="asdas" className="w" />
          </div>
        ))}
      </div>
    </div>
  )
}
