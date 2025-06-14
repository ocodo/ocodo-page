import { Menu, Moon, Sun } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '@/contexts/theme-context'

interface HeadingProps {
  title?: string
  tinyChildren?: React.ReactNode
}

export function Heading(props: HeadingProps) {
  const { title, tinyChildren } = props
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <div className='relative'>
      {tinyChildren && (
        <div className="absolute flex justify-end items-center w-full bg-transparent
         text-foreground/30 top-1 right-20">
          {tinyChildren}
        </div>
      )}
      <header className="flex items-center justify-between p-2">
        <div className="p-2 hover:bg-accent cursor-pointer rounded-lg">
          <Menu className="h-4 w-4" />
        </div>
        {title && (<div className="font-black tracking-tighter">{title}</div>)}
        <div
          className="p-2 hover:bg-accent cursor-pointer rounded-lg"
          onClick={() => toggleTheme()}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </div>
      </header>
    </div>
  )
}
