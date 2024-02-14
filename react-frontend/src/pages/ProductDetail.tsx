import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProductById } from "../slices/products/productSlice";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.products.selectedProduct);
    const status = useSelector((state: RootState) => state.products.productStatus);
    const error = useSelector((state: RootState) => state.products.productError);
    const errorPopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return product ? (
        <div className="bg-white min-h-screen flex items-center justify-center">
            {error && (
                    <div className="bg-slate-900 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {error}
                    </div>
                )}
            <img src={`http://localhost:8000/storage/${product.image_url}`} alt={product.name} className="mr-10" />
            <div className="bg-gray-50 border rounded-lg p-4 flex flex-col justify-around items-start w-[500px] h-[500px]">
                <h2 className="text-2xl font-semibold border-b w-full border-gray-500">{product.name}</h2>
                {product.type === 'food' && 
                    <div className="border-b w-full border-gray-500">
                        <h2 className="text-lg font-semibold">Flavor: {product.flavor}</h2>
                        <h2 className="text-lg font-semibold mt-2">Form: {product.form}</h2>
                    </div>
                }
                {(product.type === 'bed' || product.type === 'carrier') && 
                    <div className="border-b w-full border-gray-500">
                        <h2 className="text-lg font-semibold">Material: {product.material}</h2>
                        <h2 className="text-lg font-semibold mt-2">Dimensions: {product.dimensions}</h2>
                    </div>
                }
                {product.type === 'bowl' && 
                    <div className="border-b w-full border-gray-500">
                        <h2 className="text-lg font-semibold">Material: {product.material}</h2>
                    </div>
                }
                <div>
                    <h2 className="text-xl font-semibold">About this item</h2>
                    <p className="text-lg text-gray-600 mt-2 border-b w-full border-gray-500">{product.description}</p>
                </div>
                <p className="text-md text-gray-800 font-bold">Price: ${product.price}</p>
                <button className="bg-slate-900 hover:bg-slate-600 text-slate-100 p-2 w-32 h-10 rounded-lg">Add to Card</button>
            </div>
        </div>
    ): (
        <div>Product not found</div>
    );
}

export default ProductDetail;