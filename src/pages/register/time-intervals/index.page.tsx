import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInput,
  IntervalItem,
} from './styles'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Almost There</Heading>
        <Text>
          Define the range of times you have free each day of the week.
        </Text>
        <MultiStep size={4} currentStep={3} />
        <IntervalBox as="form">
          <IntervalContainer>
            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Sunday</Text>
              </IntervalDay>
              <IntervalInput>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInput>
            </IntervalItem>
            <IntervalItem>
              <IntervalDay>
                <Checkbox />
                <Text>Tuesday</Text>
              </IntervalDay>
              <IntervalInput>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInput>
            </IntervalItem>
          </IntervalContainer>
          <Button type="submit">Next Step</Button>
        </IntervalBox>
      </Header>
    </Container>
  )
}
