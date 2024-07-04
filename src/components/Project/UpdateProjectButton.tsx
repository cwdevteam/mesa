import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { use, useState } from "react";

const UpdateProjectButton = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="w-full flex justify-center items-center"
    >
      {loading && (
        <ReloadIcon
          color="currentColor"
          className="h-4 w-4 animate-spin mr-2"
        />
      )}
      {loading ? "Updating..." : "Update"}
    </Button>
  );
};

export default UpdateProjectButton;
