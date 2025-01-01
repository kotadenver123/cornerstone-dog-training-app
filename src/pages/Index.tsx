import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Video, Send } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data type for training sessions
type TrainingSession = {
  id: string;
  date: string;
  description: string;
  videoUrl: string;
  feedback?: string;
};

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  // Mock data for training sessions
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    {
      id: "1",
      date: "2024-02-20",
      description: "Working on basic sit and stay commands",
      videoUrl: "#",
      feedback: "Great progress! Try holding the stay command for longer periods."
    },
    {
      id: "2",
      date: "2024-02-19",
      description: "Leash training practice",
      videoUrl: "#"
    }
  ]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a video under 100MB",
          variant: "destructive",
        });
        return;
      }
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        });
        return;
      }
      setSelectedVideo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo) {
      toast({
        title: "No video selected",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }

    // Add new training session to the list (in a real app, this would be handled by the backend)
    const newSession: TrainingSession = {
      id: (trainingSessions.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      description,
      videoUrl: "#",
    };

    setTrainingSessions([newSession, ...trainingSessions]);

    toast({
      title: "Success!",
      description: "Your training session has been submitted for review",
    });
    setSelectedVideo(null);
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Cornerstone Dog Training</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="video-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Training Video
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Video className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, MOV or WebM (MAX. 100MB)
                      </p>
                    </div>
                    <Input
                      id="video-upload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                  </label>
                </div>
                {selectedVideo && (
                  <p className="text-sm text-green-600">
                    Selected: {selectedVideo.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're working on with your dog..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" /> Submit for Review
              </Button>
            </form>
          </CardContent>
        </Card>

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
                  {trainingSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.description}</TableCell>
                      <TableCell>
                        {session.feedback || (
                          <span className="text-gray-500 italic">Pending review</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;