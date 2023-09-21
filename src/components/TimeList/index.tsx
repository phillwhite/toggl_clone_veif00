import {TimeEntry} from "@/types/timeEntry";

type Props = {
  timeEntries: TimeEntry[]
  onSelect: (id: number) => () => void
  onDelete: (id: number, user_name: string) => () => void
}

export const TimeList = ({ timeEntries, onSelect, onDelete }: Props) => {
return (
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
      <tr>
        <th>ID</th>
        <th>Task</th>
        <th>Project</th>
        <th>Start</th>
        <th>End</th>
      </tr>
      </thead>
      <tbody>{
        timeEntries.map((timeEntry) => (
          <tr key={timeEntry.id}>
            <th>{timeEntry.id}</th>
            <th>{timeEntry.task}</th>
            <td>{timeEntry.project_name}</td>
            <td>{timeEntry.start}</td>
            <td>{timeEntry.end}</td>
            <th>
              <button className="btn btn-neutral btn-sm mr-4"
              onClick={onSelect(timeEntry.id!)}
              >edit</button>
              <button className="btn btn-error btn-sm mr-4"
                      onClick={onDelete(timeEntry.id!, process.env.NEXT_PUBLIC_USERNAME)}
              >delete</button>
            </th>
          </tr>
          )
        )
      }</tbody>
    </table>
  </div>
      )
}