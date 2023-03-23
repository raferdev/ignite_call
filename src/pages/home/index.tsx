import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/calendar.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm/index'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Uncomplicated Scheduling</Heading>
        <Text size="lg">
          Connect your calendar and let people book appointments in their free
          time.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendar with the same view of the user when are using this scheduler app."
        />
      </Preview>
    </Container>
  )
}
