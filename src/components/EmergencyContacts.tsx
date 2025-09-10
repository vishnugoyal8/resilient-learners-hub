import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  FireIcon,
  ShieldExclamationIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const emergencyContacts = [
  {
    id: 1,
    service: 'Fire Department',
    number: '101',
    icon: FireIcon,
    description: 'Fire emergencies, rescue operations, and hazardous material incidents',
    color: 'from-red-500 to-orange-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    available: '24/7'
  },
  {
    id: 2,
    service: 'Police',
    number: '100',
    icon: ShieldExclamationIcon,
    description: 'Law enforcement, security incidents, and emergency assistance',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    available: '24/7'
  },
  {
    id: 3,
    service: 'Ambulance',
    number: '102',
    icon: HeartIcon,
    description: 'Medical emergencies, ambulance services, and health emergencies',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    available: '24/7'
  },
  {
    id: 4,
    service: 'Disaster Management Helpline',
    number: '108',
    icon: ExclamationTriangleIcon,
    description: 'NDMA emergency helpline for disaster-related assistance and coordination',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    available: '24/7'
  },
  {
    id: 5,
    service: 'Women Helpline',
    number: '1091',
    icon: HeartIcon,
    description: 'Emergency assistance and support for women in distress',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    available: '24/7'
  },
  {
    id: 6,
    service: 'Child Helpline',
    number: '1098',
    icon: HeartIcon,
    description: 'Emergency assistance and support for children in need',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    available: '24/7'
  }
];

const internationalContacts = [
  {
    service: 'UNDRR Regional Office',
    number: '+66 2 288 2324',
    description: 'United Nations Office for Disaster Risk Reduction - Asia Pacific',
    flag: '🇺🇳'
  },
  {
    service: 'WHO Emergency Response',
    number: '+41 22 791 2111',
    description: 'World Health Organization - Global Health Emergencies',
    flag: '🇺🇳'
  },
  {
    service: 'Red Cross International',
    number: '+41 22 734 6001',
    description: 'International Committee of the Red Cross',
    flag: '🏥'
  }
];

const EmergencyContacts = () => {
  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <section id="contacts" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-emergency sm:text-4xl mb-4">
            Emergency Contacts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Quick access to essential emergency services and international disaster response organizations. 
            Save these numbers and keep them accessible at all times.
          </p>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="disaster-card border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4 emergency-pulse">
                  <ExclamationTriangleIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">In Case of Emergency</h3>
                <p className="text-red-700 text-lg">
                  Dial the appropriate emergency number immediately. Stay calm and provide clear information about your location and the nature of the emergency.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* National Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {emergencyContacts.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`disaster-card h-full ${contact.bgColor} ${contact.borderColor} border-2 group`}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {contact.service}
                      </CardTitle>
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {contact.available}
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {contact.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <div className="flex-1 mb-4">
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {contact.number}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleCall(contact.number)}
                      className="w-full btn-emergency group-hover:shadow-lg transition-shadow"
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* International Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient-hero">
            International Emergency Organizations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {internationalContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="disaster-card h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{contact.flag}</div>
                    <CardTitle className="text-lg">{contact.service}</CardTitle>
                    <CardDescription>{contact.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center">
                      <div className="text-xl font-semibold mb-3">{contact.number}</div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleCall(contact.number)}
                      >
                        <GlobeAltIcon className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location-based Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Location-Based Emergency Services</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Our system can automatically detect your location and provide relevant local emergency contacts, 
                  evacuation routes, and nearby emergency facilities. Enable location services for enhanced emergency preparedness.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary">
                    Enable Location Services
                  </Button>
                  <Button variant="outline">
                    Find Local Emergency Centers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="disaster-card bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold mb-4 text-blue-900">Emergency Calling Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Stay calm and speak clearly</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Provide your exact location</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Describe the nature of emergency</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Don't hang up until told to do so</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Follow the operator's instructions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span>Keep emergency numbers easily accessible</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyContacts;