import React, { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

// export const useMeasure = (parentRef): [React.MutableRefObject<any>, { left: number, top: number, width: number, height: number }] => {
export const useMeasure = (parentRef) => {
  const ref = useRef<any>()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
  useEffect(() => {
    if (ro && parentRef && parentRef.current) {
      ro.observe(parentRef.current)
      return ro.disconnect
    } else if (ro && ref.current) {
      ro.observe(ref.current)
      return ro.disconnect
    }
  }, [])

  // if (parentRef) {
  //   return bounds
  // }
  return [bounds, { ref }] as [typeof bounds, { ref: any }]
}
