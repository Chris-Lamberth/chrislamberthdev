import {error} from '@sveltejs/kit'
import db from '$lib/database';

export const load = async ({ params }) => {
const post = await db.post.findUnique({
	where: { slug: params.slug }
})

if (!post){
	throw error(404,'Post not found')
}
return { post }

}