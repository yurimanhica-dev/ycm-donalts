import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumpionMethodProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumpionMethod = ({
  slug,
  imageUrl,
  imageAlt,
  buttonText,
  option,
}: ConsumpionMethodProps) => {
  return (
    <>
      <div className="border border-gray-300 rounded-2xl w-full h-full">
        <div className="flex flex-col items-center justify-center mt-8 px-4 text-center">
          <Image src={imageUrl} alt={imageAlt} width={75} height={80} />
          <Link
            className="text-xs py-1.5 bg-zinc-200 rounded-full font-semibold mt-8 hover:bg-red-500 hover:text-white cursor-pointer w-full"
            href={`/${slug}/menu?consumptionMethod=${option}`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConsumpionMethod;
