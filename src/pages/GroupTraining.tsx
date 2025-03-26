
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { LocationFilter } from "@/components/group-training/LocationFilter";
import { ClassList } from "@/components/group-training/ClassList";
import { ChevronLeft } from "lucide-react";

// Mock data for locations
const locations = [
  { id: "1", name: "Downtown", count: 4 },
  { id: "2", name: "Westside", count: 3 },
  { id: "3", name: "Northgate", count: 2 },
  { id: "4", name: "Southcenter", count: 5 },
];

// Mock data for classes (in a real app, this would be filtered based on selected date and locations)
const getClassesForDate = (date: Date, selectedLocations: string[]) => {
  const dateStr = format(date, "yyyy-MM-dd");
  const allClasses = [
    {
      id: "1",
      title: "Basic Obedience",
      time: "10:00 am",
      duration: "60 mins",
      trainer: "John Smith",
      location: "Downtown",
      locationId: "1",
      spots: 8,
      spotsTotal: 12,
      date: "2024-05-01",
    },
    {
      id: "2",
      title: "Puppy Socialization",
      time: "01:30 pm",
      duration: "45 mins",
      trainer: "Sarah Johnson",
      location: "Westside",
      locationId: "2",
      spots: 5,
      spotsTotal: 10,
      date: "2024-05-01",
    },
    {
      id: "3",
      title: "Leash Training",
      time: "03:00 pm",
      duration: "60 mins",
      trainer: "Mike Davis",
      location: "Downtown",
      locationId: "1",
      spots: 6,
      spotsTotal: 8,
      date: "2024-05-01",
    },
    {
      id: "4",
      title: "Advanced Commands",
      time: "05:30 pm",
      duration: "60 mins",
      trainer: "Jessica White",
      location: "Northgate",
      locationId: "3",
      spots: 3,
      spotsTotal: 10,
      date: "2024-05-02",
    },
    {
      id: "5",
      title: "Agility Intro",
      time: "10:00 am",
      duration: "90 mins",
      trainer: "Robert Green",
      location: "Southcenter",
      locationId: "4",
      spots: 12,
      spotsTotal: 15,
      date: "2024-05-02",
    },
  ];

  let filteredClasses = allClasses.filter(c => c.date === dateStr);
  
  if (selectedLocations.length > 0) {
    filteredClasses = filteredClasses.filter(c => 
      selectedLocations.includes(c.locationId)
    );
  }
  
  return filteredClasses;
};

const GroupTraining = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  const classes = getClassesForDate(selectedDate, selectedLocations);
  
  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };
  
  const resetFilters = () => {
    setSelectedLocations([]);
  };

  // Calculate days to display in the week view
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <Button variant="ghost" className="p-2 mr-2" aria-label="Back">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-center flex-1">Find A Class</h1>
        </div>
        
        <div className="flex gap-2 overflow-x-auto py-2 mb-4">
          <LocationFilter 
            locations={locations} 
            selectedLocations={selectedLocations} 
            toggleLocation={toggleLocation}
            resetFilters={resetFilters}
          />
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex min-w-max">
            {weekDays.map((date, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`flex-1 flex-col items-center justify-center p-2 min-w-16 ${
                  format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    ? 'bg-primary/10 text-primary'
                    : ''
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="font-medium">{format(date, 'EEE')}</div>
                <div className="text-xl font-bold">{format(date, 'd')}</div>
                {format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && (
                  <div className="h-1 w-1 bg-primary rounded-full mt-1"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">{format(selectedDate, 'EEE, MMM d')}</h2>
        
        <ClassList classes={classes} />
        
        {classes.length === 0 && (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 text-center text-gray-500">
              No classes available for the selected date and location.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GroupTraining;
