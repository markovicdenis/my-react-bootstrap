import React, { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useMeasure = (): [React.MutableRefObject<any>, { left: number, top: number, width: number, height: number }] => {
  const ref = useRef(null as any)
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
  console.log(ref)
  useEffect(() => {
    if (ro && ref.current) {
      ro.observe(ref.current)
      return ro.disconnect
    }
  },[])
  return [ref, bounds]
}
