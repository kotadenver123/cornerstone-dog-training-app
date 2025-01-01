import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Video } from "lucide-react";

type TrainingSession = {
  id: string;
  date: string;
  description: string;
  videoUrl: string;
  feedback?: string;
  trainerVideo?: string;
};

export const TrainingSessionDialog = ({ session }: { session: TrainingSession }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-muted/50">
          <TableCell>{session.date}</TableCell>
          <TableCell>{session.description}</TableCell>
          <TableCell>
            {session.feedback || (
              <span className="text-gray-500 italic">Pending review</span>
            )}
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Training Session Details - {session.date}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Your Training Video</h4>
            {session.videoUrl !== "#" ? (
              <video
                src={session.videoUrl}
                controls
                className="w-full rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{session.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Trainer Feedback</h4>
            {session.feedback ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">{session.feedback}</p>
                {session.trainerVideo && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Trainer's Video Response</h4>
                    <video
                      src={session.trainerVideo}
                      controls
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Pending review from trainer
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};