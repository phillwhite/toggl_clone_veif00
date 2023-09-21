'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Input } from '@/components/Input'
import { formatDate } from '@/helpers/formatDate'
import {createTE, deleteTimeEntry, updateTimeEntry} from '@/clientCalls/timeEntries'
import { ProjectSelector } from '@/components/ProjectSelector'
import {ProjectList} from "@/components/ProjectList";
import {TimeList} from "@/components/TimeList";
import {Project} from "@/types/project";
import {ProjectForm} from "@/components/ProjectForm";
import {Dialog} from "@/components/Dialog";
import {createProject, updateProject} from "@/clientCalls/projects";
import {TimeForm} from "@/components/TimeForm";

const initValue: TimeEntry = {
  end: '',
  start: '',
  task: '',
  project_id: 4,
  user_name: process.env.NEXT_PUBLIC_USERNAME!
}

type Props = {
  timeEntries: TimeEntry[]
}

export const Times = ({ timeEntries }: Props) => {
  const router = useRouter()
  const [timeEntry, setTimeEntry] = useState<TimeEntry>(initValue)
  const [editingTimeEntry, setEditingTimeEntry] = useState<TimeEntry | undefined>(undefined)

  const selectTimeEntry= (id: number) => () => {
    setEditingTimeEntry(timeEntries.find((t) => t.id === id))
  }

    const deleteTime= (id: number, user_name: string) => async () => {
        const res = await deleteTimeEntry(id, user_name)
        if (res.ok || res.status === 500) {
            router.refresh()
        }
    }

  useEffect(() => {
    if (timeEntry.start && timeEntry.end && timeEntry.task) {
      createTE(timeEntry)
        .then(() => {
          setTimeEntry(initValue)
          router.refresh()
        })
    }
  }, [router, timeEntry])

  const saveTimeEntry = async (timeEntry: TimeEntry) => {
    /*
    if (timeEntry.id === undefined) {
      const res = await createProject(project)
      if (res.ok) {
        router.refresh()
        setEditingProject(undefined)
      }
    } else {
     */
      timeEntry.user_name = process.env.NEXT_PUBLIC_USERNAME
      const res = await updateTimeEntry(timeEntry)
      if (res.ok) {
        router.refresh()
        setEditingTimeEntry(undefined)
      }
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setTimeEntry({ ...timeEntry, [name]: value})
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    setTimeEntry({ ...timeEntry, [name]: value})
  }

  return (
      <>
        <form className="flex flex-wrap items-end">
          <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange} />
          <Input label="Start" name="start" value={timeEntry.start} onChange={handleChange} type="datetime-local" />
          <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local" />
          <ProjectSelector name="project_id" value={timeEntry.project_id} handleChange={handleSelectChange} />
          {timeEntry.start && (
              <button
                  className="btn btn-neutral"
                  disabled={timeEntry.end !== ''}
                  onClick={() => {setTimeEntry({...timeEntry, end: formatDate(new Date())})}}
              >Stop</button>
          )}
          {!timeEntry.start && (
              <button
                  className="btn btn-neutral"
                  onClick={() => {setTimeEntry({...timeEntry, start: formatDate(new Date())})}}
              >Start</button>
          )}
        </form>
        <Dialog open={editingTimeEntry !==undefined} close={() => setEditingTimeEntry(undefined)}>
          {editingTimeEntry !== undefined && <TimeForm initialValues={editingTimeEntry} onSave={saveTimeEntry} onCancel={() => setEditingTimeEntry(undefined)}/>}
        </Dialog>
        <TimeList timeEntries={timeEntries} onSelect={selectTimeEntry} onDelete={deleteTime}/>
      </>
  )
}