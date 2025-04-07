import { useState, useEffect } from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";

interface ParticipantsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  participantNames: string[];
  onSave: (names: string[]) => void;
}

export function ParticipantsDrawer({
  isOpen,
  onOpenChange,
  participantNames,
  onSave,
}: ParticipantsDrawerProps) {
  const [namesText, setNamesText] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setNamesText(participantNames.join(", "));
    }
  }, [isOpen, participantNames]);

  const handleSave = () => {
    // Split by comma, trim whitespace, and filter out empty entries
    const newNames = namesText
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    onSave(newNames);
    onOpenChange(false);
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#0e0e10] flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-[#0e0e10] rounded-t-[10px] flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Edit Participants
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="bg-transparent w-10 h-10 rounded-full hover:bg-gray-700 text-white p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <X className="h-4 w-4" color="white" />
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">
                Enter participants names separated by commas
              </p>
              <textarea
                value={namesText}
                onChange={(e) => setNamesText(e.target.value)}
                className="w-full h-[300px] rounded-md bg-white/5 border border-white/10 p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#0b3eea]"
                placeholder="Enter names separated by commas..."
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-[#0b3eea] hover:bg-[#2351ec] text-white gap-2 transition-all duration-300 ease-in-out"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 