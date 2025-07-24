import { useState } from "react"
import { ChevronDown, ChevronUp, Settings2, HelpCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ReportPreferences } from "../../pages/HomePage"

interface PreferencesPanelProps {
  preferences: ReportPreferences
  onChange: (preferences: ReportPreferences) => void
}

export function PreferencesPanel({ preferences, onChange }: PreferencesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const focusOptions = [
    { value: "General Overview", tooltip: "Broad coverage of the topic with balanced perspective" },
    { value: "Technical Details", tooltip: "In-depth technical analysis and specifications" },
    { value: "Market Impact", tooltip: "Focus on economic and business implications" },
    { value: "Ethical Implications", tooltip: "Emphasis on moral and societal considerations" },
    { value: "Expert Analysis", tooltip: "Professional opinions and expert commentary" }
  ]

  const toneOptions = [
    { value: "Neutral", tooltip: "Objective and balanced reporting style" },
    { value: "Analytical", tooltip: "Data-driven with critical examination" },
    { value: "Optimistic", tooltip: "Positive outlook and opportunities focus" },
    { value: "Critical", tooltip: "Questioning approach with potential concerns" },
    { value: "Conversational", tooltip: "Easy-to-read, accessible language style" }
  ]

  const depthLabels = {
    1: "Quick Summary",
    2: "Brief Report",
    3: "Balanced Report",
    4: "Detailed Analysis",
    5: "Deep Dive"
  }

  const depthTooltips = {
    1: "Brief overview with key points only",
    2: "Concise report with essential information",
    3: "Comprehensive coverage with good detail",
    4: "Thorough analysis with extensive information",
    5: "Complete deep-dive with all available insights"
  }

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-border/50 rounded-lg">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between h-auto p-0"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            <span className="font-medium">Customize Report</span>
            <div className="flex gap-1">
              <Badge variant="outline" className="text-xs">
                {preferences.focus}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {depthLabels[preferences.depth as keyof typeof depthLabels]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {preferences.tone}
              </Badge>
            </div>
          </div>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {isExpanded && (
          <div className="mt-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Focus */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Focus</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Choose the main perspective for your report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={preferences.focus}
                  onValueChange={(value) => onChange({ ...preferences, focus: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {focusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{option.value}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{option.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Depth */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">
                    Depth: {depthLabels[preferences.depth as keyof typeof depthLabels]}
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{depthTooltips[preferences.depth as keyof typeof depthTooltips]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="px-2">
                  <Slider
                    value={[preferences.depth]}
                    onValueChange={(value) => onChange({ ...preferences, depth: value[0] })}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Quick</span>
                    <span>Deep</span>
                  </div>
                </div>
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Tone</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Select the writing style for your report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={preferences.tone}
                  onValueChange={(value) => onChange({ ...preferences, tone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{option.value}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{option.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}