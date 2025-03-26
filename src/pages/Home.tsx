
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome to Cornerstone Dog Training</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              Your trusted partner in dog training and behavior management
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Getting Started</h3>
              <p className="text-gray-600">
                Head over to the Training section to upload your training videos and receive personalized feedback from professional trainers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
