import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

function SwitchComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Switch className="data-[state=unchecked]:bg-red-400" id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

export default SwitchComponent