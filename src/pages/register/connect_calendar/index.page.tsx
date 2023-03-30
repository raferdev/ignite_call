import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  /*   async function handleRegister(data: RegisterFormData) {}
   */
  return (
    <Container>
      <Header>
        <Heading as="strong">Connect with your calendar</Heading>
        <Text>
          Connect with your calendar to control automatically the busy hours and
          the new events during you are scheduling it.
        </Text>
        <MultiStep size={4} currentStep={2} />

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            <Button variant="secondary" size="sm">
              Connect
              <ArrowRight />
            </Button>
          </ConnectItem>
          <Button type="submit">
            Next Step
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Header>
    </Container>
  )
}
