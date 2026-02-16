import { Linkedin, Github, Mail,} from "lucide-react";

function Footer () {
    return (
        <footer className="bg-[#EFEEEB] px-4 py-10 gap-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:flex-row gap-4">
            <span className="font-medium">Get in touch</span>
            <div className="flex gap-4">
            <a href="#">
            <Linkedin size={24}/>
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#">
            <Github size={24}/>
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#">
            <Mail size={24}/>
            <span className="sr-only">Email</span>
          </a>
            </div>
            </div>
            <a href="/" className="font-medium underline">
        Home page
      </a>
        </footer>
    )
}

export default Footer;