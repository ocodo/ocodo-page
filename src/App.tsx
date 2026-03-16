import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { OcodoLinksProvider, useOcodoLinks } from "@/contexts/ocodo-links-context"
import { TextClock } from "@/components/text-clock"
import { OcodoLinkFolders } from "@/components/ocodo-link-folders"
import { OcodoPageSettings } from "@/components/ocodo-page-settings"
import { CircleX } from "lucide-react"

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
  const { selectFolders, toggleSelectFolders } = useOcodoLinks();
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
        <div className="fixed z-10 w-screen h-screen backdrop-blur-xs bg-background/80">
        </div>
        <div className={`
            fixed
            z-100
            w-screen
            top-0
            xl:left-1/6
            xl:w-2/3
            xl:h-1/2
          `}>
          <div className="relative">
            <CircleX
              onClick={toggleSelectFolders}
              className={`
                absolute
                top-0 right-0
                m-2 p-0.5
                w-8 h-8
                cursor-pointer
                text-background
                hover:bg-foreground/80
                bg-foreground/50
                transition-colors
                duration-300
                rounded-full
              `}
              style={{ strokeWidth: 1 }}
            />
            <OcodoPageSettings />
          </div>
        </div>
      </>
    }
    <OcodoLinkFolders />

  </>

}

export default App
