import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '../ui/dialog'

import React, { useEffect, useState } from 'react'
import ProjectMetaDataSubmitButton from '../ProjectMetaDataSubmitButton'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/router'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { useAuth } from '@/context/AuthProvider'

enum ContractType {
  Master = 'Master',
  Songwriting = 'Songwriting',
  // Both = 'Both',
}

enum UserRole {
  Owner = 'Owner',
  Producer = 'Producer',
  Songwriter = 'Songwriter',
  Artist = 'Artist',
  Manager = 'Manager',
  Publisher = 'Publisher',
  Lawyer = 'Lawyer',
}

interface SelectOption {
  value: string
  label: string
}

const contractTypeOptions: SelectOption[] = [
  { value: ContractType.Master, label: 'Master' },
  { value: ContractType.Songwriting, label: 'Songwriting' },
  // { value: ContractType.Both, label: 'Master&Songwriter' },
]

const userRoleOptions: SelectOption[] = [
  { value: UserRole.Owner, label: 'Owner' },
  { value: UserRole.Producer, label: 'Producer' },
  { value: UserRole.Songwriter, label: 'Writer' },
  { value: UserRole.Artist, label: 'Artist' },
  { value: UserRole.Manager, label: 'Manager' },
  { value: UserRole.Publisher, label: 'Publisher' },
  { value: UserRole.Lawyer, label: 'Lawyer' },
]

interface IUserRole {
  id: string
  contract_type: string
  user_role: string
  user_bps: number
}

export default function ProjectMetaDataForm({
  project,
  selectedUser,
  request,
  roleId,
  onSubmit,
}: {
  project?: ProjectType
  selectedUser: ProjectUserProps
  request: string
  roleId?: string
  onSubmit: () => void
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<IUserRole>({
    id: '',
    contract_type: ContractType.Songwriting,
    user_role: UserRole.Artist,
    user_bps: 10000,
  })
  const { user } = useAuth()

  const [bps, setBps] = useState('')

  useEffect(() => {
    if (selectedUser) {
      selectedUser.roles.forEach((role) => {
        if (role.id === roleId) {
          setState({
            id: role.id,
            contract_type: role.contract_type,
            user_role: role.user_role,
            user_bps: role.user_bps,
          })
          setBps(String(Number(role.user_bps) / 100))
        }
      })
    }
  }, [selectedUser, roleId])

  const handleSubmit = async () => {
    if (!project) return
    try {
      if (state.user_bps > 10000 || state.user_bps < 0) {
        toast({
          title: 'Warning',
          description:
            'The entered value is out of range. Please ensure the value is between 0 and 100',
          variant: 'destructive',
        })
        return
      }

      const sum = project.projectUsers
        .filter((pU) => pU.id !== selectedUser.id)
        .reduce(
          (accumulator, pU) =>
            accumulator +
            (pU.roles.find((role) => role.contract_type === state.contract_type)
              ?.user_bps || 0),
          0
        )

      if (sum + state.user_bps > 10000) {
        toast({
          title: 'Warning',
          description: `Input Error: The value you have entered is outside the valid range. Please enter a value between 0% and ${(10000 - sum) / 100}%.`,
          variant: 'warning',
        })
        return
      }

      setLoading(true)
      const { data: result } = await axios.post(
        request === 'edit'
          ? '/api/project_user/update'
          : '/api/project_user/add',
        {
          state: state,
          projectUserId: selectedUser.id,
          projectId: selectedUser.project_id,
          currentUsername: user.username,
        }
      )

      if (result && result.status) {
        onSubmit()
        router.reload()
      }

      setLoading(false)
    } catch (err: any) {
      if (err.response?.data) {
        setLoading(false)
        toast({
          title: 'Warning',
          description: `${err.response.data}`,
          variant: 'warning',
        })
      } else {
        setLoading(false)
        toast({
          title: 'Error',
          description: 'Someting went wrong!',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="title">Contract Type</Label>
        <Select
          value={state.contract_type}
          onValueChange={(v: any) => {
            if (!v) return
            setState({
              ...state,
              contract_type: v,
            })
          }}
        >
          <SelectTrigger className="bg-card border-none">
            <div className="flex items-center gap-2">
              <SelectValue className="text-sm font-semibold">
                {
                  contractTypeOptions.find(
                    (v) => v.value === state.contract_type
                  )?.label
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {contractTypeOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {label ?? value}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="title">User Role</Label>
        <Select
          value={state.user_role}
          onValueChange={(v: any) => {
            if (!v) return
            setState({
              ...state,
              user_role: v,
            })
          }}
        >
          <SelectTrigger className="bg-card border-none">
            <div className="flex items-center gap-2">
              <SelectValue className="text-sm font-semibold">
                {
                  userRoleOptions.find((v) => v.value === state.user_role)
                    ?.label
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {userRoleOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {label ?? value}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="bps">Splits</Label>
        <Input
          id="user_bps"
          name="user_bps"
          placeholder="100.00%"
          type="number"
          autoCorrect="off"
          required
          min={0}
          max={100}
          value={bps}
          onChange={(e) => {
            setBps(e.target.value)
          }}
          onBlur={(e) => {
            setState({
              ...state,
              user_bps: Number(bps) * 100,
            })
          }}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <DialogClose>
          <Button variant="outline" color="gray">
            Close
          </Button>
        </DialogClose>
        <ProjectMetaDataSubmitButton
          handleSubmit={handleSubmit}
          loading={loading}
          request={request}
        />
      </div>
    </div>
  )
}
