import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  title: string;
  content: string;
}

export default function InstructionModal({
  isOpen,
  onClose,
  onStart,
  title,
  content
}: InstructionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-olive-green">{title} Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{content}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-olive-green hover:bg-olive-green/90 text-white"
            onClick={onStart}
          >
            Start Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
