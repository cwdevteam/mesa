"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MesaProject } from "@/types/mesa"
import Link from "next/link"

export type ProjectActionsMenuProps = {
  project: MesaProject
  children: React.ReactNode
}

export function ProjectActionsMenu({
  project,
  children
}: ProjectActionsMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* TODO show edit side panel */}
        <DropdownMenuItem>Edit project</DropdownMenuItem>
        {/* TODO show invite side panel */}
        <DropdownMenuItem>Invite user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}