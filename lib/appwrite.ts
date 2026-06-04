import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID }; 

export const appwriteConfig = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    // Ensure this matches the variable name in your .env.local
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID as string, 
    blogsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_BLOGS_COLLECTION_ID as string,
    galleryCollectionId: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID as string,
    updatesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_UPDATES_COLLECTION_ID as string,
    storageBucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID as string,
};

export default client;