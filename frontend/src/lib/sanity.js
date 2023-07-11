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


