import WithWallet from "./WithWallet"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WithWallet>
      {children}
    </WithWallet>
  )
}
