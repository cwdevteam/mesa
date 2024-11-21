import UserMatrixCard from './UserMatrixCard'
import { useProjectProvider } from '@/context/ProjectProvider'
import { Credit } from '@/types/projectMetadataForm'
import CollaboratorsTableHead from './CollaboratorsTableHead'
import DownloadPDFButton from './DownloadPDFButton'

const Contracts = () => {
  const { credits } = useProjectProvider()

  return (
    <section className="w-full col-span-6 mt-4">
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        <div className="w-full grid grid-cols-1 gap-4 border-border-light dark:border-muted rounded-lg border-[1px] p-4 max-h-[300px]">
          <div className="w-full flex justify-between items-center px-2">
            <p className="text-base/4 text-black dark:text-white font-roboto_bold">
              Contracts
            </p>
            <button className="border-border border-[1px] rounded-lg size-8 font-roboto_bold text-base/4 text-black dark:text-white">
              +
            </button>
          </div>
          <div className="w-full rounded-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full caption-bottom text-sm">
                <CollaboratorsTableHead />
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {credits.map((collaborator: Credit, index: number) => (
                    <UserMatrixCard
                      key={index}
                      data={collaborator}
                      creditIndex={index}
                    />
                  ))}
                </tbody>
              </table>
              <DownloadPDFButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contracts
