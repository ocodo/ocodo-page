import { Heading } from "@/components/heading"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider>
      <div>
        <Heading title="ocodo.github.io" />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
