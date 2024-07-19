const sendInviteEmail = async (
  email: string,
  name: string,
  message: string
) => {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
};

export default sendInviteEmail;
