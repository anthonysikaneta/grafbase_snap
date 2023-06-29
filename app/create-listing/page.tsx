import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
import ListingForm from "@/components/ListingForm";

const CreateListing = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Listing</h3>

      <ListingForm type="create" session={session} />
    </Modal>
  );
};

export default CreateListing;
