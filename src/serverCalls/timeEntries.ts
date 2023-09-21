import {generateUrl} from '@/helpers/generate_url'
import { TimeEntry } from '@/types/timeEntry'

export const getAllTEs = async () => {
  return await fetch(generateUrl('/time-entries'), {
    cache: "no-store",
  })
}

export const createTE = async (timeEntry: TimeEntry) => {
  return await fetch(generateUrl('/time-entries'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}

export const updateTimeEntry = async (timeEntry: TimeEntry) => {
  return await fetch(generateUrl('/time-entries'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}

export const deleteTimeEntry = async (id: number, user_name: string) => {
  return await fetch(generateUrl('/time-entries'), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({"id": id, "user_name": user_name})
  })
}
