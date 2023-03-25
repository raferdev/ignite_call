import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { Container, Form, Header } from './styles'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Wellcome to Ignite Call</Heading>
        <Text>
          We need some informations to build your profile, you can edit this
          details later.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form">
        <label>
          <Text size="sm">Username</Text>
          <TextInput prefix="ignite.com/" placeholder="your-user" />
        </label>
        <label>
          <Text size="sm">Your name</Text>
          <TextInput placeholder="Your name" />
        </label>
        <Button type="submit">
          Next Step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
