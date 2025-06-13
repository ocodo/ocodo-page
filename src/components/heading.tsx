import { Menu, Moon, Sun } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '@/contexts/theme-context'
import { OcodoLogo } from '@/components/ocodo-logo'

interface HeadingProps {
  title?: string
  tinyChildren?: React.ReactNode
}

function Heading(props: HeadingProps) {
  const { title, tinyChildren } = props
  const { toggleTheme, theme } = useContext(ThemeContext)

  useEffect(() => (
    console.log(`Theme: ${theme}`)
  ), [theme])

  return (
    <>
      {tinyChildren && (
        <div className="flex justify-end items-center w-full bg-background text-foreground/30">
          {tinyChildren}
        </div>
      )}
      <header className="flex items-center justify-between p-4">
        <div className="p-2 hover:bg-accent cursor-pointer rounded-lg">
          <Menu className="h-6 w-6" />
        </div>
    {
      title
      ? (<div className="font-black tracking-tighter text-2xl">{title}</div>)
      : (<OcodoLogo width={180} height={64}/>)
    }
    <div
      className="p-2 hover:bg-accent cursor-pointer rounded-lg"
      onClick={() => toggleTheme()}
    >
      {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
    </div>
    </header>
    </>
  )
}

export { Heading }
