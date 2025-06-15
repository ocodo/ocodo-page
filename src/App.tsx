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
]

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading tinyChildren={<TextClock />} />
        <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-3">
          {folders.map((folder) => (
            <Card>
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
