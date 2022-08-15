import Link from "next/link";
import { urlFor } from "../sanity";

const Freelancer_Details = ({ data }: any) => {
  return (
    <div className="flex mx-5 justify-center items-center flex-col">
      <div>
        <Link href={`/freelancer/${data?.walletAddress}`}>
        <img
          src={urlFor(data?.image)}
          alt=""
          className="w-60 h-60 rounded-t-lg object-cover"
          />
          </Link>
      </div>
      <div className="bg-slate-400 w-full flex justify-center  pt-6 ">{data?.name}</div>
    </div>
  );
};

export default Freelancer_Details;
