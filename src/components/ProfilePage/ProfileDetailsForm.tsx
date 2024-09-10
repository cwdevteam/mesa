import LegalNameInput from './LegalNameInput'
import ArtistNameInput from './ArtistNameInput'
import EmailInput from './EmailInput'

const ProfileDetailsForm = () => (
  <div className="p-5 flex flex-col gap-3">
    <LegalNameInput />
    <div className="flex items-center justify-center gap-5">
      <ArtistNameInput />
      <EmailInput />
    </div>
  </div>
)

export default ProfileDetailsForm
