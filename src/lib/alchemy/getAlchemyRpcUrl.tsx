import getAlchemyBaseUrl from './getAlchemyBaseUrl'

const getAlchemyRpcUrl = (chainId: number) =>
  `${getAlchemyBaseUrl(chainId)}v2/${process.env.ALCHEMY_KEY}`

export default getAlchemyRpcUrl
