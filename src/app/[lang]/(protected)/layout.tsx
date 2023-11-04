// import { ConnectionStatus } from "@/components/ConnectionStatus"
import WithWallet from "./WithWallet"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WithWallet>
      {children}
      {/* <ConnectionStatus /> */}
    </WithWallet>
  )
}
