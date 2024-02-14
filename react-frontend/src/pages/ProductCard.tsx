import React from "react";
import { Product } from "../slices/products/productSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addCartItem } from "../slices/cart/cartSlice";

interface ProductCardProps {
    product: Product;
}

const ProductCard:React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleAddToCartClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const cartItem = {
            product_id: product.id,
            quantity: 1,
        };

        dispatch(addCartItem(cartItem));
    }

    return (
        <div className="bg-gray-50 border rounded-lg lg:p-4 p-1 flex flex-col items-center lg:w-[400px] w-[200px] lg:h-[600px] h-[300px]">
            <div className="lg:h-[400px] h-[200px] w-full flex items-center justify-center overflow-hidden rounded-md">
                <img src={`http://localhost:8000/storage/${product.image_url}`} alt={product.name} onClick={() => navigate(`/products/${product.id}`)} className="object-contain max-h-full cursor-pointer" />
            </div>
            <h2 className="lg:text-lg text-md font-semibold lg:mt-2 mt-1">{product.name}</h2>
            <p className="lg:text-sm text-xs text-gray-800 font-bold lg:mt-2 mt-1">Price: ${product.price}</p>
            <button className="bg-slate-900 hover:bg-slate-600 text-slate-100 text-xs lg:text-sm lg:p-2 p-1 lg:w-32 w-20 lg:h-10 h-8 rounded-lg lg:mt-4 mt-2" onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
