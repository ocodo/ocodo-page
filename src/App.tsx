import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { OcodoLinksProvider } from "@/contexts/ocodo-links-context"
import { TextClock } from "@/components/text-clock"
import { OcodoLinkFolders } from "@/components/ocodo-link-folders"

function App() {
  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Heading tinyChildren={
          <>
            <TextClock timeOnly={true} title='Bangkok' />
            <div>/</div>
            <TextClock timeZone="Europe/London" timeOnly={true} title='London' />
          </>
        } />
        <OcodoLinkFolders />
        <Toaster />
      </ThemeProvider>
    </OcodoLinksProvider>
  )
}

export default App
