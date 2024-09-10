import { useProfileProvider } from '@/context/ProfileProvider'
import { Input } from '../ui/input'

const ArtistNameInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider()

  return (
    <div className="flex-1">
      <label htmlFor="artistname" className="text-sm">
        Artist Name
      </label>
      <Input
        id="artistname"
        name="artistname"
        value={user?.artistname || ''}
        disabled={!editing}
        onChange={(e) => handleInputChange('artistname', e.target.value)}
      />
    </div>
  )
}

export default ArtistNameInput
