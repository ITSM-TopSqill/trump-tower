import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Phone, Download, X, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Enter Atleast 2 characters"),
  phone: z.string().min(10, "Enter 10 digits"),
  email: z.string().email("Enter valid Email"),
  interestedIn: z.array(z.string()).min(1, "Please select at least one option"),
  agreement: z.boolean().refine(val => val === true, "Please agree the terms"),
});

interface LeadFormProps {
  variant?: "hero" | "compact";
  title?: string;
  subtitle?: string;
}

interface Brochure {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_size?: number;
  download_count: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const LeadForm = ({ variant = "hero", title, subtitle }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const bhkOptions = ["2 BHK (Sold Out)", "3 BHK (Filling Fast)", "4 BHK (Available)", "4+ BHK (Available)"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interestedIn: [],
      agreement: false,
    },
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   setIsSubmitting(true);

  //   try {
  //     console.log("Lead form submission:", values);

  //     // Call the edge function to store lead and send notifications
  //     const { data, error } = await supabase.functions.invoke('send-lead-notification', {
  //       body: {
  //         name: values.name,
  //         phone: values.phone,
  //         email: values.email,
  //         formType: variant,
  //         agreement: values.agreement
  //       }
  //     });

  //     if (error) {
  //       console.error('Error submitting lead:', error);
  //       throw new Error(error.message || 'Failed to submit inquiry');
  //     }

  //     console.log('Lead submitted successfully:', data);

  //     toast({
  //       title: "Thank you for your interest!",
  //       description: "Our team will contact you within 24 hours.",
  //     });

  //     form.reset();

  //   } catch (error: any) {
  //     console.error('Form submission error:', error);
  //     toast({
  //       title: "Error",
  //       description: error.message || "Failed to submit inquiry. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      console.log("Lead form submission:", values);

      const { data, error } = await supabase.functions.invoke('send-lead-notification', {
        body: {
          name: values.name,
          phone: values.phone,
          email: values.email,
          interestedIn: values.interestedIn,
          formType: variant,
          agreement: values.agreement
        }
      });

      if (error) {
        console.error('Error submitting lead:', error);
        throw new Error(error.message || 'Failed to submit inquiry');
      }

      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you within 24 hours.",
      });

      // ✅ Download brochure after successful lead submission
      if (brochures.length > 0) {
        await downloadBrochure(brochures[0]);
      }

      form.reset();

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const [brochures, setBrochures] = useState<Brochure[]>([]);


  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    const { data } = await supabase
      .from('brochures')
      .select('*')
      .order('display_order');

    if (data) {
      setBrochures(data);
    }
  };
  const downloadBrochure = async (brochure: Brochure) => {
    try {
      // Increment download count
      const { error: updateError } = await supabase
        .from('brochures')
        .update({ download_count: brochure.download_count + 1 })
        .eq('id', brochure.id);

      if (updateError) {
        alert('Failed to update download count.');
        return;
      }

      // Get public URL
      const { data } = supabase
        .storage
        .from('brochures')
        .getPublicUrl(brochure.file_path);

      if (!data?.publicUrl) {
        alert('Failed to get brochure file URL.');
        return;
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.setAttribute('download', brochure.title || 'brochure.pdf');

      // Force open in a new tab (good fallback for mobile/Chrome blocking issues)
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Unexpected error occurred during download.');
      console.error(err);
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-card p-6 rounded-xl shadow-elegant">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
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
                    <Input placeholder="Enter Number" {...field} />
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
                  <FormControl>
                    <Input placeholder="Enter Email" type="email" {...field} />
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
                      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
                        {field.value.length === 0 && (
                          <span className="text-muted-foreground text-sm">Select BHK options...</span>
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
                        <PopoverContent className="w-full p-0">
                          <div className="p-4 space-y-2">
                            {bhkOptions.map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`compact-${option}`}
                                  checked={field.value.includes(option)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, option]);
                                    } else {
                                      field.onChange(field.value.filter(v => v !== option));
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`compact-${option}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      I agree to receive updates and offers
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Phone className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Get Details"}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="bg-card/95 backdrop-blur-sm p-6 rounded-2xl shadow-luxury border">
      {title && (
        <div className="text-center mb-3">
          <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
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
                    <Input placeholder="Enter Number" {...field} />
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
                  <Input placeholder="Enter Email" type="email" {...field} />
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

                      {/* <PopoverContent
                        className="min-w-[var(--radix-popover-trigger-width)] p-0"
                        align="start"
                      >
                        <div className="p-5 space-y-4">
                          {bhkOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-4">
                              <Checkbox
                                id={`compact-${option}`}
                                className="w-5 h-5"
                                checked={field.value.includes(option)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, option]);
                                  } else {
                                    field.onChange(field.value.filter((v) => v !== option));
                                  }
                                }}
                              />
                              <label
                                htmlFor={`compact-${option}`}
                                className="text-base font-medium leading-none cursor-pointer select-none"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent> */}
                      <PopoverContent
                        className="min-w-[var(--radix-popover-trigger-width)] p-0"
                        align="start"
                      >                        <div className="p-5 space-y-4">
                          {bhkOptions.map((option) => {
                            const isDisabled = option === "2 BHK (Sold Out)"; // disable only 2 BHK
                            return (
                              <div key={option} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`compact-${option}`}
                                  checked={field.value.includes(option)}
                                  disabled={isDisabled}  // disable here
                                  className="w-5 h-5"

                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, option]);
                                    } else {
                                      field.onChange(field.value.filter((v) => v !== option));
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={`compact-${option}`}
                                  className={`text-sm font-medium leading-none cursor-pointer
              ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
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

          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    I agree to receive updates and offers
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button Row */}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <Phone className="mr-2 h-5 w-5" />
            {isSubmitting ? "Submitting..." : "Enquire & Download Brochure"}
          </Button>

        </form>
      </Form>

      {brochures.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {brochures.slice(1, 3).map((brochure) => (
            <Button
              key={brochure.id}
              variant="outline"
              size="sm"
              onClick={() => downloadBrochure(brochure)}
            >
              <Download className="h-4 w-4 mr-1" />
              {brochure.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

};

export default LeadForm;