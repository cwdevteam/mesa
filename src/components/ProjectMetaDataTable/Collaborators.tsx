import { useProjectProvider } from "@/context/ProjectProvider"
import truncateAddress from "@/lib/truncateAddress"
import { Credit } from "@/types/projectMetadataForm"

const Collaborators = () => {
    const { credits } = useProjectProvider()

    console.log("ZIAD", credits)

    return (
        <div className="col-span-4" >
            <div className="flex flex-col w-full gap-2">
                {credits?.map((credit: Credit, index: number) => (
                    <div className="flex justify-between" key={index}>
                        
                        <div className="flex gap-2 justify-between flex-col">
                            <p className="font-roboto_medium text-base/4 text-black dark:text-white">{credit.name}</p>
                            <p className="text-base/4 text-grey dark:text-white font-roboto_medium">{truncateAddress(credit.address)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Collaborators