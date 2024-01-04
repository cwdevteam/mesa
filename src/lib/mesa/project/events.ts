import { MesaProjectCreateEvent } from "@/types/mesa"
import { User } from "@supabase/supabase-js"

export function createMesaProjectCreateEvent({
  user
}: {
  user: User
}): MesaProjectCreateEvent {
  return {
    type: 'mesa.project.create',
    user_id: user.id,
    project_id: self.crypto.randomUUID()
  }
}