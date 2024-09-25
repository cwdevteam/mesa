const Note = ({ data }: any) => {
  return (
    <tr className="border-b border-border-light transition-colors hover:bg-muted/50">
      <td className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-black dark:text-muted-foreground">
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
          {data.title}
        </div>
      </td>
      <td className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-black dark:text-muted-foreground">
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
          {data.contributor}
        </div>
      </td>
      <td className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-black dark:text-muted-foreground">
        <div className="hidden sm:block text-center">{data.description}</div>
      </td>
    </tr>
  )
}

export default Note
