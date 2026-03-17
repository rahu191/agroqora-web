import { PageHeader } from '@/components/page-header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bot, Droplets, Sun } from 'lucide-react';

export default function AutomationPage() {
  return (
    <>
      <PageHeader
        title="Automation Controls"
        description="Manage and monitor your farm's automated systems."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="text-blue-500" />
              <span>Smart Irrigation</span>
            </CardTitle>
            <CardDescription>Automatically waters crops based on soil moisture levels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="irrigation-switch" className="font-medium">
                System Active
              </Label>
              <Switch id="irrigation-switch" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Status: <span className="text-primary font-semibold">Idle</span>. Last run: 3 hours
              ago.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-primary" />
              <span>Fertilizer/Pesticide Sprayer</span>
            </CardTitle>
            <CardDescription>Activates IoT sprayers based on AI analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="sprayer-switch" className="font-medium">
                System Active
              </Label>
              <Switch id="sprayer-switch" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Status: <span className="font-semibold">Inactive</span>. Next scheduled check: 10:00
              PM.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="text-accent" />
              <span>Climate Control</span>
            </CardTitle>
            <CardDescription>Manages greenhouse temperature and humidity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="climate-switch" className="font-medium">
                System Active
              </Label>
              <Switch id="climate-switch" defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Status: <span className="text-primary font-semibold">Maintaining 23°C</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
