import { redirect } from "next/navigation";

import Modal from "@/components/Modal";
import ListingForm from "@/components/ListingForm";
import { getCurrentUser } from "@/lib/session";
import { getListingDetails } from "@/lib/listing/actions";
import { ListingInterface } from "@/common.types";

const EditListing = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getListingDetails(id)) as {
    listing?: ListingInterface;
  };

  if (!result?.listing)
    return <p className="no-result-text">Failed to fetch listing info</p>;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Listing</h3>

      <ListingForm type="edit" session={session} listing={result?.listing} />
    </Modal>
  );
};

export default EditListing;
