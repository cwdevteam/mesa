export const signInWithWallet = async (address: string, signature: string) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, signature }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.user;
};
