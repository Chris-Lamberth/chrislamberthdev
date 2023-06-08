
import { json } from '@sveltejs/kit'
import db from '$lib/database'

export const GET = async () => {
    const posts = await db.post.findMany()
	 return json(posts)
}