import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Coffee, Shield, AlertCircle } from "lucide-react";

interface ScheduleData {
  workStart: string;
  workEnd: string;
  breakStart: string;
  breakDuration: string;
  workGracePeriod: string;
  breakGracePeriod: string;
  remarks: string;
}

interface SchedulePreviewProps {
  scheduleData: ScheduleData;
}

export const SchedulePreview = ({ scheduleData }: SchedulePreviewProps) => {
  const calculateWorkHours = () => {
    const start = new Date(`2024-01-01T${scheduleData.workStart}`);
    const end = new Date(`2024-01-01T${scheduleData.workEnd}`);
    const breakDuration = parseInt(scheduleData.breakDuration) || 0;
    
    const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60) - breakDuration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const workStart = scheduleData.workStart;
    const workEnd = scheduleData.workEnd;
    
    if (currentTime >= workStart && currentTime <= workEnd) {
      return "bg-schedule-success text-white";
    }
    return "bg-schedule-primary text-white";
  };

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Schedule Preview</CardTitle>
            <CardDescription>Current schedule configuration summary</CardDescription>
          </div>
          <Badge className={getStatusColor()}>
            Active Schedule
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Work Hours Summary */}
        <div className="bg-schedule-primary-light/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-schedule-primary" />
            <h3 className="font-semibold text-schedule-primary">Work Hours</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Start:</span>
              <div className="font-mono font-semibold">{formatTime(scheduleData.workStart)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">End:</span>
              <div className="font-mono font-semibold">{formatTime(scheduleData.workEnd)}</div>
            </div>
          </div>
          <div className="pt-2 border-t border-schedule-primary/20">
            <span className="text-muted-foreground">Total Work Time:</span>
            <div className="font-semibold text-schedule-primary">{calculateWorkHours()}</div>
          </div>
        </div>

        {/* Break Summary */}
        <div className="bg-schedule-warning-light/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-schedule-warning" />
            <h3 className="font-semibold text-schedule-warning">Break Time</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Start:</span>
              <div className="font-mono font-semibold">{formatTime(scheduleData.breakStart)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <div className="font-semibold">{scheduleData.breakDuration} minutes</div>
            </div>
          </div>
        </div>

        {/* Grace Periods */}
        <div className="bg-schedule-success-light/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-schedule-success" />
            <h3 className="font-semibold text-schedule-success">Grace Periods</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Work Start:</span>
              <div className="font-semibold">{scheduleData.workGracePeriod} min</div>
            </div>
            <div>
              <span className="text-muted-foreground">Break Return:</span>
              <div className="font-semibold">{scheduleData.breakGracePeriod} min</div>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {scheduleData.remarks && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">Notes</h4>
                <p className="text-sm text-muted-foreground">{scheduleData.remarks}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};