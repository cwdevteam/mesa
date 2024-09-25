const NotesTableHead = () => (
  <tr className="border-b border-border-light dark:border-muted transition-colors hover:bg-muted/50">
    <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-border/100 dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        Title
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-border/100 dark:text-muted-foreground">
      <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
        Contributor
      </div>
    </th>
    <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-border/100 dark:text-muted-foreground">
      <div className="hidden sm:block text-center">Description</div>
    </th>
  </tr>
)

export default NotesTableHead
