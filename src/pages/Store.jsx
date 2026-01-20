import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import useUserPoints from '../hooks/useUserPoints';
import PurchaseModal from '../components/PurchaseModal';

const Store = () => {
  const { user } = useAuth();
  const { points, loading: pointsLoading } = useUserPoints();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const productsRef = collection(db, "products");
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setProductsLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProductClick = (product) => {
    if (points < product.price) {
      alert("ليس لديك نقاط كافية");
    } else {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePurchaseSubmit = async (formData) => {
    if (!user || !selectedProduct) return;

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        contactMethod: formData.contactMethod,
        phoneNumber: formData.phoneNumber,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      alert("تم إرسال طلبك بنجاح!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("حدث خطأ أثناء إرسال طلبك.");
    } finally {
      handleCloseModal();
    }
  };
  
  const loading = pointsLoading || productsLoading;



  if (loading) {
    return null;
  }

    return (
    <div className="container mx-auto p-4 flex-grow">
      
      {/* Points Counter */}
      

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => handleProductClick(product)}
          >
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 text-lg">{product.price} نقطة</p>
          </div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedProduct && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSubmit={handlePurchaseSubmit}
        />
      )}
    </div>
  );
};

export default Store;
