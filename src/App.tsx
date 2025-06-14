import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card"
import { OcodoLinks } from "@/components/ocodo-links"
import { OcodoLinksProvider } from "@/contexts/ocodo-links-context"
import { TextClock } from "@/components/text-clock"

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading tinyChildren={<TextClock />}/>
        <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-3">
          <Card>
            <CardContent>
              <OcodoLinks folder="quick-access"/>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <OcodoLinks folder="hub-services"/>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <OcodoLinks folder="frequent"/>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </ThemeProvider>
    </OcodoLinksProvider>
  )
}

export default App
