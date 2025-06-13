import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card"
import { OcodoLinks } from "@/components/ocodo-links"
import { OcodoLinksProvider } from "@/contexts/ocodo-links-context"

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading title="ocodo.github.io" />
        <div className="pt-2 gap-2 grid grid-cols-1 md:grid-cols-3">
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
