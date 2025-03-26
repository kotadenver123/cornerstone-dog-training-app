
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface Location {
  id: string;
  name: string;
  count: number;
}

interface LocationFilterProps {
  locations: Location[];
  selectedLocations: string[];
  toggleLocation: (id: string) => void;
  resetFilters: () => void;
}

export function LocationFilter({ 
  locations, 
  selectedLocations, 
  toggleLocation,
  resetFilters 
}: LocationFilterProps) {
  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 whitespace-nowrap"
        onClick={resetFilters}
      >
        <Filter className="h-4 w-4" />
        Filters
      </Button>
      
      <Button 
        variant="outline" 
        className={`whitespace-nowrap ${selectedLocations.length === 0 ? "bg-blue-100 border-blue-300" : ""}`}
        onClick={resetFilters}
      >
        All classes
      </Button>
      
      <Button 
        variant="outline" 
        className={`whitespace-nowrap ${selectedLocations.length > 0 ? "bg-blue-500 text-white" : ""}`}
      >
        {locations.length} locations
      </Button>
      
      <Button 
        variant="outline" 
        className="whitespace-nowrap"
      >
        All activity
      </Button>
    </>
  );
}
