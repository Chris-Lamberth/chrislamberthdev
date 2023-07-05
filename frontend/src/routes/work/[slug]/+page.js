import { sanityClient } from '$lib/sanity';


export async function load({ page, fetch }) {
  const { slug } = page.params;
  
  const query = `*[_type == "post"] { _id, title, _createdAt, mainImage, slug, description }`;

  const post = await sanityClient.fetch(query, { slug });

  if (post) {
    return { props: { post } };
  } else {
    return { status: 404 };
  }
}
