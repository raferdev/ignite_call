import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'The name need at least 3 letters.' }),
  email: z.string().email({ message: 'The email need be a valid email.' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({})
  const describedDate = dayjs(schedulingDate).format('DD[ of ]MMMM[ of ]YYYY')
  const describedHour = dayjs(schedulingDate).format('HH:mm[h]')

  function handleConfirmScheduling(data: ConfirmFormData) {}
  return (
    <ConfirmForm onSubmit={handleSubmit(handleConfirmScheduling)} as="form">
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Set 2023
        </Text>
        <Text>
          <Clock />
          18:00 h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your name" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Full name</Text>
        <TextInput
          type="email"
          placeholder="johndoe@exemple.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observations</Text>
        <TextArea {...register('observations')} />
      </label>
      <FormActions>
        <Button onClick={onCancelConfirmation} type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
