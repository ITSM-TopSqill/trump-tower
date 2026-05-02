import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Send, Clock, ChevronDown, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactInfo from "./ContactInfo";

const formSchema = z.object({
  name: z.string().min(2, " Enter Atleast 2 characters"),
  phone: z.string().min(10, "Enter 10 digits"),
  email: z.string().email("Enter Valid Email"),
  message: z.string().min(10, "Atleast 10 characters"),
  interestedIn: z.array(z.string()).min(1, "Please select at least one option"),
});

const bhkOptions = [
  { value: "2 BHK (Sold Out)", label: "2 BHK (Sold Out)" },
  { value: "3 BHK (Filling Fast)", label: "3 BHK (Filling Fast)" },
  { value: "4 BHK (Available)" , label: "4 BHK (Available)" },
  { value: "4+ BHK (Available)", label: "4+ BHK (Available)" },

];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      interestedIn: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      console.log("Contact form submission:", values);

      const { data, error } = await supabase.functions.invoke('send-lead-notification', {
        body: {
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
          formType: 'contact',
          agreement: true,
          interestedIn: values.interestedIn
        }
      });

      if (error) {
        console.error('Error submitting contact form:', error);
        throw new Error(error.message || 'Failed to submit inquiry');
      }

      console.log('Contact form submitted successfully:', data);

      toast({
        title: "Thank you for your message!",
        description: "Our team will contact you within 24 hours.",
      });

      form.reset();

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Ready to Make Godrej Majesty Your Home?
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Contact our expert team today to schedule a site visit or get more information
                about this exclusive residential project.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-card/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20">
              <ContactInfo />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Project Location</h3>
                <p className="opacity-80">Sector 12, Greater Noida West, UP</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Site Visit Hours</h3>
                <p className="opacity-80">Mon - Sun: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-card/10 backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl border border-primary-foreground/20 w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none lg:mx-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Send us a Message</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            {...field}
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                          />
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
                        <FormControl>
                          <Input
                            placeholder="Phone Number"
                            {...field}
                            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          type="email"
                          {...field}
                          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        />
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={`w-full justify-between bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 ${!field.value?.length && "text-primary-foreground/60"
                                }`}
                            >
                              {field.value?.length > 0
                                ? `${field.value.length} option${field.value.length > 1 ? 's' : ''} selected`
                                : "Select interested BHK options"}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <div className="p-3">
                            <p className="text-sm font-medium mb-3">Select your interested BHK options:</p>
                            <div className="space-y-2">
                              {bhkOptions.map((option) => {
                                const isSelected = field.value?.includes(option.value);
                                const isDisabled = option.value === "2 BHK (Sold Out)"; // disable only 2 BHK
                                return (
                                  <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`contact-${option.value}`}
                                      checked={isSelected}
                                      disabled={isDisabled} // disable checkbox
                                      onCheckedChange={(checked) => {
                                        let newValue = [...(field.value || [])];
                                        if (checked) {
                                          newValue.push(option.value);
                                        } else {
                                          newValue = newValue.filter((val) => val !== option.value);
                                        }
                                        field.onChange(newValue);
                                      }}
                                    />
                                    <label
                                      htmlFor={`contact-${option.value}`}
                                      className={`text-sm font-medium leading-none select-none
                ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </PopoverContent>

                      </Popover>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {field.value?.map((selectedValue) => {
                          const option = bhkOptions.find(opt => opt.value === selectedValue);
                          return (
                            <Badge key={selectedValue} variant="secondary" className="text-xs">
                              {option?.label}
                              <button
                                type="button"
                                onClick={() => {
                                  const newValue = field.value?.filter(val => val !== selectedValue) || [];
                                  field.onChange(newValue);
                                }}
                                className="ml-1 hover:bg-destructive/20 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          rows={4}
                          {...field}
                          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full text-lg"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;