import { Project } from '@/types/project'
import { useState } from 'react'
import { Input } from '@/components/Input'
import {TimeEntry} from "@/types/timeEntry";
import {ProjectSelector} from "@/components/ProjectSelector";

type Props = {
  initialValues: TimeEntry
  onSave: (timeEntry: TimeEntry) => void
  onCancel: () => void
}

export const TimeForm = ({initialValues, onSave}: Props) => {
  const [timeEntry, setTimeEntry] = useState(initialValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setTimeEntry({ ...timeEntry, [name]: value})
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(timeEntry)
  }

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    setTimeEntry({ ...timeEntry, [name]: value})
}

  return (
    <form onSubmit={handleSave}>
      <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange} />
      <Input label="Start" name="start" value={timeEntry.start} onChange={handleChange} type="datetime-local" />
      <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local" />
      <ProjectSelector name="project_id" value={timeEntry.project_id} handleChange={handleSelectChange} />
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </form>
  )

}