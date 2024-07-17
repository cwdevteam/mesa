import fetchUri from "@/lib/ipfs/fetchUri";
import { useEffect, useState } from "react";

const useMetadata = (uri: string) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const response = await fetchUri(uri);
      setDescription(response.description);
    };

    init();
  }, [uri]);

  return { description };
};

export default useMetadata;
