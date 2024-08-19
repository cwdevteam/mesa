import { useParams } from 'next/navigation'
import { OnchainDistributionProtocol, ProjectIDType } from '@/types/const'
import TokenForm from './TokenForm'
import StepCard from '../Pages/ZoraPage/StepCard'
import OnchainDistributionProvider from '@/context/OnchainDistributionProvider'

const DistributionOnchain = ({
  protocol,
}: {
  protocol: OnchainDistributionProtocol
}) => {
  const { id } = useParams<ProjectIDType>()
  const isMissing = !id

  return (
    <OnchainDistributionProvider protocol={protocol}>
      <section className="flex flex-col gap-2 max-w-screen-md">
        <h2 className="cursor-pointer text-2xl font-bold">
          Publish on {protocol}
        </h2>

        <StepCard className="w-full p-6">
          <>
            {isMissing && (
              <div className="flex items-center flex-1">
                <p className="text-muted-foreground">
                  Missing &ldquo;tokenKey&rdquo; parameter. Please check the URL
                  and try again.
                </p>
              </div>
            )}
            <TokenForm />
          </>
        </StepCard>
      </section>
    </OnchainDistributionProvider>
  )
}

export default DistributionOnchain
