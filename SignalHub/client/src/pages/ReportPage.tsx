import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Share2, Download, Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ReportContent } from "../components/report/ReportContent"
import { NerdStats } from "../components/report/NerdStats"
import { RelatedTopics } from "../components/report/RelatedTopics"
import { getReport } from "../api/reports"
import { useToast } from "../hooks/useToast"

export interface Report {
  id: string
  topic: string
  content: string
  preferences: {
    focus: string
    depth: number
    tone: string
  }
  stats: {
    searchQueries: string[]
    sourcesAnalyzed: number
    sourcesSelected: number
    processingTime: number
    generatedAt: string
  }
  sources: Array<{
    title: string
    url: string
    domain: string
  }>
  relatedTopics: string[]
}

export function ReportPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return
      
      try {
        console.log("Fetching report with ID:", id)
        const reportData = await getReport(id)
        setReport(reportData)
      } catch (error) {
        console.error("Error fetching report:", error)
        toast({
          title: "Error Loading Report",
          description: error instanceof Error ? error.message : "Failed to load report",
          variant: "destructive"
        })
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id, navigate, toast])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link Copied",
      description: "Report link copied to clipboard"
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Report not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowStats(!showStats)}
            className="gap-2"
          >
            <MoreHorizontal className="h-4 w-4" />
            Stats
          </Button>
        </div>
      </div>

      {/* Report Header */}
      <Card className="p-6 mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {report.topic}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{report.preferences.focus}</Badge>
            <Badge variant="secondary">Depth: {report.preferences.depth}/5</Badge>
            <Badge variant="secondary">{report.preferences.tone}</Badge>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Generated on {new Date(report.stats.generatedAt).toLocaleDateString()} • 
            {report.stats.sourcesSelected} sources analyzed
          </p>
        </div>
      </Card>

      {/* Nerd Stats */}
      {showStats && (
        <div className="mb-8">
          <NerdStats stats={report.stats} sources={report.sources} />
        </div>
      )}

      {/* Report Content */}
      <div className="mb-8">
        <ReportContent content={report.content} />
      </div>

      {/* Related Topics */}
      <RelatedTopics 
        topics={report.relatedTopics}
        onTopicSelect={(topic) => {
          console.log("Selected related topic:", topic)
          navigate("/", { state: { selectedTopic: topic } })
        }}
      />
    </div>
  )
}