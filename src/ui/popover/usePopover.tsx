import { useState, useRef } from "react"

export function usePopover() {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const secondPop = useRef(null)

  const toggle = (e) => {
    setPopoverOpen((p) => !p)
  }

  return { ref: secondPop, toggle, isOpen: popoverOpen }
}
