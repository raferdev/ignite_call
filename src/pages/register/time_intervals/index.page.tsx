import { getWeekDays } from '@/utils/get_week_day'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInput,
  IntervalItem,
} from './styles'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })
  const weekdays = getWeekDays()
  async function handleSetTimeIntervals() {}
  return (
    <Container>
      <Header>
        <Heading as="strong">Almost There</Heading>
        <Text>
          Define the range of times you have free each day of the week.
        </Text>
        <MultiStep size={4} currentStep={3} />
        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalContainer>
            {fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Checkbox />
                    <Text>{weekdays[field.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInput>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInput>
                </IntervalItem>
              )
            })}
          </IntervalContainer>
          <Button type="submit">Next Step</Button>
        </IntervalBox>
      </Header>
    </Container>
  )
}
