import { useProfileProvider } from '@/context/ProfileProvider'
import { Input } from '../ui/input'

const LegalNameInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider()

  return (
    <div>
      <label htmlFor="user_name" className="text-sm">
        Legal Name
      </label>
      <Input
        id="legal_name"
        name="legal_name"
        value={user?.legal_name || ''}
        disabled={!editing}
        onChange={(e: any) => handleInputChange('legal_name', e.target.value)}
      />
    </div>
  )
}

export default LegalNameInput
