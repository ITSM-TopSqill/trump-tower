import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X, ChevronDown } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Atleast 2 characters"),
  phone: z.string().min(10, "Atleast 10 digits"),
  email: z.string().email("Invalid Email"),
  interestedIn: z.array(z.string()).min(1, "Please select at least one option"),
});

interface MandatoryInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const MandatoryInquiryModal = ({ isOpen, onClose, onSuccess }: MandatoryInquiryModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const bhkOptions = ["2 BHK (Sold Out)", "3 BHK (Filling Fast)", "4 BHK (Available)", "4+ BHK (Available)"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interestedIn: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log("Form already submitting, ignoring duplicate submission");
      return;
    }

    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Form values:", values);
    setIsSubmitting(true);

    try {
      console.log("Attempting to store lead in database...");

      // Store data directly in the database
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: values.name,
          phone: values.phone,
          email: values.email,
          interested_in: values.interestedIn,
          form_type: 'mandatory-inquiry',
          agreement: true
        })
        .select()
        .single();

      if (leadError) {
        console.error("=== DATABASE ERROR ===");
        console.error("Error details:", leadError);
        toast.error("Failed to submit inquiry. Please try again.");
        return;
      }

      console.log("=== SUCCESS! Lead stored in database ===");
      console.log("Lead data:", leadData);

      // Try to send notification (but don't fail if this doesn't work)
      try {
        console.log("Attempting to send notification...");
        const { data: notificationData, error: notificationError } = await supabase.functions.invoke('send-lead-notification', {
          body: {
            name: values.name,
            phone: values.phone,
            email: values.email,
            interestedIn: values.interestedIn,
            formType: 'mandatory-inquiry',
            agreement: true
          }
        });

        if (notificationError) {
          console.error("Notification error (non-critical):", notificationError);
        } else {
          console.log("Notification sent successfully:", notificationData);
        }
      } catch (notificationError) {
        console.error("Notification failed (non-critical):", notificationError);
      }

      console.log("=== SHOWING SUCCESS MESSAGE ===");
      toast.success("Inquiry Sent Successfully!");

      // Store in sessionStorage that form was submitted for this tab
      sessionStorage.setItem('mandatoryInquirySubmitted', 'true');

      console.log("=== CALLING SUCCESS HANDLER ===");
      form.reset();
      onSuccess();

    } catch (error) {
      console.error("=== UNEXPECTED ERROR ===");
      console.error("Error details:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      console.log("=== FORM SUBMISSION ENDED ===");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Get Exclusive Information</DialogTitle>
          <DialogDescription className="text-center">
            Please provide your details to access our content and receive personalized information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
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
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interested In</FormLabel>
                  <FormControl>
                    <div className="space-y-2">

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            Add BHK options
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="min-w-[var(--radix-popover-trigger-width)] p-0"
                          align="start"
                        >
                          <div className="p-5 space-y-4">
                            {bhkOptions.map((option) => {
                              const isDisabled = option === "2 BHK (Sold Out)"; // disable only 2 BHK
                              return (
                                <div key={option} className="flex items-center space-x-4">
                                  <Checkbox
                                    id={`modal-${option}`}
                                    className="w-5 h-5"
                                    checked={field.value.includes(option)}
                                    disabled={isDisabled} // disable checkbox
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, option]);
                                      } else {
                                        field.onChange(field.value.filter((v) => v !== option));
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`modal-${option}`}
                                    className={`text-base font-medium leading-none select-none
              ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                  >
                                    {option}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </PopoverContent>

                      </Popover>

                      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
                        {field.value.length === 0 && (
                          <span className="text-muted-foreground text-sm">Selected BHK options...</span>
                        )}
                        {field.value.map((option) => (
                          <div key={option} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                            {option}
                            <button
                              type="button"
                              onClick={() => {
                                const newValue = field.value.filter(v => v !== option);
                                field.onChange(newValue);
                              }}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit & Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MandatoryInquiryModal;