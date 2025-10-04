import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/listing/categories').then(res => res.json()),
      fetch('/api/listing/get').then(res => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
    ])
      .then(([fetchedCategories, fetchedProducts]) => {
        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading categories…</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <section className=" ">
      <div className="max-w-7xl mx-auto  space-y-7">
        {categories.slice(0, 3).map((category, index) => {
          const categoryName = typeof category === 'string' ? category : category.name;
          const categoryImage = typeof category === 'string' ? null : category.image;

          const relatedProducts = products
            .filter(prod => prod.p_category === categoryName)
            .slice(0, 6);

          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4  bg-white items-start">
              {/* Left: Category Image Box with Overlaid Title */}
              <div className="col-span-1 relative  bg-blue-500 shadow-md">
                <div className="relative top-0 left-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold px-4 py-3 z-10 w-full shadow">
                  {categoryName}
                </div>
                <Link to={`/category/${encodeURIComponent(categoryName)}`}>
                  <img
                    src={categoryImage || 'https://via.placeholder.com/400x500'}
                    alt={categoryName}
                    className="w-full h-[400px] object-cover"
                  />
                </Link>
              </div>

              {/* Right: Product Grid */}
              <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 mx-6 gap-4">
                {relatedProducts.map(prod => (
                  <Link
                    key={prod._id}
                    to={`/listing/${prod._id}`} // ✅ FIXED: use prod here, not listing
                    className="bg-white  p-6 hover:shadow-md transition"
                  >
                    <img
                      src={prod.p_imgs?.[0] || 'https://via.placeholder.com/200'}
                      alt={prod.p_name}
                      className="w-full h-[140px] object-cover mb-2"
                    />
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{prod.p_name}</h4>
                    <p className="text-xs text-gray-600">
                      {prod.p_price ? `$${prod.p_price}` : 'No Price'}
                    </p>
                  </Link>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
