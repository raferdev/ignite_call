import { getWeekDays } from '@/utils/get_week_day'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'
import {
  FormError,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInput,
  IntervalItem,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '@/utils/convert_time_to_min.js'
import { api } from '@/lib/axios.js'
import { useRouter } from 'next/router.js'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'You need enable 1 day at least.',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.startTimeInMinutes - 60 >= interval.endTimeInMinutes,
        )
      },
      {
        message: 'The period need to be bigger or equal to start time.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const intervals = watch('intervals')

  const router = useRouter()
  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput
    await api.post('/users/time_intervals', {
      intervals,
    })

    await router.push('/register/update_profile')
  }

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
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            checked={field.value}
                          />
                        )
                      }}
                    />
                    <Text>{weekdays[field.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInput>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[index].enabled === false}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInput>
                </IntervalItem>
              )
            })}
          </IntervalContainer>
          {errors.intervals && (
            <FormError size="sm">{errors.intervals.message}</FormError>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Next Step
          </Button>
        </IntervalBox>
      </Header>
    </Container>
  )
}
