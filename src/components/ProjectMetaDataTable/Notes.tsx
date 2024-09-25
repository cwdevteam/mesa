import Note from './Note'
import NotesTableHead from './NotesTableHead'

const Notes = () => {
  const notes = [
    { title: 'V3', contributor: 'TCA', description: 'Description...' },
  ]
  return (
    <section className="w-full col-span-4 mt-4">
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        <div className="w-full grid grid-cols-1 gap-4 border-border-light dark:border-muted rounded-lg border-[1px] p-4">
          <div className="w-full flex justify-between items-center px-2">
            <p className="text-base/4 text-black dark:text-white font-roboto_bold">
              Notes
            </p>
            <button className="border-border border-[1px] rounded-lg size-8 font-roboto_bold text-base/4 text-black dark:text-white">
              +
            </button>
          </div>
          <div className="w-full rounded-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full caption-bottom text-sm">
                <thead className="[&amp;_tr]:border-b">
                  <NotesTableHead />
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {notes.map((note) => (
                    <Note data={note} key={note.title} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Notes
