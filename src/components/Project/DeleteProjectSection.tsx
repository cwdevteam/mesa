import { Button } from "../ui/button";

const DeleteProjectSection = () => (
  <div className="flex flex-col justify-center gap-5 py-10">
    <div className="text-2xl font-bold tracking-tight">Danger Zone</div>
    <div className="border border-red-400 flex flex-col justify-center rounded-lg">
      <div className="flex items-center justify-between p-5 flex-wrap">
        <div>
          <h6 className="text-sm font-semibold">Delete this project</h6>
          <p className="text-sm">
            Once you delete a project, there is no going back, Please be
            certain.
          </p>
        </div>

        <Button
          className="text-red-500 hover:bg-red-500 hover:text-white"
          variant={"default"}
        >
          Delete this project
        </Button>
      </div>
    </div>
  </div>
);

export default DeleteProjectSection;
