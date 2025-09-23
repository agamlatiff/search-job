import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href={"/"} className="flex items-center gap-2.5">
        <Image src={'/logo.png'} alt="Logo Search Job" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Search<span className="text-primary">Job</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;
