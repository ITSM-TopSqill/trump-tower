import { MapPin, Clock, Car, Train, Plane, GraduationCap, Building, Heart } from "lucide-react";

const LocationConnectivity = () => {
  const connections = [
    {
      icon: Train,
      title: "Metro Station",
      distance: "7 KM",
      time: "15 mins drive",
      color: "text-blue-500"
    },
    {
      icon: Plane,
      title: "IGI Airport",
      distance: "45 KM",
      time: "1 hour drive",
      color: "text-green-500"
    },
    {
      icon: GraduationCap,
      title: "Top Schools",
      distance: "1-3 KM",
      time: "Walking distance",
      color: "text-purple-500"
    },
    {
      icon: Heart,
      title: "Hospitals",
      distance: "2-5 KM",
      time: "10 mins drive",
      color: "text-red-500"
    },
    {
      icon: Building,
      title: "Shopping Malls",
      distance: "3-7 KM",
      time: "15 mins drive",
      color: "text-orange-500"
    },
    {
      icon: Car,
      title: "NH24 Expressway",
      distance: "10 KM",
      time: "10 mins drive",
      color: "text-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Location & Connectivity
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Strategically located in Sector 12, Greater Noida West, Godrej Majesty offers
                unparalleled connectivity to Delhi NCR and all major landmarks. Experience the
                convenience of urban living with easy access to everything you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connections.map((connection, index) => (
                <div
                  key={connection.title}
                  className="flex items-center space-x-4 p-4 bg-card rounded-xl shadow-elegant hover:shadow-luxury transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center ${connection.color}`}>
                    <connection.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{connection.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{connection.distance}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {connection.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card p-6 rounded-xl shadow-elegant">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Key Nearby Landmarks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pari Chowk</span>
                    <span>5 KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Noida City Centre</span>
                    <span>12 KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DND Flyway</span>
                    <span>15 KM</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Connaught Place</span>
                    <span>35 KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cyber City Gurgaon</span>
                    <span>55 KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Greater Noida</span>
                    <span>8 KM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card p-6 rounded-xl shadow-elegant h-full">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">Project Location</h3>
              </div>

              {/* Placeholder for Google Map */}
              {/* Placeholder for Google Map */}
              <a
                href="https://www.google.com/maps?q=28.565832417716866,77.47888584396709"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-96 bg-muted rounded-xl flex items-center justify-center mb-4 hover:opacity-90 transition-opacity"
              >
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p className="text-sm">Click to open Google Maps</p>
                  <p className="text-xs mt-2">Coordinates: 28.4595° N, 77.3584° E</p>
                </div>
              </a>


              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Sector 12, Greater Noida West, Uttar Pradesh 201318
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationConnectivity;