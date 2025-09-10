import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ExclamationTriangleIcon, 
  CloudIcon, 
  SunIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  region: string;
}

const mockAlerts: WeatherAlert[] = [
  {
    id: '1',
    title: 'Severe Thunderstorm Warning',
    description: 'A severe thunderstorm is expected in your area within the next 2 hours. Please stay indoors and avoid travel if possible.',
    severity: 'critical',
    timestamp: new Date().toISOString(),
    region: 'north'
  },
  {
    id: '2',
    title: 'Flood Watch',
    description: 'Heavy rains may cause flooding in low-lying areas. Be prepared to evacuate if necessary.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    region: 'north'
  },
  {
    id: '3',
    title: 'Heat Advisory',
    description: 'Temperatures are expected to exceed 40°C. Stay hydrated and avoid outdoor activities during peak hours.',
    severity: 'info',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    region: 'north'
  }
];

const regions = [
  { value: 'north', label: 'North Region' },
  { value: 'south', label: 'South Region' },
  { value: 'east', label: 'East Region' },
  { value: 'west', label: 'West Region' },
  { value: 'central', label: 'Central Region' }
];

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'alert-critical border-red-200 emergency-pulse';
    case 'warning':
      return 'alert-warning border-amber-200';
    case 'info':
      return 'alert-info border-blue-200';
    default:
      return 'alert-info border-blue-200';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />;
    case 'warning':
      return <CloudIcon className="h-6 w-6 text-amber-600" />;
    case 'info':
      return <SunIcon className="h-6 w-6 text-blue-600" />;
    default:
      return <CloudIcon className="h-6 w-6 text-blue-600" />;
  }
};

const WeatherAlerts = () => {
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [alerts, setAlerts] = useState<WeatherAlert[]>(mockAlerts);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Note: In a real app, you'd use environment variables for the API key
        // For demo purposes, we'll use mock data but show the API structure
        
        // const response = await axios.get(
        //   `https://api.openweathermap.org/data/2.5/weather?q=${selectedRegion}&appid=YOUR_API_KEY&units=metric`
        // );
        // setWeatherData(response.data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedRegion]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="alerts" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Live Weather Alerts
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with real-time weather alerts and emergency notifications for your region.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="disaster-card mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Select Your Region</CardTitle>
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`${getSeverityStyles(alert.severity)} border-l-4`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getSeverityIcon(alert.severity)}
                          <div>
                            <CardTitle className="text-lg font-semibold">
                              {alert.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {formatTimestamp(alert.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-base">
                        {alert.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Emergency Alert System
              </h3>
              <p className="text-blue-700 text-sm">
                Our system integrates with national weather services and emergency management agencies 
                to provide real-time alerts directly to your device. Stay safe and stay informed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherAlerts;