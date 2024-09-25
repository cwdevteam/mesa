import React from 'react'
import { Icons } from '../Icons'
import { Credit } from '@/types/projectMetadataForm'
import bpsToPercent from '@/lib/bpsToPercent'

const UserMatrixCardDetails = ({
  data,
  handleActionClick,
  handleDeleteClick,
}: {
  data: Credit
  handleActionClick: Function
  handleDeleteClick: any
}) => (
  <tr className="border-b border-border-light dark:border-muted transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-black dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        {data?.contractType}
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-black dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        {data?.collaboratorType}
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-center align-middle font-medium text-black dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        {bpsToPercent(data?.splitBps)}%
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-black dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        TCA
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-center cursor-pointer flex flex-row justify-center items-center align-middle font-medium text-muted-foreground">
      <div
        className=" inline-flex justify-center items-center text-center"
        onClick={() => handleActionClick()}
      >
        <Icons.Edit />
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-center cursor-pointer align-middle font-medium text-muted-foreground">
      <div
        className=" inline-flex justify-center items-center mt-1 text-center"
        onClick={handleDeleteClick}
      >
        <Icons.delete />
      </div>
    </th>
  </tr>
)

export default UserMatrixCardDetails
