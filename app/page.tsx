import { ListingInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ListingCard from "@/components/ListingCard";
import { fetchAllListings } from "@/lib/actions";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type ListingSearch = {
  listingSearch: {
    edges: { node: ListingInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllListings(category, endcursor)) as ListingSearch;

  const projectsToDisplay = data?.listingSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No listings found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ListingInterface }) => (
          <ListingCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={data?.listingSearch?.pageInfo?.startCursor}
        endCursor={data?.listingSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.listingSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.listingSearch?.pageInfo.hasNextPage}
      />
    </section>
  );
};

export default Home;
