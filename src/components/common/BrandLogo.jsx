import Image from "next/image";
import Link from "next/link";

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-[100px] h-[35px] md:w-[150px] md:h-[50px]">
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