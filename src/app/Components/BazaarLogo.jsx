import Image from "next/image";
import Link from "next/link";

const BazaarLogo = ({ width = 150, height = 50 }) => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Bazaar Logo"
        width={width}
        height={height}
        priority // quick loading logo on Navbar
        className="object-contain"
      />
    </Link>
  );
};

export default BazaarLogo;