import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../slices/products/productSlice";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.items);
    const status = useSelector((state: RootState) => state.products.status);
    const error = useSelector((state: RootState) =>  state.products.error);
    const errorPopupRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    const parseQueryParams = (search: string) => {
        return new URLSearchParams(search);
    };

    useEffect(() => {
        const queryParams = parseQueryParams(location.search);
        const species = queryParams.get('species');
        const productType = queryParams.get('product');

        if (species) {
            setSpeciesLink(species);
        }

        if (productType) {
            setProductLink(productType);
        }
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [location, status, dispatch]);
    const [speciesLink, setSpeciesLink] = useState<string | null>('');
    const [productLink, setProductLink] = useState<string | null>('');

    const handleSpeciesClick = (speciesName: string): void => {
        if (speciesLink === speciesName) {
            setSpeciesLink(null);
        } else {
            setSpeciesLink(speciesName);
        }
    };

    const handleProductClick = (productName: string): void => {
        if (productLink === productName) {
            setProductLink(null);
        } else {
            setProductLink(productName);
            if (productName === 'carrier') {
                setSpeciesLink('');
            }
        }
    };

    const filteredProducts = products.filter(product => {
        let matchesSpecies = true;
        if (speciesLink) {
            if (productLink === 'carrier') {
                matchesSpecies = true;
            } else {
                matchesSpecies = product.species === speciesLink;
            }
        }
        const matchesType = productLink ? product.type === productLink : true;
        return matchesSpecies && matchesType;
    });

    return (
        <div className="bg-white min-h-screen flex justify-center min-w-screen">
            {error && (
                    <div className="bg-slate-900 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {error}
                    </div>
                )}
            <div className="flex flex-col items-center">
                <h1 className="lg:text-3xl text-xl lg:mt-20 mt-10">Our Products</h1>
                <div className="flex items-center lg:h-8 h-4 lg:text-xl text-md text-slate-500 lg:mt-8 mt-4">
                    <h1
                        className={`hover:text-slate-900 cursor-pointer lg:mr-4 mr-1 ${speciesLink === 'cat' ? 'text-slate-900' : ''}`}
                        onClick={() => handleSpeciesClick('cat')}
                    >
                        Cat Products
                    </h1>
                    <h1
                        className={`hover:text-slate-900 cursor-pointer lg:ml-4 ml-1 ${speciesLink === 'dog' ? 'text-slate-900' : ''}`}
                        onClick={() => handleSpeciesClick('dog')}
                    >
                        Dog Products
                    </h1>
                </div>
                <div className="flex justify-between lg:w-1/4 w-full lg:h-8 h-4 items-center lg:text-xl text-md text-slate-500 lg:mt-8 mt-4">
                    <h1
                        className={`hover:text-slate-900 cursor-pointer ${productLink === 'food' ? 'text-slate-900' : ''}`}
                        onClick={() => handleProductClick('food')}
                    >
                        Food
                    </h1>
                    <h1
                        className={`hover:text-slate-900 cursor-pointer ${productLink === 'bed' ? 'text-slate-900' : ''}`}
                        onClick={() => handleProductClick('bed')}
                    >
                        Bed
                    </h1>
                    <h1
                        className={`hover:text-slate-900 cursor-pointer ${productLink === 'bowl' ? 'text-slate-900' : ''}`}
                        onClick={() => handleProductClick('bowl')}
                    >
                        Bowl
                    </h1>
                    <h1
                        className={`hover:text-slate-900 cursor-pointer ${productLink === 'carrier' ? 'text-slate-900' : ''}`}
                        onClick={() => handleProductClick('carrier')}
                    >
                        Carrier
                    </h1>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-3 lg:my-8 my-4">
                    {filteredProducts.length > 0 && (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </div> 
    );
}
export default Products;