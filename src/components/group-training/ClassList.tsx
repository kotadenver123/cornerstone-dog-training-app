
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Class {
  id: string;
  title: string;
  time: string;
  duration: string;
  trainer: string;
  location: string;
  spots: number;
  spotsTotal: number;
}

interface ClassListProps {
  classes: Class[];
}

export function ClassList({ classes }: ClassListProps) {
  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <Card key={classItem.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>{classItem.time} • {classItem.duration}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{classItem.title}</h3>
              
              <div className="text-gray-700">
                with {classItem.trainer}
              </div>
              
              <div className="text-gray-700">
                {classItem.location}
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-4 flex justify-between items-center">
              <div className="text-green-500 font-medium">
                {classItem.spots} spots left
              </div>
              <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(classItem.spots / classItem.spotsTotal) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
