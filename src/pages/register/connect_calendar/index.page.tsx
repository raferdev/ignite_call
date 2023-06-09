import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const session = useSession()

  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignIn = session.status === 'authenticated'
  async function handleConnectCalendar() {
    await signIn('google')
  }
  async function handleNavigateToNextStep() {
    await router.push('/register/time_intervals')
  }

  return (
    <>
      <NextSeo title="Connect with your calendar" noindex />
      <Container>
        <Header>
          <Heading as="strong">Connect with your calendar</Heading>
          <Text>
            Connect with your calendar to control automatically the busy hours
            and the new events during you are scheduling it.
          </Text>
          <MultiStep size={4} currentStep={2} />

          <ConnectBox>
            <ConnectItem>
              <Text>Google Calendar</Text>
              {isSignIn ? (
                <Button size="sm" disabled>
                  Connected
                  <Check />
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleConnectCalendar}
                >
                  Connect
                  <ArrowRight />
                </Button>
              )}
            </ConnectItem>
            {hasAuthError && (
              <AuthError size="sm">
                Failed on connect with google, please verify if you have enabled
                the needed permissions.
              </AuthError>
            )}
            <Button
              onClick={handleNavigateToNextStep}
              type="submit"
              disabled={!isSignIn}
            >
              Next Step
              <ArrowRight />
            </Button>
          </ConnectBox>
        </Header>
      </Container>
    </>
  )
}
