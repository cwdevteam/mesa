const useClipboard = () => {
  const setClipboard = (text: string) => {
    navigator.clipboard.writeText(text as string);
  };

  return {
    setClipboard
  };
};

export default useClipboard;
