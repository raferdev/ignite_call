import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router.js'

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username need at least 3 letters' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Only letters and hyphen are accepted',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormSchema),
  })
  const router = useRouter()

  async function handlerClaimUsername(data: ClaimUserNameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlerClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="your-user"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Schedule
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : 'Type your username.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
