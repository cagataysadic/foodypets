import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <div className="bg-slate-50 w-full">
            <div className="bg-slate-50 lg:h-80 h-48 flex justify-center items-center mx-4">
                <div className="flex justify-between items-start lg:w-1/2 w-full lg:text-xl">
                    <Link to={"/"} className="lg:text-3xl text-bold text-lg border-b-2 border-slate-900 text-slate-900">Store</Link>
                    <div className="flex justify-around lg:w-2/3 w-3/4">
                        <div className="flex flex-col items-start">
                            <h3 className="text-bold lg:text-lg text-md text-slate-900 lg:mt-2 mt-1">MENU</h3>
                            <Link to={"/"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Home</Link>
                            <Link to={"/cart"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Cart</Link>
                            <Link to={"/products"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Products</Link>
                        </div>
                        <div className="flex flex-col items-start">
                            <h3 className="text-bold lg:text-lg text-md text-slate-900 lg:mt-2 mt-1">CATEGORIES</h3>
                            <Link to={"/products?species=cat"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Cat Products</Link>
                            <Link to={"/products?species=dog"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Dog Products</Link>
                            <Link to={"/products?product=food"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Food Products</Link>
                            <Link to={"/products?product=bowl"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Bowl Products</Link>
                            <Link to={"/products?product=bed"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Bed Products</Link>
                            <Link to={"/products?product=carrier"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Carrirer Products</Link>
                        </div>
                        <div className="flex flex-col items-start">
                            <h3 className="text-bold lg:text-lg text-md text-slate-900 lg:mt-2 mt-1">HELP</h3>
                            <Link to={"/contact"} className="lg:text-base text-sm text-slate-500 hover:text-slate-900 lg:mt-2 mt-1">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;