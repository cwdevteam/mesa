import { useState } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return {
    isCopied,
    copyToClipboard
  };
};

export default useClipboard;
