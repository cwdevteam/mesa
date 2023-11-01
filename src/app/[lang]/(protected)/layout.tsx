import { ConnectionStatus } from "@/components/ConnectionStatus"
import WithWallet from "./WithWallet"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WithWallet>
      <div className="grid gap-8 place-content-center">
        {children}
        <ConnectionStatus /> {/* TODO */}
      </div>
    </WithWallet>
  )
}
