import { cloneElement, useLayoutEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import useMutateObserver from './useMutateObserver'

interface MutateObserverProps {
  options?: MutationObserverInit // 监听配置
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void // 变化回调
  children: ReactElement // 要监听的子组件
}

const MutateObserver: React.FC<MutateObserverProps> = (props) => {
  const { options, onMutate = () => {}, children } = props

  const elementRef = useRef<HTMLElement>(null)

  const [target, setTarget] = useState<HTMLElement>()

  useMutateObserver(target!, onMutate, options)

  useLayoutEffect(() => {
    setTarget(elementRef.current!)
  }, [])

  if (!children) {
    return null
  }

  return cloneElement(children, {
    ref: elementRef,
  } as React.HTMLAttributes<HTMLElement>)
}

export default MutateObserver
