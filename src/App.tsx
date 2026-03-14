import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { OcodoLinksProvider, useOcodoLinks } from "@/contexts/ocodo-links-context"
import { TextClock } from "@/components/text-clock"
import { OcodoLinkFolders } from "@/components/ocodo-link-folders"
import { OcodoSelectFromAvailableFolders } from "@/components/ocodo-select-from-available-folders"

function App() {


  return (
    <OcodoLinksProvider>
      <ThemeProvider>
        <Main />
        <Toaster />
      </ThemeProvider>
    </OcodoLinksProvider>
  )
}

const Main = () => {
  const { selectFolders } = useOcodoLinks();
  return <>
    <Heading tinyChildren={
      <>
        <TextClock timeOnly={true} title='Bangkok' />
        <div>/</div>
        <TextClock timeZone="Europe/London" timeOnly={true} title='London' />
      </>
    } />
    {
      selectFolders &&
      <>
        <div className="fixed z-10 w-screen h-screen backdrop-blur-lg">
        </div>
        <div className="fixed z-100 top-0 left-1/4 w-1/2 h-1/2">
          <OcodoSelectFromAvailableFolders />
        </div>
      </>
    }
    <OcodoLinkFolders />

  </>

}

export default App
