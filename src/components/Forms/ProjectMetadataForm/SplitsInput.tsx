import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SplitsInput = () => (
  <div className="grid gap-3">
    <Label htmlFor="bps">Splits</Label>
    <Input
      id="user_bps"
      name="user_bps"
      placeholder="100.00%"
      type="number"
      autoCorrect="off"
      required
      min={0}
      max={100}
      value={10000}
    />
  </div>
);

export default SplitsInput;
