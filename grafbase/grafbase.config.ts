import { g, auth, config } from "@grafbase/sdk";

const listing = g
  .model("Listing", {
    title: g.string(),
    slug: g.string().unique(),
    content: g.string().optional(),
    publishedAt: g.datetime().optional(),
    comments: g
      .relation(() => comment)
      .optional()
      .list()
      .optional(),
    likes: g.int().default(0),
    tags: g.string().optional().list().length({ max: 5 }),
    createdBy: g.relation(() => user).optional(),
    category: g.string().search(),
  })
  .search();

const comment = g.model("Comment", {
  listing: g.relation(listing),
  body: g.string(),
  likes: g.int().default(0),
  author: g.relation(() => user).optional(),
});

const user = g.model("User", {
  name: g.string(),
  email: g.email().unique(),
  listings: g.relation(listing).optional().list(),
  comments: g.relation(comment).optional().list(),
});

export default config({
  schema: g,
});
