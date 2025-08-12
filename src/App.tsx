import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card"
import { OcodoLinks } from "@/components/ocodo-links"
import { OcodoLinksProvider } from "@/contexts/ocodo-links-context"
import { TextClock } from "@/components/text-clock"

const folders = [
  "quick-access",
  "hub-services",
  "frequent",
  "interesting",
  "misc",
  "pinned-repos",
  "font-building",
  "ai",
]

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading tinyChildren={
          <>
            <TextClock timeOnly={true} title='Bangkok' />
            <div>/</div>
            <TextClock timeZone="Europe/London" timeOnly={true} title='London'/>
            <div>/</div>
            <TextClock timeZone="Europe/Athens" timeOnly={true} title='Athens'/>
          </>
        } />
        <div className="mb-4 px-4 gap-4 grid grid-cols-1 md:grid-cols-3">
          {folders.map((folder, index) => (
            <Card className="transition-transform duration-200 shadow-xl" key={index}>
              <CardContent>
                <OcodoLinks folder={folder} />
              </CardContent>
            </Card>
          ))}
        </div>
        <Toaster />
      </ThemeProvider>
    </OcodoLinksProvider>
  )
}

export default App
