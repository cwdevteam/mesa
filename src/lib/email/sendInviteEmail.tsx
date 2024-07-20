import { Address } from "viem";

const sendInviteEmail = async (
  email: string,
  name: string,
  message: string,
  referenceAttestation: Address
) => {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, message, referenceAttestation }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
};

export default sendInviteEmail;
