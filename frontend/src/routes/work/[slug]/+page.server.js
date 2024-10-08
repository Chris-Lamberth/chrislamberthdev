import { error } from "@sveltejs/kit";

import { getPost } from "$lib/sanity";

export const load = async ({ params }) => {
  const post = await getPost(params.slug);
  if (post) return post;

  throw error(404, "work not found");
};

