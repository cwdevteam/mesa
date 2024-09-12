import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useProfileProvider } from '@/context/ProfileProvider'
import { UserDetailsProps } from '@/types/const'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import updateUser from '@/lib/supabase/user/updateUser'
import { useRouter } from 'next/navigation'
import { useUserProvider } from '@/context/UserProvider'

const EditingButtons = () => {
  const { user, setUser, setEditing } = useProfileProvider()
  const { user: initialUser, fetchUser } = useUserProvider()
  const { address } = useAccount()
  const [loading, setLoading] = useState<boolean>(false)
  const { push } = useRouter()

  const onCancel = () => {
    setEditing(false)
    setUser(initialUser)
  }

  const onSave = async () => {
    setLoading(true)
    try {
      const updatedUserData: UserDetailsProps = {
        ...user!,
        addresses: [address as Address],
      }
      const response = await updateUser(updatedUserData)
      setUser(response)
      await fetchUser()
      push('/')
      setEditing(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant={'outline'} onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
      <Button onClick={onSave}>
        {loading && <ReloadIcon className="animate-spin" />}
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  )
}

export default EditingButtons
