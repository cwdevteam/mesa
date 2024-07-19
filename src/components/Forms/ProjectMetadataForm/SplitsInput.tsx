import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useProjectProvider } from "@/context/ProjectProvider";
import { Credit } from "@/types/projectMetadataForm";
import bpsToPercent from "@/lib/bpsToPercent";
import percentToBps from "@/lib/percentToBps";

const SplitsInput = () => {
  const { credits, setCredits } = useProjectProvider();
  const splitBps = credits[0].splitBps;
  const [splitPercent, setSplitPercent] = useState(bpsToPercent(splitBps));

  useEffect(() => {
    setSplitPercent(bpsToPercent(splitBps));
  }, [splitBps]);

  const handleChange = (e: any) => {
    const newPercent = e.target.value;
    setSplitPercent(newPercent);
  };

  const handleBlur = () => {
    const credit = {
      ...credits[0],
      splitBps: percentToBps(splitPercent),
    } as Credit;
    setCredits([credit]);
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="bps">Splits</Label>
      <Input
        id="user_bps"
        name="user_bps"
        placeholder="100%"
        type="number"
        autoCorrect="off"
        required
        min={0}
        max={100}
        onChange={handleChange}
        onBlur={handleBlur}
        value={splitPercent}
      />
    </div>
  );
};

export default SplitsInput;
