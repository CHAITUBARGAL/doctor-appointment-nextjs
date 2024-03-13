import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

const BookAppointment = (doctor) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, SetSelectedTimeSlot] = useState();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + "30 PM",
      });
    }
    setTimeSlot(timeList);
  };
  const saveBooking = () => {
    const data = {
      data: {
        name: user && user.given_name + " " + user && user.family_name,
        email: user.email,
        date: date,
        doctor: user.doctor,
      },
    };
    GlobalApi.bookAppointment(data).then((resp) => {
      console.log(resp);
      if (resp) {
        GlobalApi.sendEmail(data).then((resp) => {
          console.log(resp);
        });
        toast("Booking Confirmation send on Email");
      }
    });
  };
  const isPastDay = (day) => {
    return day <= new Date();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5  ">
                {/* calender  */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>

                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot &&
                      timeSlot.map((item, index) => (
                        <h2
                          key={index}
                          onClick={() => SetSelectedTimeSlot(item.time)}
                          className={`p-2 border text-center hover:bg-primary hover:text-white  rounded-full ${
                            item.time === selectedTimeSlot
                              ? "bg-primary text-white"
                              : ""
                          }`}
                        >
                          {item.time}
                        </h2> 
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            className="text-red-500 border-red-500 "
            variant="outline "
          >
            Close
          </Button>
          <Button
            type="submit"
            disabled={!(date&&selectedTimeSlot)}
            onClick={() => saveBooking()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
