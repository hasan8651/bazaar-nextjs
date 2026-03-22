import Image from "next/image";
import Link from "next/link";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-25 h-9 md:w-38 md:h-13">
        <Image
          src="/logo.png"
          alt="Brand Logo"
          fill 
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default BrandLogo;