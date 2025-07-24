import { useState } from "react"
import { Card } from "../ui/card"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface ReportContentProps {
  content: string
}

export function ReportContent({ content }: ReportContentProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Convert markdown-like content to JSX
  const formatContent = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">{line.slice(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-medium mt-4 mb-2">{line.slice(4)}</h3>
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return <p key={index} className="mb-4 leading-relaxed">{line}</p>
    })
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight - element.clientHeight
    const progress = (scrollTop / scrollHeight) * 100
    setReadingProgress(Math.min(progress, 100))
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // Text-to-speech functionality would be implemented here
    console.log(isPlaying ? "Stopping audio" : "Starting audio")
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
      {/* Reading Progress */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Reading Progress</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              className="gap-2"
            >
              {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isPlaying ? "Stop" : "Listen"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {Math.round(readingProgress)}%
            </span>
          </div>
        </div>
        <Progress value={readingProgress} className="h-1" />
      </div>

      {/* Content */}
      <div
        className="p-8 max-h-[70vh] overflow-y-auto prose prose-slate dark:prose-invert max-w-none"
        onScroll={handleScroll}
      >
        <div className="space-y-4">
          {formatContent(content)}
        </div>
      </div>
    </Card>
  )
}