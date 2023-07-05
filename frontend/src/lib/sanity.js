import { createClient } from '@sanity/client'; 
import createImageUrlBuilder from '@sanity/image-url';  

export const config = {  
 projectId: 'ps0x3kbb',  
 dataset: 'production',  
 apiVersion: 'v2023-06-06',  
 token:'skwIZiArC4ryImsMMR0eFueBbjVFqxF6etbgpXRxmwclfoXEuwujHRvCzidXx6FoLaksD2Nh3gljsOSr5QWA9rm3rfunC5fy0LQTDPk6kHVzJOVkyLkxwco3rD2sWgZzJbSnhnM1r9ExwFA8JfPbGQJwpOILaN5EeAqCD9sDBDOQcLXfj7kU',  
 useCdn: true,  
 ignoreBrowserTokenWarning: true  
};  
export const client = createClient(config); 

export const urlFor = (/** @type {any} */ source) => createImageUrlBuilder(config).image(source);


export async function load({ params }) {
	const { slug } = params;
	const query = `*[_type == "post" && slug.current == $slug][0]`;
	const queryParams = { slug };
	const data = await client.fetch(query, queryParams);
 
	if (data) {
	  return {
		 post: data,
	  };
	}
 
	return {
	  status: 404,
	  error: new Error('Not found'),
	};
 }