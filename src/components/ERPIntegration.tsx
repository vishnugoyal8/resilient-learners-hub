import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  ArrowPathIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  CogIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const integrationFeatures = [
  {
    icon: UserGroupIcon,
    title: 'Student Data Synchronization',
    description: 'Automatically sync student profiles, attendance records, and academic information with your existing school ERP system.',
    benefits: ['Real-time data updates', 'Automated enrollment', 'Grade integration']
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Tracking & Analytics',
    description: 'Comprehensive analytics dashboard showing student progress, completion rates, and performance metrics.',
    benefits: ['Detailed progress reports', 'Performance analytics', 'Custom dashboards']
  },
  {
    icon: DocumentCheckIcon,
    title: 'Assessment & Certification',
    description: 'Seamlessly integrate disaster preparedness assessments and certificates into academic records.',
    benefits: ['Automated grading', 'Digital certificates', 'Transcript integration']
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Cloud-Based Integration',
    description: 'Secure cloud infrastructure ensures reliable data synchronization and backup across all systems.',
    benefits: ['99.9% uptime', 'Data backup', 'Scalable architecture']
  }
];

const supportedERP = [
  {
    name: 'PowerSchool',
    logo: '🏫',
    description: 'Complete integration with PowerSchool SIS',
    features: ['Student records', 'Gradebook sync', 'Attendance tracking']
  },
  {
    name: 'Infinite Campus',
    logo: '🎓',
    description: 'Seamless connection with Infinite Campus platform',
    features: ['Data synchronization', 'Report generation', 'Parent portal']
  },
  {
    name: 'Skyward',
    logo: '☁️',
    description: 'Full compatibility with Skyward ERP systems',
    features: ['Student management', 'Academic records', 'Communication tools']
  },
  {
    name: 'Custom ERP',
    logo: '⚙️',
    description: 'API integration for custom school management systems',
    features: ['REST API', 'Webhook support', 'Custom mapping']
  }
];

const ERPIntegration = () => {
  return (
    <section id="erp-integration" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            School ERP Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Seamlessly integrate disaster preparedness education into your existing school management system. 
            Sync student data, track progress, and manage assessments all in one unified platform.
          </p>
        </motion.div>

        {/* Integration Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <ArrowPathIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Unified Education Management</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Our disaster preparedness education system integrates seamlessly with existing school ERP platforms, 
                  creating a unified experience for administrators, teachers, and students while maintaining data consistency and security.
                </p>
                
                {/* Integration Flow Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">School ERP System</h4>
                    <p className="text-sm text-muted-foreground text-center">Your existing student information system</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <ArrowPathIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Secure Integration</h4>
                    <p className="text-sm text-muted-foreground text-center">Real-time data synchronization</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">DPRES Platform</h4>
                    <p className="text-sm text-muted-foreground text-center">Enhanced disaster preparedness education</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Integration Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {integrationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="disaster-card h-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <h5 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Key Benefits
                    </h5>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Supported ERP Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Supported ERP Systems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedERP.map((erp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="disaster-card h-full text-center">
                  <CardHeader>
                    <div className="text-4xl mb-3">{erp.logo}</div>
                    <CardTitle className="text-lg">{erp.name}</CardTitle>
                    <CardDescription>{erp.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {erp.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="mr-1 mb-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Implementation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-center mb-8">Implementation Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Assessment</h4>
                  <p className="text-sm text-muted-foreground">Evaluate your current ERP system and integration requirements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Configuration</h4>
                  <p className="text-sm text-muted-foreground">Set up API connections and data mapping between systems</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Testing</h4>
                  <p className="text-sm text-muted-foreground">Thorough testing to ensure data integrity and system reliability</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    4
                  </div>
                  <h4 className="font-semibold mb-2">Deployment</h4>
                  <p className="text-sm text-muted-foreground">Full deployment with ongoing support and monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="disaster-card">
            <CardContent className="pt-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-6">
                  <CogIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Integrate?</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Our technical team will work with your IT department to ensure a smooth integration process. 
                  Get started with a free consultation and technical assessment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary text-lg px-8 py-3">
                    Schedule Integration Call
                  </Button>
                  <Button variant="outline" className="text-lg px-8 py-3">
                    View Technical Documentation
                  </Button>
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>✓ Free consultation  ✓ Custom integration  ✓ Ongoing support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ERPIntegration;