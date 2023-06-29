import {
  createUserMutation,
  getListingsOfUserQuery,
  getUserQuery,
} from "@/graphql";
import { apiKey, apiUrl } from "../config";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserListings = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getListingsOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
