import { Menu, Moon, Sun } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '@/contexts/theme-context'

interface HeadingProps {
  title: string
}

function Heading(props: HeadingProps) {
  const { title } = props
  const { toggleTheme, theme } = useContext(ThemeContext)

  useEffect(() => (
    console.log(`Theme: ${theme}`)
  ), [theme])

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="p-2 hover:bg-accent cursor-pointer rounded-lg">
        <Menu className="h-6 w-6" />
      </div>
      <div className="font-black tracking-tighter text-2xl">{title}</div>
      <div
        className="p-2 hover:bg-accent cursor-pointer rounded-lg"
        onClick={() => toggleTheme()}
      >
        {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      </div>
    </header>
  )
}

export { Heading }
