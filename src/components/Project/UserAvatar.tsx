import { useEffect, useState } from "react";

export type UserAvatarProps = {
  user: UserProps;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-12 w-12 rounded-full">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-11 w-11">
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {!user?.avatar ? (
            <img src="/default-avatar.png" alt="" />
          ) : (
            <img src={user.avatar} alt="avatar" />
          )}
        </span>
      </span>
    </button>
  );
};
export default UserAvatar;
