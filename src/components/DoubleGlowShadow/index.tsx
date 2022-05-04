import { classNames } from 'app/functions'
import useDesktopMediaQuery from 'app/hooks/useDesktopMediaQuery'
import React, { FC } from 'react'

const DoubleGlowShadow: FC<{ className?: string }> = ({ children, className }) => {
  const isDesktop = useDesktopMediaQuery()
  if (!isDesktop) return <>{children}</>

  return (
    <div className={classNames(className, 'relative w-full max-w-2xl')}>
      {/* <div className={classNames('from-pink/5 to-blue/5 fixed inset-0 bg-gradient-radial z-0 pointer-events-none')} /> */}
      <div className="relative z-10 filter">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
