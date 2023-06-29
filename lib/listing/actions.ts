import { GraphQLClient } from "graphql-request";

import {
  createListingMutation,
  deleteListingMutation,
  updateListingMutation,
  getListingByIdQuery,
  listingsQuery,
} from "@/graphql";
import { ListingForm } from "@/common.types";
import { apiKey, apiUrl } from "../config";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export const fetchAllListings = (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(listingsQuery, { category, endcursor });
};

export const createNewListing = async (
  form: ListingForm,
  creatorId: string,
  token: string
) => {
  // const imageUrl = await uploadImage(form.image);

  // if (imageUrl.url) {
  //   client.setHeader("Authorization", `Bearer ${token}`);

  //   const variables = {
  //     input: {
  //       ...form,
  //       image: imageUrl.url,
  //       createdBy: {
  //         link: creatorId,
  //       },
  //     },
  //   };

  // }
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(createListingMutation, {
    input: {
      ...form,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      tags: ["bae", "nice", "central"],
      createdBy: {
        link: creatorId,
      },
    },
  });
};

export const updateListing = async (
  form: ListingForm,
  listingId: string,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    // const imageUrl = await uploadImage(form.image);
    const imageUrl = {
      url: "https://images.unsplash.com/photo-1556910638-6cdac31d44dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vZGVybiUyMGhvbWUlMjBpbnRlcmlvcnN8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=800&q=60",
    };

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: listingId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateListingMutation, variables);
};

export const deleteListing = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteListingMutation, { id });
};

export const getListingDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getListingByIdQuery, { id });
};
