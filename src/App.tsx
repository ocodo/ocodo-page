import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { OcodoLinks } from "@/components/ocodo-links"
import { OcodoLinksProvider } from "@/contexts/ocodo-links-context"

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading title="ocodo.github.io" />
        <div className="gap-2">
          <Card>
            <CardHeader>Quick Access</CardHeader>
            <CardContent>
              <OcodoLinks folder="quick_access"/>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </ThemeProvider>
    </OcodoLinksProvider>
  )
}

export default App
