import React from 'react'

export const DHtml = (props: any) => {
  const Tag = props.tag || 'div'

  return (
    <Tag className={props.className || ''} dangerouslySetInnerHTML={{ __html: props.html }} />
  )
}
