import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { handleProjectForm } from "@/lib/mesa/server";

import { MesaProject } from "@/types/mesa";
import { revalidatePath } from "next/cache";
import { ProjectSubmitButton } from "../ProjectSubmitButton";
import { User } from "@supabase/supabase-js";

export function EditProjectSheet({
  user,
  project,
  children
}: {
  user: User,
  project: MesaProject,
  children: React.ReactNode
}) {
  async function updateProject(formData: FormData) {
    'use server'
    
    await handleProjectForm(formData)

    revalidatePath(`/[lang]/project/${project.id}`)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Make changes to your project here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form action={handleProjectForm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectTitle" className="text-right">
                Project Title
              </Label>
              <Input id="projectTitle" value={project.title} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="projectDescription" className="text-right">
                Project Description
              </Label>
              <textarea id="projectDescription" className="col-span-3">{project.description}</textarea>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {/* <ProjectSubmitButton user={user} eventData={eventData}>

              </ProjectSubmitButton> */}
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
