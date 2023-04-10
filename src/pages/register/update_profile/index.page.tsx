import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { useSession } from 'next-auth/react/index'
import { GetServerSideProps } from 'next'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { getServerSession } from 'next-auth/next/index'
import { api } from '@/lib/axios.js'
import { useRouter } from 'next/router.js'
import { NextSeo } from 'next-seo'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/update_profile', {
      bio: data.bio,
    })
    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Wellcome to Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Wellcome to Ignite Call</Heading>
          <Text>
            We need some informations to build your profile, you can edit this
            details later.
          </Text>
          <Avatar src={session.data?.user.avatar_url} />
          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Profile image</Text>
          </label>
          <label>
            <Text size="sm">About you</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size="sm">
              Tell me something about you, this gonna be shown on your profile.
            </FormAnnotation>
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Finish
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
