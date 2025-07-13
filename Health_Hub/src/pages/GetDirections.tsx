
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

const GetDirections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hospital } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Redirect if no hospital data is present
    if (!hospital) {
      navigate('/book-appointment');
    }
  }, [hospital, navigate]);

  if (!hospital) {
    return null;
  }

  // Mock route steps
  const routeSteps = [
    {
      instruction: "Start from your current location",
      distance: "0.0 miles",
      duration: "0 mins",
    },
    {
      instruction: "Head north on Main Street",
      distance: "0.4 miles",
      duration: "2 mins",
    },
    {
      instruction: "Turn right onto Healthcare Boulevard",
      distance: "0.8 miles",
      duration: "3 mins",
    },
    {
      instruction: "Continue straight past the traffic lights",
      distance: "0.3 miles",
      duration: "1 min",
    },
    {
      instruction: `Arrive at ${hospital.name}`,
      distance: hospital.distance,
      duration: "0 mins",
      isDestination: true
    },
  ];

  const handleNextStep = () => {
    if (currentStep < routeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevation overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-health-blue/10 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold leading-6 text-gray-900">Directions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Follow these directions to reach {hospital.name}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 rounded-full bg-health-blue"></div>
              <div className="ml-2 flex-1 h-0.5 bg-health-blue"></div>
              <div className="w-6 h-6 rounded-full bg-health-orange flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="bg-gray-100 h-60 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="w-12 h-12 text-health-blue mx-auto mb-3" />
                <p className="text-gray-700">Map view would be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">Total distance: {hospital.distance}</p>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${routeSteps[currentStep].isDestination ? 'bg-health-orange' : 'bg-health-blue'}`}>
                  <span className="text-white font-medium">{currentStep + 1}</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{routeSteps[currentStep].instruction}</h4>
                  <p className="text-sm text-gray-500">
                    {routeSteps[currentStep].distance} • {routeSteps[currentStep].duration}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  size="sm"
                  onClick={handleNextStep}
                  disabled={currentStep === routeSteps.length - 1}
                  className="gap-1"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">All Steps</h4>
              <div className="space-y-3">
                {routeSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start p-3 rounded-md cursor-pointer ${currentStep === index ? 'bg-health-blue/5 border border-health-blue/20' : 'hover:bg-gray-50'}`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.isDestination ? 'bg-health-orange' : 'bg-health-blue/20'}`}>
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm ${currentStep === index ? 'font-medium' : ''}`}>{step.instruction}</p>
                      <p className="text-xs text-gray-500">{step.distance} • {step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDirections;
