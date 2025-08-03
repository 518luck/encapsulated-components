import type { ReactElement, FC, MouseEvent } from 'react'
import { Children, cloneElement } from 'react'
import copy from 'copy-to-clipboard'

interface CopyToClipboadrdProps {
  text: string
  onCopy?: (text: string, result: boolean) => void
  children: ReactElement<{ onClick?: (event: React.MouseEvent) => void }>
  options?: {
    debug?: boolean
    message?: string
    format?: string
  }
}

const CopyToClipboadrd: FC<CopyToClipboadrdProps> = (props) => {
  const { text, onCopy = () => {}, children, options } = props

  const elem = Children.only(children)

  function onClick(event: MouseEvent) {
    const result = copy(text, options)

    if (onCopy) {
      onCopy(text, result)
    }

    if (typeof elem?.props?.onClick === 'function') {
      elem.props.onClick(event)
    }
  }

  return cloneElement(elem, { onClick })
}

export default CopyToClipboadrd
