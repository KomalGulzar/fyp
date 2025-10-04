import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';


const BuyerCart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchWishlist = async () => {
        try {
          const res = await fetch('/api/wishlist/get', {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          });

          const data = await res.json();
          setWishlist(data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };

      fetchWishlist();
    }
  }, [currentUser]);

  const handleRemove = async (productId) => {
    try {
      const res = await fetch('/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ productId }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      // Update wishlist UI without refetching
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error('Error removing item:', err.message);
      alert(err.message);
    }
  };
  

  return (
    <MainLayout>

    <div className="buyer-profile p-6">
      <h1 className="text-2xl font-bold mb-4">{currentUser.username}'s Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product._id} className="wishlist-item border rounded-lg shadow-md p-4 bg-white">
              <img src={product.p_imgs[0]} alt={product.p_name} className="w-full h-40 object-cover rounded" />
              <p className="mt-2 font-semibold">{product.p_name}</p>
              <p className="text-pink-600 font-bold">${product.p_price}</p>
              <Link to={`/listing/${product._id}`} className="text-blue-500 mt-2 inline-block">
                View Product
              </Link>
              <button
  onClick={() => handleRemove(product._id)}
  className="mt-2 text-sm text-red-500 hover:underline"
>
  Remove from Wishlist
</button>

            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default BuyerCart;
