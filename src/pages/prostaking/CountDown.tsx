import React, { useEffect, useMemo } from 'react'
import useCountDown from 'react-countdown-hook'

interface CountDownProps {
  text?: string
  time?: number
  hidden?:boolean
}

const getDateStringFromSeconds = (miliseconds: number) => {
  if (miliseconds === 0 || isNaN(miliseconds)) {
    return ''
  }

  const ll = new Date(Math.round(miliseconds))

  const hoursmins = ll?.toISOString().substring(11, 19)

  const days = Math.floor(miliseconds / 1000 / 3600 / 24)

  return String(days) + ' days :' + hoursmins
}

const CountDown = ({ text, time, hidden = false }: CountDownProps) => {
  var current = Date.now()

  const leftTime = useMemo(() => {
    if (time && time * 1000 > current) {
      return time * 1000 - current
    }
    return 0
  }, [current, time])

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(leftTime)

  const harvestScheduleDateString = getDateStringFromSeconds(timeLeft)

  useEffect(() => {
    if (leftTime && start) {
      start(leftTime)
    }
  }, [leftTime, start])

  if(hidden)
  {
    return null
  }

  return (
    <div className="text-lg font-normal text-left text-primary">
      {text}<span className="ml-1 font-medium text-white">{timeLeft === 0 ? 'Now' : harvestScheduleDateString}</span>
    </div>
  )
}

export default CountDown
