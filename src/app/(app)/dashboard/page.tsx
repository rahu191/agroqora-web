'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Thermometer, Droplets, Zap, Wind } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Metric = {
  name: string;
  value: number;
  unit: string;
  Icon: React.ElementType;
  progress: number;
};

const initialMetrics: Metric[] = [
  { name: 'Soil Moisture', value: 45, unit: '%', Icon: Droplets, progress: 45 },
  { name: 'Temperature', value: 22, unit: '°C', Icon: Thermometer, progress: 60 },
  { name: 'Soil pH', value: 6.8, unit: '', Icon: Activity, progress: 72 },
  { name: 'Sunlight', value: 8, unit: 'hrs', Icon: Zap, progress: 66 },
];

const alerts = [
  { id: 1, message: 'High probability of Aphids in Sector B2.', severity: 'high' },
  { id: 2, message: 'Soil moisture low in Sector A1.', severity: 'medium' },
  { id: 3, message: 'Nutrient imbalance detected for Tomato crop.', severity: 'medium' },
  { id: 4, message: 'Forecast predicts heavy rain in 48 hours.', severity: 'low' },
];

const SeverityBadge = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary" className="bg-accent text-accent-foreground">Medium</Badge>;
    default:
      return <Badge variant="outline">Low</Badge>;
  }
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((m) => {
          const change = (Math.random() - 0.5) * (m.unit === '%' ? 2 : 0.2);
          let newValue = parseFloat((m.value + change).toFixed(1));
          if (newValue < 0) newValue = 0;
          
          return {
            ...m,
            value: newValue,
            progress: m.name === 'Soil Moisture' ? newValue : m.progress,
          };
        })
      );
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Real-time overview of your farm's health and conditions."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <metric.Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value}
                {metric.unit}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.name === 'Soil Moisture'
                  ? 'Optimal range: 40-60%'
                  : metric.name === 'Temperature'
                  ? '+2.1% from yesterday'
                  : metric.name === 'Soil pH'
                  ? 'Slightly Acidic'
                  : 'Avg. daily exposure'}
              </p>
              <Progress value={metric.progress} className="mt-4 h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Critical Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {alerts.map((alert) => (
                <li key={alert.id} className="flex items-center justify-between">
                  <p className="text-sm">{alert.message}</p>
                  <SeverityBadge severity={alert.severity} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              <span>Weather Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around text-center">
            <div>
              <p className="font-bold text-lg">Today</p>
              <p>☀️ 24°C</p>
              <p className="text-xs text-muted-foreground">Sunny</p>
            </div>
            <div>
              <p className="font-bold text-lg">Tomorrow</p>
              <p>☁️ 22°C</p>
              <p className="text-xs text-muted-foreground">Cloudy</p>
            </div>
            <div>
              <p className="font-bold text-lg">Fri</p>
              <p>🌧️ 20°C</p>
              <p className="text-xs text-muted-foreground">Rain</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
