import Link from "next/link";

import { getUserListings } from "@/lib/actions";
import { ListingInterface, UserProfile } from "@/common.types";
import Image from "next/image";

type Props = {
  userId: string;
  listingId: string;
};

const RelatedListings = async ({ userId, listingId }: Props) => {
  const result = (await getUserListings(userId)) as { user?: UserProfile };

  const filteredListings = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ListingInterface }) => node?.id !== listingId
  );

  if (filteredListings?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredListings?.map(({ node }: { node: ListingInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedListings;
