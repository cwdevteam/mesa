export const getEmailOptions = (to: string, emailHtml: string) => {
  return {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: to,
    subject: "Invite",
    html: emailHtml,
  };
};
