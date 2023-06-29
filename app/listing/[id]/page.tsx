import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getListingDetails } from "@/lib/listing/actions";
import Modal from "@/components/Modal";
import ListingActions from "@/components/ListingActions";
import RelatedListings from "@/components/RelatedListings";
import { ListingInterface } from "@/common.types";

const Listing = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getListingDetails(id)) as {
    listing?: ListingInterface;
  };

  if (!result?.listing)
    return <p className="no-result-text">Failed to fetch listing info</p>;

  const listingDetails = result?.listing;

  const renderLink = () => `/profile/${listingDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={listingDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {listingDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{listingDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${listingDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {listingDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === listingDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ListingActions listingId={listingDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${listingDetails?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {listingDetails?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={listingDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={listingDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedListings
        userId={listingDetails?.createdBy?.id}
        listingId={listingDetails?.id}
      />
    </Modal>
  );
};

export default Listing;
