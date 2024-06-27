"use client";

import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import ProfileProvider from "@/context/ProfileProvider";

const ProfilePage = () => (
  <ProfileProvider>
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>
        <ProfileAvatar />
        <ProfileDetails />
      </div>
    </main>
  </ProfileProvider>
);

export default ProfilePage;
