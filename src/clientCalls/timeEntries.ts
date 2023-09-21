import {generateLocalUrl, generateUrl} from '@/helpers/generate_url'
import { TimeEntry } from '@/types/timeEntry'

export const createTE = async (timeEntry: TimeEntry) => {
  return await fetch(generateLocalUrl('/time-entries'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}

export const updateTimeEntry = async (timeEntry: TimeEntry) => {
  return await fetch(generateLocalUrl('/time-entries'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}

export const deleteTimeEntry = async (id: number, user_name: string) => {
  console.log(id)
  console.log(user_name)
  return await fetch(generateLocalUrl('/time-entries'), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({"id": id, "user_name": user_name})
  })
}