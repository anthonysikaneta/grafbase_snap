export const createListingMutation = `
	mutation CreateListing($input: ListingCreateInput!) {
		listingCreate(input: $input) {
			listing {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateListingMutation = `
	mutation UpdateListing($id: ID!, $input: ListingUpdateInput!) {
		listingUpdate(by: { id: $id }, input: $input) {
			listing {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteListingMutation = `
  mutation DeleteListing($id: ID!) {
    listingDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				bio
				id
			}
		}
	}
`;

export const listingsQuery = `
  query getListings($category: String, $endcursor: String) {
    listingSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getListingByIdQuery = `
  query GetListingById($id: ID!) {
    listing(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      bio
    }
  }
`;

export const getListingsOfUserQuery = `
  query getUserListings($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      bio
      avatarUrl
      listings(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;
