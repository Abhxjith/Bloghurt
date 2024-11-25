import { db, storage } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDoc 
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";

// Helper function to upload image to Firebase Storage
const uploadImage = async (file) => {
  if (!file) return null;
  
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `blog-images/${timestamp}_${file.name}`;
    const storageRef = ref(storage, filename);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Add a blog with image support
export const addBlog = async (blogData) => {
  try {
    // Extract the cover image file from the blog data
    const { coverImage, ...restBlogData } = blogData;

    // If there's a cover image, upload it first
    let imageUrl = null;
    if (coverImage) {
      imageUrl = await uploadImage(coverImage);
    }

    // Add the blog document with the image URL
    const blogsRef = collection(db, 'blogs');
    const docRef = await addDoc(blogsRef, {
      ...restBlogData,
      coverImageUrl: imageUrl, // Store the URL instead of the File object
      createdAt: new Date().toISOString()
    });

    return docRef;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Delete a blog and its associated image
export const deleteBlog = async (id) => {
  try {
    // First get the blog to check if it has an image
    const blogDoc = await getDoc(doc(db, "blogs", id));
    const blogData = blogDoc.data();

    // If there's an image URL, delete the image from Storage
    if (blogData?.coverImageUrl) {
      const imageRef = ref(storage, blogData.coverImageUrl);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue with blog deletion even if image deletion fails
      }
    }

    // Delete the blog document
    await deleteDoc(doc(db, "blogs", id));
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Update a blog with image support
export const updateBlog = async (id, updatedData) => {
  try {
    const { coverImage, ...restUpdatedData } = updatedData;
    let newImageUrl = null;

    // If there's a new cover image, upload it
    if (coverImage) {
      newImageUrl = await uploadImage(coverImage);
    }

    // Get the current blog data
    const blogDoc = await getDoc(doc(db, "blogs", id));
    const currentBlogData = blogDoc.data();

    // If there's a new image and an old image exists, delete the old one
    if (newImageUrl && currentBlogData?.coverImageUrl) {
      const oldImageRef = ref(storage, currentBlogData.coverImageUrl);
      try {
        await deleteObject(oldImageRef);
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
    }

    // Update the blog with the new data
    await updateDoc(doc(db, "blogs", id), {
      ...restUpdatedData,
      ...(newImageUrl && { coverImageUrl: newImageUrl }),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Keep existing fetchBlogs and getBlogById functions
export const fetchBlogs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const docRef = doc(db, "blogs", id);
    const blogDoc = await getDoc(docRef);
    if (blogDoc.exists()) {
      return { id: blogDoc.id, ...blogDoc.data() };
    } else {
      throw new Error("Blog not found");
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};