import { useProjectProvider } from '@/context/ProjectProvider'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import { useMemo, useState } from 'react'
import { parseEther } from 'viem'

const useZoraSaleStrategy = () => {
  const { name, ethPrice } = useProjectProvider()
  const [zoraSaleStrategy, setZoraSaleStrategy] = useState<string>('fixedPrice')
  const isFixedPrice = zoraSaleStrategy === 'fixedPrice'
  const isTimed = zoraSaleStrategy === 'timed'
  const salesConfig = useMemo(
    () =>
      getSalesConfig({
        saleStrategy: zoraSaleStrategy,
        erc20Name: name,
        pricePerToken: parseEther(ethPrice.toString()),
      }),
    [ethPrice, name, zoraSaleStrategy]
  )

  return {
    isFixedPrice,
    isTimed,
    salesConfig,
    zoraSaleStrategy,
    setZoraSaleStrategy,
  }
}

export default useZoraSaleStrategy
