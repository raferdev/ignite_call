import { useState } from 'react'
import { CalendarStep } from './CalendarStep/index.jsx'
import { ConfirmStep } from './ConfirmStep/index.jsx'

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        onCancelConfirmation={handleClearSelectedDateTime}
        schedulingDate={selectedDateTime}
      />
    )
  }
  return <CalendarStep onSelectedDateTime={setSelectedDateTime} />
}
