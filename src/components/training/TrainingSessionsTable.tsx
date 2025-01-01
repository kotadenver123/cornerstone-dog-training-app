import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainingSessionDialog } from "./TrainingSessionDialog";

type TrainingSession = {
  id: string;
  date: string;
  description: string;
  videoUrl: string;
  feedback?: string;
  trainerVideo?: string;
};

export const TrainingSessionsTable = ({
  sessions,
}: {
  sessions: TrainingSession[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Training Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Trainer Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TrainingSessionDialog key={session.id} session={session} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};