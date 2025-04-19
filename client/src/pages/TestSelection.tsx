import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import InstructionModal from "@/components/InstructionModal";
import { TEST_DURATIONS } from "@/lib/testUtils";

export default function TestSelection() {
  const [, setLocation] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    content: "",
    testType: ""
  });

  const showInstructions = (testType: string, title: string, content: string) => {
    setModalInfo({ testType, title, content });
    setModalOpen(true);
  };

  const handleStartTest = () => {
    setModalOpen(false);
    
    switch (modalInfo.testType) {
      case 'tat':
        setLocation("/tat-test");
        break;
      case 'wat':
        setLocation("/wat-test");
        break;
      case 'srt':
        setLocation("/srt-test");
        break;
      case 'full':
        setLocation("/tat-test?mode=full");
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <Card className="bg-white rounded-lg shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-center text-olive-green mb-6">
              Select a Test
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="bg-light-blue hover:bg-light-blue/90 text-gray-800 font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center"
                onClick={() => showInstructions(
                  'tat',
                  'Thematic Apperception Test',
                  `You will be shown 11 images and 1 blank slide. Each image will be displayed for 30 seconds, followed by a 4-minute gap. Total test duration is ${TEST_DURATIONS.TAT.TOTAL_TIME / 60} minutes.`
                )}
              >
                <span className="mr-2">TAT</span>
                <span className="text-sm opacity-80">(Thematic Apperception Test)</span>
              </Button>
              
              <Button 
                className="bg-light-blue hover:bg-light-blue/90 text-gray-800 font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center"
                onClick={() => showInstructions(
                  'wat',
                  'Word Association Test',
                  `You will be shown 60 words, one at a time. Each word will be displayed for 15 seconds. Total test duration is ${TEST_DURATIONS.WAT.TOTAL_TIME / 60} minutes.`
                )}
              >
                <span className="mr-2">WAT</span>
                <span className="text-sm opacity-80">(Word Association Test)</span>
              </Button>
              
              <Button 
                className="bg-light-blue hover:bg-light-blue/90 text-gray-800 font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center"
                onClick={() => showInstructions(
                  'srt',
                  'Situation Reaction Test',
                  `You will be shown 60 situations, one at a time. Each situation will be displayed for 30 seconds. Total test duration is ${TEST_DURATIONS.SRT.TOTAL_TIME / 60} minutes.`
                )}
              >
                <span className="mr-2">SRT</span>
                <span className="text-sm opacity-80">(Situation Reaction Test)</span>
              </Button>
              
              <Button 
                className="bg-light-blue hover:bg-light-blue/90 text-gray-800 font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center"
                onClick={() => setLocation("/sdt-selection")}
              >
                <span className="mr-2">SDT</span>
                <span className="text-sm opacity-80">(Self Description Test)</span>
              </Button>
              
              <Button 
                className="bg-olive-green hover:bg-olive-green/90 text-white font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center"
                onClick={() => showInstructions(
                  'full',
                  'Full Length Psychological Test',
                  'You will take all 4 tests (TAT, WAT, SRT, SDT) one after another without breaks. Total test duration is approximately 2 hours.'
                )}
              >
                <span className="mr-2">Full Length Psych</span>
                <span className="text-sm opacity-80">(All Tests)</span>
              </Button>
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="ghost"
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setLocation("/")}
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <InstructionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStart={handleStartTest}
        title={modalInfo.title}
        content={modalInfo.content}
      />
    </Layout>
  );
}
