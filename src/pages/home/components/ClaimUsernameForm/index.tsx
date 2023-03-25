import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './styles'

const claimUserNameFormSchema = z.object({
  username: z.string(),
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUserNameFormData>()

  async function handlerClaimUsername(data: ClaimUserNameFormData) {}

  return (
    <Form as="form" onSubmit={handleSubmit(handlerClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="your-user"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Schedule
        <ArrowRight />
      </Button>
    </Form>
  )
}
