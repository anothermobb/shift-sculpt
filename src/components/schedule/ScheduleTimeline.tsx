import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleData {
  workStart: string;
  workEnd: string;
  breakStart: string;
  breakDuration: string;
  workGracePeriod: string;
  breakGracePeriod: string;
  remarks: string;
}

interface ScheduleTimelineProps {
  scheduleData: ScheduleData;
}

export const ScheduleTimeline = ({ scheduleData }: ScheduleTimelineProps) => {
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const workStartMin = timeToMinutes(scheduleData.workStart);
  const workEndMin = timeToMinutes(scheduleData.workEnd);
  const breakStartMin = timeToMinutes(scheduleData.breakStart);
  const breakDuration = parseInt(scheduleData.breakDuration) || 0;
  const breakEndMin = breakStartMin + breakDuration;

  const totalWorkDay = workEndMin - workStartMin;
  const dayStartMin = Math.max(0, workStartMin - 60); // Start timeline 1 hour before work
  const dayEndMin = Math.min(1440, workEndMin + 60); // End timeline 1 hour after work
  const timelineSpan = dayEndMin - dayStartMin;

  const getPosition = (timeInMinutes: number): number => {
    return ((timeInMinutes - dayStartMin) / timelineSpan) * 100;
  };

  const getWidth = (duration: number): number => {
    return (duration / timelineSpan) * 100;
  };

  const timelineEvents = [
    {
      id: 'work-period-1',
      start: workStartMin,
      end: breakStartMin,
      label: 'Morning Work',
      color: 'bg-schedule-primary',
      textColor: 'text-white'
    },
    {
      id: 'break-period',
      start: breakStartMin,
      end: breakEndMin,
      label: 'Break',
      color: 'bg-schedule-warning',
      textColor: 'text-white'
    },
    {
      id: 'work-period-2',
      start: breakEndMin,
      end: workEndMin,
      label: 'Afternoon Work',
      color: 'bg-schedule-primary',
      textColor: 'text-white'
    }
  ];

  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return getPosition(currentMinutes);
  };

  const hourMarkers = [];
  for (let i = Math.ceil(dayStartMin / 60) * 60; i <= dayEndMin; i += 60) {
    if (i >= dayStartMin && i <= dayEndMin) {
      hourMarkers.push({
        time: minutesToTime(i),
        position: getPosition(i)
      });
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
          Daily Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeline Container */}
        <div className="relative">
          {/* Hour markers */}
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            {hourMarkers.map((marker, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-px h-2 bg-border"></div>
                <span>{marker.time}</span>
              </div>
            ))}
          </div>

          {/* Main timeline bar */}
          <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
            {/* Work and break periods */}
            {timelineEvents.map((event) => (
              <div
                key={event.id}
                className={`absolute h-full ${event.color} flex items-center justify-center text-xs font-medium ${event.textColor}`}
                style={{
                  left: `${getPosition(event.start)}%`,
                  width: `${getWidth(event.end - event.start)}%`
                }}
              >
                {getWidth(event.end - event.start) > 15 && event.label}
              </div>
            ))}

            {/* Current time indicator */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{
                left: `${getCurrentTimePosition()}%`
              }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Current time label */}
          <div
            className="absolute -bottom-6 transform -translate-x-1/2"
            style={{
              left: `${getCurrentTimePosition()}%`
            }}
          >
            <Badge variant="destructive" className="text-xs px-2 py-0.5">
              Now
            </Badge>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-schedule-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Work Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-schedule-warning rounded"></div>
            <span className="text-sm text-muted-foreground">Break Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Current Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};