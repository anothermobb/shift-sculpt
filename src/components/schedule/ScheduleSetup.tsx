import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Coffee, Shield, Save, RotateCcw, Edit, Eye } from "lucide-react";
import { SchedulePreview } from "./SchedulePreview";
import { ScheduleTimeline } from "./ScheduleTimeline";

interface ScheduleData {
  workStart: string;
  workEnd: string;
  breakStart: string;
  breakDuration: string;
  workGracePeriod: string;
  breakGracePeriod: string;
  remarks: string;
}

export const ScheduleSetup = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    workStart: "08:00",
    workEnd: "17:00",
    breakStart: "12:00",
    breakDuration: "60",
    workGracePeriod: "5",
    breakGracePeriod: "5",
    remarks: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const updateState = (field: keyof ScheduleData, value: string) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving schedule:", scheduleData);
    setIsEditing(false);
    // Add your save logic here
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const handleReset = () => {
    setScheduleData({
      workStart: "08:00",
      workEnd: "17:00",
      breakStart: "12:00",
      breakDuration: "60",
      workGracePeriod: "5",
      breakGracePeriod: "5",
      remarks: ""
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Schedule Management</h1>
                <p className="text-muted-foreground">Configure work hours, breaks, and grace periods</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {isEditing ? "Editing Mode" : "View Mode"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="shadow-card bg-gradient-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-schedule-primary-light">
                      <Clock className="h-5 w-5 text-schedule-primary" />
                    </div>
                    <div>
                      <CardTitle>Work Hours Configuration</CardTitle>
                      <CardDescription>Set primary work schedule and timing</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={handleEdit} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Work Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workStart" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-schedule-primary" />
                      Work Start Time
                    </Label>
                    <Input
                      id="workStart"
                      type="time"
                      value={scheduleData.workStart}
                      onChange={(e) => updateState("workStart", e.target.value)}
                      disabled={!isEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workEnd" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-schedule-primary" />
                      Work End Time
                    </Label>
                    <Input
                      id="workEnd"
                      type="time"
                      value={scheduleData.workEnd}
                      onChange={(e) => updateState("workEnd", e.target.value)}
                      disabled={!isEditing}
                      className="font-mono"
                    />
                  </div>
                </div>

                <Separator />

                {/* Break Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-schedule-warning" />
                    <h3 className="text-lg font-semibold">Break Configuration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="breakStart" className="text-sm font-medium">
                        Break Start Time
                      </Label>
                      <Input
                        id="breakStart"
                        type="time"
                        value={scheduleData.breakStart}
                        onChange={(e) => updateState("breakStart", e.target.value)}
                        disabled={!isEditing}
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakDuration" className="text-sm font-medium">
                        Break Duration (minutes)
                      </Label>
                      <Input
                        id="breakDuration"
                        type="number"
                        value={scheduleData.breakDuration}
                        onChange={(e) => updateState("breakDuration", e.target.value)}
                        disabled={!isEditing}
                        min="0"
                        placeholder="60"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Grace Periods */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-schedule-success" />
                    <h3 className="text-lg font-semibold">Grace Periods</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workGracePeriod" className="text-sm font-medium">
                        Work Start Grace Period (minutes)
                      </Label>
                      <Input
                        id="workGracePeriod"
                        type="number"
                        value={scheduleData.workGracePeriod}
                        onChange={(e) => updateState("workGracePeriod", e.target.value)}
                        disabled={!isEditing}
                        min="0"
                        placeholder="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakGracePeriod" className="text-sm font-medium">
                        Break Grace Period (minutes)
                      </Label>
                      <Input
                        id="breakGracePeriod"
                        type="number"
                        value={scheduleData.breakGracePeriod}
                        onChange={(e) => updateState("breakGracePeriod", e.target.value)}
                        disabled={!isEditing}
                        min="0"
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remarks */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Additional Notes</CardTitle>
                <CardDescription>Add any special instructions or remarks for this schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter any additional remarks or special instructions..."
                  value={scheduleData.remarks}
                  onChange={(e) => updateState("remarks", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <SchedulePreview scheduleData={scheduleData} />
            <ScheduleTimeline scheduleData={scheduleData} />
            
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!isEditing}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};