import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="p-4">
      <div className="flex justify-between">
        <h1 className="hidden font-bold sm:inline-block">
          <Link href="/">AdvLogo</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Posts</Link>
            </li>
            <li>
              <Link href="/payments">Payments</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
