import UsernameInput from "./UsernameInput";
import NameInput from "./NameInput";
import WebsiteInput from "./WebsiteInput";

const ProfileDetailsForm = () => (
  <div className="p-5 flex flex-col gap-3">
    <UsernameInput />
    <div className="flex items-center justify-center gap-5">
      <NameInput />
      <WebsiteInput />
    </div>
  </div>
);

export default ProfileDetailsForm;
