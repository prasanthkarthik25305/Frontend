
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MapPin, CalendarIcon, Clock, HeartPulse, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment, hospital } = location.state || {};

  useEffect(() => {
    // Redirect if no appointment data is present
    if (!appointment || !hospital) {
      navigate('/book-appointment');
    }
  }, [appointment, hospital, navigate]);

  if (!appointment || !hospital) {
    return null;
  }

  // Calculate BP status
  const getBPStatus = () => {
    const systolic = Number(appointment.systolic);
    const diastolic = Number(appointment.diastolic);
    
    if (systolic < 120 && diastolic < 80) {
      return { status: "Normal", color: "text-green-500" };
    } else if ((systolic >= 120 && systolic <= 129) && diastolic < 80) {
      return { status: "Elevated", color: "text-yellow-500" };
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      return { status: "High Blood Pressure (Stage 1)", color: "text-orange-500" };
    } else if (systolic >= 140 || diastolic >= 90) {
      return { status: "High Blood Pressure (Stage 2)", color: "text-red-500" };
    } else if (systolic > 180 || diastolic > 120) {
      return { status: "Hypertensive Crisis", color: "text-red-700 font-bold" };
    }
    
    return { status: "Unknown", color: "text-gray-500" };
  };

  const bpStatus = getBPStatus();

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Confirmed!</h1>
          <p className="mt-2 text-gray-600">Thank you for booking your appointment with Health Hub.</p>
        </div>

        <Card className="shadow-elevation mb-8">
          <CardHeader className="bg-health-blue/10">
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Your upcoming appointment information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <CalendarIcon className="w-5 h-5 text-health-blue mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Date</p>
                  <p className="text-gray-600">{format(new Date(appointment.appointmentDate), "PPPP")}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-health-blue mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Time</p>
                  <p className="text-gray-600">{appointment.appointmentTime}</p>
                </div>
              </div>

              <div className="flex items-start">
                <HeartPulse className="w-5 h-5 text-health-blue mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Blood Pressure</p>
                  <p className="text-gray-600">
                    {appointment.systolic}/{appointment.diastolic} mmHg
                    <span className={`ml-2 ${bpStatus.color}`}>({bpStatus.status})</span>
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-health-blue mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-900">{hospital.name}</p>
                    <p className="text-gray-600">{hospital.address}</p>
                    <p className="text-sm text-gray-500 mt-1">Distance: {hospital.distance}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch sm:flex-row sm:items-center gap-4 pt-0">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => navigate('/get-directions', { 
                state: { hospital } 
              })}
            >
              <Route className="w-4 h-4" />
              Get Directions
            </Button>
            <Button 
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </CardFooter>
        </Card>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-2">Important Information</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex gap-2">
              <svg className="w-5 h-5 text-health-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Please arrive 15 minutes before your scheduled appointment time.</span>
            </li>
            <li className="flex gap-2">
              <svg className="w-5 h-5 text-health-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bring your ID and insurance card if applicable.</span>
            </li>
            <li className="flex gap-2">
              <svg className="w-5 h-5 text-health-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>If you need to cancel or reschedule, please do so at least 24 hours in advance.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
