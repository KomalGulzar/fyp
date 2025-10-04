import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import Category from "../models/Category.js"; // Import the Category model
// import Listing from "../models/Listing.js"; 
// import Category from "../models/Category.js";


export const createListing = async (req, res, next) => {
    try {
        console.log("Received Data:", req.body); // Debugging Log

        // Extract p_category (category) from the request body
        const { p_category } = req.body; // Assuming p_category is a field in the product (listing)

        // Check if the category already exists in the Category model
        let existingCategory = await Category.findOne({ name: p_category });

        // If the category doesn't exist, create a new category
        if (!existingCategory) {
            existingCategory = new Category({
                name: p_category,
            });

            // Save the new category in the database
            await existingCategory.save();
            console.log(`Created new category: ${p_category}`);
        }

        // Now, create the new listing and associate it with the category
        const listing = await Listing.create(req.body); // The listing is created from the request body

        // Send the created listing as the response
        return res.status(201).json(listing);
    } catch (error) {
        console.error("Error Creating Listing:", error); // Log the actual error
        next(error);
    }
};
// export const createListing = async (req, res, next) => {
//     try {
//         const  { 
//             p_name, p_desc, p_category, p_price, p_imgs, 
//             p_com_id, p_sdesc, p_order, p_trade, userRef, 
//             sellerEmail, sellerUsername 
//         } = req.body;

//         // Debugging: Log received data
//         console.log("Received Data:", req.body);

//         // Check required fields
//         if (!userRef) {
//             return res.status(400).json({ success: false, message: "Seller ID (userRef) is required!" });
//         }
//         if (!sellerEmail) {
//             return res.status(400).json({ success: false, message: "Seller email is required!" });
//         }
//         if (!sellerUsername) {
//             return res.status(400).json({ success: false, message: "Seller username is required!" });
//         }

//         // Create a new listing using the provided data
//         const listing = await Listing.create({
//             p_name,
//             p_desc,
//             p_category,
//             p_price,
//             p_imgs,
//             p_com_id,
//             p_sdesc,
//             p_order,
//             p_trade,
//             userRef,
//             sellerEmail, // Ensure email is stored
//             sellerUsername // Ensure username is stored
//         });

//         // Respond with the created listing
//         return res.status(201).json({ success: true, listing });

//     } catch (error) {
//         console.error("Error Creating Listing:", error);
//         next(error);
//     }
// };



export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }

        if (req.user.id !== listing.userRef.toString()) {
            return next(errorHandler(401, "You can only delete your own listings"));
        }

        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Listing has been deleted" });
    } catch (error) {
        next(error);
    }
};

// export const updateListing = async (req, res, next) => {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//         return next(errorHandler(404, "Listing not found"));
//     }

//     // Check if the logged-in user is the owner of the listing
//     // if (req.user.id.toString !== listing.userRef.toString) {
//     //     return next(errorHandler(403, "You can only update your own listings"));
//     // }
//     try {
//         // Update listing with new data
//         const updatedListing = await Listing.findByIdAndUpdate(
//             req.params.id,
//              req.body,
//             { new: true } // Returns updated document
//         );

//         res.status(200).json( updatedListing );
//     } catch (error) {
//         next(error);
//     }
// };


export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not found"));
    }

    // Debugging logs
    console.log("Logged-in user ID:", req.user.id);
    console.log("Listing owner ID:", listing.userRef);
    console.log("Comparison result:", req.user.id.toString() === listing.userRef.toString());

    // Check if the logged-in user is the owner of the listing
    if (req.user.id.toString() !== listing.userRef.toString()) {
        return next(errorHandler(403, "You can only update your own listings"));
    }

    try {
        // Update listing with new data
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};


export const getListing = async (req, res, next)=>{
try {
    const listing = await Listing.findById(req.params.id)
    .populate("userRef", "email username");
    if(!listing){
        return next(errorHandler(404, 'Listing not found'))
    }
    res.status(200).json(listing)
    res.json({
        _id: listing._id,
        sellerId: listing.sellerId._id,  // ✅ Send sellerId
        sellerEmail: listing.sellerId.email, // ✅ Send sellerEmail
      });
} catch (error) {
    next(error)
}
}


// export const getListings = async (req, res, next)=>{
//     try {
        

//         const limit = parseInt(req.query.limit) || 9;
//          const startIndex = parseInt(req.query.startIndex) || 0;
//          let offer = req.query.offer;

//         //  if(offer === 'undefine' )

//     } catch (error) {
//         next(error)
//     }
// }

// import Listing from '../models/listing.model.js'; // Ensure you import your Listing model

export const getListings = async (req, res, next) => {
    try {
        // const limit = parseInt(req.query.limit) || 9;
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchQuery = req.query.search || ''; // Get the search term from query params

        let query = {};

        // If there's a search term, filter listings by product name or description
        if (searchQuery) {
            query = {
                $or: [
                    { p_name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in product name
                    { p_desc: { $regex: searchQuery, $options: "i" } }  // Case-insensitive search in description
                ]
            };
        }

        const listings = await Listing.find(query)
            .skip(startIndex)
            .limit(limit);

        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};



// export const getCategories = async (req, res, next) => {
//     try {
//         console.log("Fetching categories...");

//         // Fetch all listings and select only the 'p_category' field
//         const listings = await Listing.find({}, "p_category");

//         console.log("Listings found:", listings);

//         // Extract categories from listings
//         const categories = listings.map(listing => listing.p_category);

//         console.log("Categories extracted:", categories);

//         res.status(200).json(categories);
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//         next(error);
//     }
// };



export const getCategories = async (req, res, next) => {
    try {
      const dbCategories = await Category.find().select("_id name image");
  
      res.status(200).json(dbCategories);
    } catch (error) {
      next(error);
    }
  };
  
  



// export const getProductsByCategory = async (req, res, next) => {
//     try {
//         const categoryName = req.params.categoryName; // Get category from URL
//         console.log("Fetching products for category:", categoryName); // Debugging

//         // Find products that belong to this category
//         const products = await Listing.find({ p_category: categoryName });

//         if (products.length === 0) {
//             return res.status(404).json({ message: "No products found in this category" });
//         }

//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//         next(error);
//     }
// };



export const getProductsByCategory = async (req, res, next) => {
    try {
        const categoryName = req.params.categoryName; // Get category from URL
        console.log("Fetching products for category:", categoryName); // Debugging

        // 🔥 Fix: Ensure category name is trimmed & case insensitive
        const categoryQuery = new RegExp(`^${categoryName.trim()}$`, "i");

        // Find products that belong to this category
        const products = await Listing.find({ p_category: categoryQuery });

        console.log("Products found:", products); // Debugging

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        next(error);
    }
};



// 📦 Get Latest Listings
export const getLatestListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 8; // Default to 8
        const latestListings = await Listing.find()
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json(latestListings);
    } catch (error) {
        next(error);
    }
};

  
