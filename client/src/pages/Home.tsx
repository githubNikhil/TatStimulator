import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function Home() {
  const [, setLocation] = useLocation();

  const handlePracticePsych = () => {
    setLocation("/test-selection");
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <Card className="bg-white rounded-lg shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6" style={{ color: "#556B2F" }}>
              Welcome to Psychological Test Simulator
            </h2>
            <p className="mb-6 text-center">
              Simulate standardized psychological tests in a controlled environment.
            </p>
            
            <div className="flex justify-center">
              <Button 
                style={{ backgroundColor: "#556B2F" }}
                className="hover:bg-opacity-90 text-white font-medium py-6 px-8 rounded-lg transition duration-200 shadow-sm text-lg"
                onClick={handlePracticePsych}
              >
                Practice Psych
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
