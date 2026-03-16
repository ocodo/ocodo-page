import { Menu } from 'lucide-react'
import { ThemeSwitch } from '@/components/theme-switch'
import { useOcodoLinks } from '@/contexts/ocodo-links-context'

interface HeadingProps {
  title?: string
  tinyChildren?: React.ReactNode
}

export function Heading(props: HeadingProps) {
  const { title, tinyChildren } = props
  const { toggleSelectFolders } = useOcodoLinks();

  return (
    <div className='fixed top-0 left-0 right-0 z-20'>
      <div className='relative'>
        {tinyChildren && (
          <div className="absolute flex flex-row gap-1 justify-end items-center p-2 px-3 rounded-2xl bg-background/50
        text-foreground/30 top-1 right-13 w-fit text-xxs md:text-xs">
            {tinyChildren}
          </div>
        )}
        <header className="flex items-center justify-between p-2">
          <div className="p-2 bg-background/50 hover:bg-accent cursor-pointer rounded-lg">
            <Menu className="h-4 w-4" onClick={toggleSelectFolders} />
          </div>
          {title && (<div className="font-black tracking-tighter">{title}</div>)}
          <div className="bg-background/50 rounded-full pl-1">
          <ThemeSwitch className="mr-2" />
          </div>
        </header>
      </div>
    </div>
  )
}
