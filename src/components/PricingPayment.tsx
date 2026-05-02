import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Calculator, Calendar, CheckCircle } from "lucide-react";
import LeadForm from "./LeadForm";

const PricingPayment = () => {
 const pricingPlans = [
    {
      type: "3 BHK",
      area: "1993 Sq. Ft.",
      basePrice: "₹2.90 Cr – ₹3.20 Cr",
      pricePerSqft: "₹3,600",
      highlights: ["Prime Location", "Garden Facing", "Vastu Compliant"]
    },
    {
      type: "3 BHK + Study",
      area: "2368 Sq. Ft.",
      basePrice: "₹3.29 Cr – ₹3.72 Cr",
      pricePerSqft: "₹3,800",
      highlights: ["Corner Units", "Extra Balcony", "Premium Finishes"]
    },
    {
      type: "4 BHK",
      area: "2757 Sq. Ft.",
      basePrice: "₹3.56 Cr – ₹4.19 Cr",
      pricePerSqft: "₹4,000",
      highlights: ["Penthouse Style", "Panoramic Views", "Luxury Amenities"]
    },
    {
      type: "4 BHK + Study",
      area: "2799 Sq. Ft.",
      basePrice: " ₹3.96 Cr – ₹4.48 Cr",
      pricePerSqft: "₹4,000",
      highlights: ["Penthouse Style", "Panoramic Views", "Luxury Amenities"]
    }
  ];

  const paymentPlans = [
    {
      name: "Construction Linked Plan",
      structure: "10:80:10",
      details: [
        { stage: "At Booking", percentage: "10%" },
        { stage: "During Construction", percentage: "80%"},
        { stage: "At Possession", percentage: "10%" }
      ],
      popular: true
    },
    // {
    //   name: "Possession Linked Plan",
    //   structure: "20:80",
    //   details: [
    //     { stage: "At Booking", percentage: "20%", amount: "₹9 - ₹17 Lakhs" },
    //     { stage: "At Possession", percentage: "80%", amount: "Balance Amount" }
    //   ],
    //   popular: false
    // },
    // {
    //   name: "Flexi Payment Plan",
    //   structure: "5:5:90",
    //   details: [
    //     { stage: "At Booking", percentage: "5%", amount: "₹2.25 - ₹4.25 Lakhs" },
    //     { stage: "Within 45 Days", percentage: "5%", amount: "₹2.25 - ₹4.25 Lakhs" },
    //     { stage: "At Possession", percentage: "90%", amount: "Balance Amount" }
    //   ],
    //   popular: false
    // }
  ];

  const additionalCharges = [
    { item: "Registration Charges", amount: "As per government rates" },
    { item: "Stamp Duty", amount: "As per government rates" },
    { item: "Maintenance Deposit", amount: "₹25,000 - ₹40,000" },
    { item: "Car Parking", amount: "₹2.5 - ₹3.5 Lakhs" },
    { item: "Club Membership", amount: "₹1.5 Lakhs" },
    { item: "Preferred Location Charges", amount: "As applicable" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Pricing & Payment Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible payment options designed to make your dream home affordable. 
            Choose from multiple payment plans that suit your financial planning.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="lg:col-span-2">
            {/* Pricing Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-8">Current Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={plan.type}
                    className="bg-card p-6 rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-foreground mb-2">{plan.type}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{plan.area}</p>
                      <div className="text-2xl font-bold text-primary mb-2">{plan.basePrice}</div>
                      {/* <p className="text-sm text-muted-foreground">Starting from {plan.pricePerSqft}/sq.ft</p> */}
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {plan.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* <Button variant="outline" className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate EMI
                    </Button> */}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Plans */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8">Payment Plans</h3>
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto p-1">
                  {paymentPlans.map((plan, index) => (
                    <TabsTrigger key={index} value={index.toString()} className="text-sm">
                      {plan.structure}
                      {plan.popular && (
                        <span className="ml-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                          Popular
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {paymentPlans.map((plan, index) => (
                  <TabsContent key={index} value={index.toString()}>
                    <div className="bg-card p-6 rounded-xl shadow-elegant">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-semibold text-foreground">{plan.name}</h4>
                        {plan.popular && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        {plan.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-b border-border">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-primary mr-3" />
                              <span className="font-medium text-foreground">{detail.stage}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{detail.percentage}</div>
                              {/* <div className="text-sm text-muted-foreground">{detail.amount}</div> */}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          * All amounts are approximate and may vary based on floor, view, and other factors.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            {/* Additional Charges */}
            {/* <div className="mt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Additional Charges</h3>
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="space-y-3">
                  {additionalCharges.map((charge, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border">
                      <span className="text-foreground">{charge.item}</span>
                      <span className="text-muted-foreground">{charge.amount}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> GST will be charged extra as applicable. 
                    Final prices may vary based on floor selection and other preferences.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          
          {/* <div className="lg:col-span-1">
            <div className="sticky top-8">
              <LeadForm 
                title="Get Price Details"
                subtitle="Request detailed pricing and payment information"
              />
              
              <div className="mt-6 bg-card p-6 rounded-xl shadow-elegant text-center">
                <IndianRupee className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Home Loan Assistance
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get pre-approved home loans with attractive interest rates from leading banks
                </p>
                <Button variant="outline" className="w-full">
                  Check Eligibility
                </Button>
              </div>
            </div>
          </div> */}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All prices are subject to change without prior notice. Please confirm current pricing with our sales team.
          </p>
          {/* <Button variant="luxury" size="lg">
            Schedule Price Discussion
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default PricingPayment;