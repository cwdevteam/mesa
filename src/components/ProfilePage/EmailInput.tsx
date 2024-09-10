import { useProfileProvider } from '@/context/ProfileProvider'
import { Input } from '../ui/input'

const EmailInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider()

  return (
    <div className="flex-1">
      <label htmlFor="user_email" className="text-sm">
        Email
      </label>
      <Input
        id="user_email"
        name="email"
        value={user?.email || ''}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={!editing}
      />
    </div>
  )
}

export default EmailInput
