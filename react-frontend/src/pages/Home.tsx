import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../slices/products/productSlice";
import homeImage from "../images/home.png";
import ProductCard from "./ProductCard";

const Home: React.FC = () => {
    const selectRandomItem = (items: any) => {
        return items[Math.floor(Math.random() * items.length)];
    }

    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.items);
    const status = useSelector((state: RootState) => state.products.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const dogFood = selectRandomItem(products.filter(product => product.species === 'dog' && product.type === 'food'));
    const catBowl = selectRandomItem(products.filter(product => product.species === 'cat' && product.type === 'bowl'));
    const dogBed = selectRandomItem(products.filter(product => product.species === 'dog' && product.type === 'bed'));
    const carrier = selectRandomItem(products.filter(product => product.type === 'carrier'));

    return (
        <div className="bg-white min-h-screen flex flex-col items-center">
            <div className="lg:h-[400px] h-[200px] w-full flex items-center justify-center overflow-hidden lg:mt-20 mt-10">
                <img src={homeImage} className="object-contain max-h-full" alt='home-page'/>
            </div>
            <div className="flex flex-col items-center text-slate-900 text-bold">
                <h1 className="lg:text-2xl text-lg lg:my-3 my-1">Welcome to our Store</h1>
                <h1 className="lg:text-xl text-md lg:my-3 my-1">Featured Products</h1>
                <div className="grid lg:grid-cols-4 grid-col-1 lg:gap-8 gap-4 lg:my-3 my-1">
                    {dogFood && <ProductCard product={dogFood} />}
                    {catBowl && <ProductCard product={catBowl} />}
                    {dogBed && <ProductCard product={dogBed} />}
                    {carrier && <ProductCard product={carrier} />}
                </div>
            </div>
        </div> 
    );
}
export default Home;