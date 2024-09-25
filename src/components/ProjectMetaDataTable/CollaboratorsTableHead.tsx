const CollaboratorsTableHead = () => {
  return (
    <thead className="[&amp;_tr]:border-b">
      <tr className="border-b border-border-light dark:border-muted transition-colors hover:bg-muted/50">
        <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
            Type
          </div>
        </th>
        <th className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
            Role
          </div>
        </th>
        <th className="h-10 px-2 sm:px-0 text-center align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
            Splits
          </div>
        </th>
        <th className="h-10 px-2 sm:px-0 text-right align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
            Contributor
          </div>
        </th>
        <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className="hidden sm:block text-center">Edit</div>
        </th>
        <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-border/100 dark:text-muted-foreground">
          <div className=" hidden sm:block text-center">Delete</div>
        </th>
      </tr>
    </thead>
  )
}

export default CollaboratorsTableHead
