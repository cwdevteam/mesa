'use client'

import { useState } from 'react'
import { UserMatrixCardProps } from '@/types/const'
import ProjectMetaDataDialog from './ProjectMetaDataDialog'
import UserMatrixCardDetails from './UserMatrixCardDetails'
import { useProjectProvider } from '@/context/ProjectProvider'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'

const UserMatrixCard: React.FC<UserMatrixCardProps> = ({
  data,
  creditIndex,
}) => {
  const [editModal, setEditModal] = useState<boolean>(false)
  const [requestType, setRequestType] = useState<string>('')
  const [roleId, setRoleId] = useState<string>('')
  const { setCredits, credits, setUpdating } = useProjectProvider()
  const { attest } = usePaymasterAttest()

  const handleActionClick = (roleId: string, request: string) => {
    setRequestType(request)
    setRoleId(roleId)
    setEditModal(true)
  }

  const handleDeleteClick = async () => {
    const newCredits = credits
    newCredits.splice(creditIndex, 1)
    setCredits([...newCredits])
    setUpdating(true)
    await attest()
  }

  return (
    <>
      <UserMatrixCardDetails
        handleActionClick={handleActionClick}
        handleDeleteClick={handleDeleteClick}
        data={data}
      />
      <ProjectMetaDataDialog
        open={editModal}
        setOpen={setEditModal}
        request={requestType}
        roleId={roleId}
        project={data}
        creditIndex={creditIndex}
      />
    </>
  )
}

export default UserMatrixCard
