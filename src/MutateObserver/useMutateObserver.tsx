import { useEffect } from 'react'

const defaultOptions: MutationObserverInit = {
  subtree: true, // 监听所有后代元素
  childList: true, // 监听子元素变化
  attributes: true, // 监听属性变化
}

export default function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[], // 要监听的元素（单个或多个）
  callback: MutationCallback, // 变化时的回调函数
  options: MutationObserverInit = defaultOptions // 监听配置（有默认值）
) {
  useEffect(() => {
    if (!nodeOrList) {
      return
    }

    let instance: MutationObserver

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList]

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback)

      nodeList.forEach((element) => {
        instance.observe(element, options)
      })
    }

    return () => {
      instance?.takeRecords()
      instance?.disconnect?.()
    }
  }, [nodeOrList, options])
}
