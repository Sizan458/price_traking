import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  
  { src: '/assets/icons/black-heart.svg', alt: 'heart',link:"/favorite"  },
  { src: '/assets/icons/user.svg', alt: 'user' , link:'/user'},
]
const NavBar = () => {
  return (
   
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image 
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />

          <p className="nav-logo">
            Price<span className='text-primary'>Wise</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
           <Link  href={icon.link}  key={icon.alt}>
            <Image 
            
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
           </Link>
          ))}
        </div>
      </nav>
    </header>
  
)
  
}

export default NavBar
