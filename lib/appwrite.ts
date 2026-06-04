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
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_INQUIRIES_COLLECTION_ID || '',
  blogsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_BLOGS_COLLECTION_ID || '',
  galleryCollectionId: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID || '',
  updatesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_UPDATES_COLLECTION_ID || '', // ← Ensure this line is present
  storageBucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '',
};

export default client;