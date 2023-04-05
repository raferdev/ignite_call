import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { ConfirmForm, FormActions, FormHeader } from './styles.js'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'

export function ConfirmStep() {
  function handleConfirmScheduling() {}
  return (
    <ConfirmForm onSubmit={handleConfirmScheduling} as="form">
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
        <TextInput placeholder="Your name" />
      </label>
      <label>
        <Text size="sm">Full name</Text>
        <TextInput type="email" placeholder="johndoe@exemple.com" />
      </label>
      <label>
        <Text size="sm">Obs</Text>
        <TextArea />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancel
        </Button>
        <Button type="submit">Confirm</Button>
      </FormActions>
    </ConfirmForm>
  )
}
