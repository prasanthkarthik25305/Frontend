
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, MapPin, HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Mock hospital data
const hospitals = [
  { id: 1, name: "Health Hub Medical Center", distance: "1.2 miles", address: "123 Healthcare Ave, Medical District", specialties: ["Cardiology", "Neurology", "General Medicine"] },
  { id: 2, name: "City General Hospital", distance: "2.5 miles", address: "456 Wellness Blvd, Downtown", specialties: ["Emergency Care", "Orthopedics", "Pediatrics"] },
  { id: 3, name: "Community Care Clinic", distance: "3.7 miles", address: "789 Health Street, Riverside", specialties: ["Family Medicine", "Dermatology", "Psychiatry"] },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  systolic: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Please enter a valid systolic pressure" }),
  diastolic: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: "Please enter a valid diastolic pressure" }),
  hospitalId: z.string(),
  appointmentDate: z.date({
    required_error: "Please select a date",
  }),
  appointmentTime: z.string().min(1, { message: "Please select a time" }),
});

const BookAppointment = () => {
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to book an appointment",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      systolic: "",
      diastolic: "",
      hospitalId: "",
      appointmentTime: "",
    },
  });

  const watchSystolic = form.watch("systolic");
  const watchDiastolic = form.watch("diastolic");
  const watchHospitalId = form.watch("hospitalId");

  // Calculate BP status whenever systolic or diastolic changes
  const getBPStatus = () => {
    const systolic = Number(watchSystolic);
    const diastolic = Number(watchDiastolic);
    
    if (!systolic || !diastolic) return null;
    
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

  // Update selected hospital when hospitalId changes
  useEffect(() => {
    if (watchHospitalId) {
      const hospital = hospitals.find(h => h.id.toString() === watchHospitalId);
      setSelectedHospital(hospital);
    }
  }, [watchHospitalId]);

  const bpStatus = getBPStatus();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Show successful booking toast
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime}.`,
    });
    
    // Navigate to confirmation page with the booking details
    navigate('/appointment-confirmation', { 
      state: { 
        appointment: values,
        hospital: selectedHospital
      } 
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-elevation overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-health-blue/10">
            <h3 className="text-2xl font-bold leading-6 text-gray-900">Book an Appointment</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Please fill out the form below to schedule your appointment.</p>
          </div>
          
          <div className="p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <HeartPulse className="text-health-blue" />
                    Blood Pressure Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="systolic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Systolic (mmHg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="120" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="diastolic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Diastolic (mmHg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="80" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {bpStatus && watchSystolic && watchDiastolic && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">BP Status: <span className={bpStatus.color}>{bpStatus.status}</span></p>
                      {bpStatus.status === "Hypertensive Crisis" && (
                        <p className="text-red-700 mt-2 text-sm font-bold">
                          IMPORTANT: If your blood pressure is this high, seek immediate medical attention!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <MapPin className="text-health-blue" />
                    Select Nearest Hospital
                  </h4>
                  
                  <FormField
                    control={form.control}
                    name="hospitalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a hospital" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hospitals.map((hospital) => (
                              <SelectItem key={hospital.id} value={hospital.id.toString()}>
                                {hospital.name} ({hospital.distance})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {selectedHospital && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h5 className="font-medium text-gray-900">{selectedHospital.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{selectedHospital.address}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selectedHospital.specialties.map((specialty: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-health-blue/10 text-health-blue">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => setShowMapDialog(true)}
                      >
                        View on Map
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <CalendarIcon className="text-health-blue" />
                    Appointment Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Appointment Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="appointmentTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appointment Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Book Appointment
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedHospital?.name}</DialogTitle>
            <DialogDescription>
              {selectedHospital?.address}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 h-80 bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-health-blue mx-auto mb-4" />
              <p className="text-gray-600">
                This is where a map would be shown with directions to {selectedHospital?.name}.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Distance: {selectedHospital?.distance}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookAppointment;
