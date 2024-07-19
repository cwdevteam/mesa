import * as React from "react";

interface InviteEmailProps {
  name: string;
  message?: string;
}

export const InviteEmail: React.FC<Readonly<InviteEmailProps>> = ({
  name,
  message = "",
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <h3>You&apos;ve been invited to join a Mesa project.</h3>
    <h3>Message: {message}</h3>
  </div>
);
