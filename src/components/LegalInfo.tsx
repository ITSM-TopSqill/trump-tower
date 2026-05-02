import { FileText, Shield, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalInfo = () => {
  const legalDocuments = [
    {
      title: "RERA Registration",
      number: "UPRERAPRJ123456789",
      status: "Valid",
      description: "Project registered under UP-RERA"
    },
    {
      title: "Environmental Clearance",
      number: "EC/2023/UP/456789",
      status: "Approved",
      description: "Environmental clearance obtained"
    },
    {
      title: "Building Plan Approval",
      number: "BPA/2023/GNW/123",
      status: "Sanctioned",
      description: "Building plans approved by authority"
    }
  ];

  const importantNotes = [
    "This is a channel partner website. We are authorized channel partners for Godrej Properties.",
    "All information provided is based on the latest available data from the developer.",
    "Prices, specifications, and amenities are subject to change without prior notice.",
    "Images and renderings are for representational purposes only and may vary from actual construction.",
    "Buyers are advised to verify all details with the developer before making any purchase decision.",
    "Please read all terms and conditions carefully before booking."
  ];

  const quickLinks = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms & Conditions", href: "#" },
    { title: "Refund Policy", href: "#" },
    { title: "Complaint Redressal", href: "#" },
    { title: "RERA Disclaimer", href: "#" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Legal Information & Compliance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We maintain complete transparency in all our dealings. Find all legal 
            information and regulatory compliance details here.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Legal Documents */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <FileText className="h-6 w-6 text-primary mr-2" />
                Legal Documents & Approvals
              </h3>
              
              <div className="space-y-4">
                {legalDocuments.map((doc, index) => (
                  <div 
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-elegant animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {doc.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          {doc.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-mono text-muted-foreground">
                            {doc.number}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'Valid' || doc.status === 'Approved' || doc.status === 'Sanctioned'
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Important Disclaimers */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Info className="h-6 w-6 text-primary mr-2" />
                Important Disclaimers
              </h3>
              
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="space-y-4">
                  {importantNotes.map((note, index) => (
                    <div 
                      key={index}
                      className="flex items-start animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Channel Partner Info */}
            <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-accent mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Channel Partner Declaration
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We are an authorized channel partner for Godrej Properties Limited. 
                    This website is operated by [Channel Partner Name] under authorization 
                    from Godrej Properties. All bookings and transactions are processed 
                    through official Godrej Properties systems and procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Legal Documents
                </h4>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center justify-between group"
                    >
                      <span>{link.title}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/10 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Need Legal Assistance?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our legal team is available to answer any questions about 
                  documentation and compliance.
                </p>
                <Button variant="default" className="w-full">
                  Contact Legal Team
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Last updated: December 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalInfo;