import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { addCartItem, clearCart, deleteCartItem, fetchCartItems } from "../slices/cart/cartSlice";


const Cart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {items} = useSelector((state: RootState) => state.cart);
    const {lastUpdated} = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch, lastUpdated]);

    const handleIncrease = (e: any) => {
        const cartItem = {
            product_id: e,
            quantity: 1,
        };
        dispatch(addCartItem(cartItem));
    }

    const handleDecrease = (e: any) => {
        dispatch(deleteCartItem(e))
    };

    const handleClear = () => {
        dispatch(clearCart())
    }

    let totalSum: number[] = [];
    items.map((item) => (
        totalSum.push(item.price * item.quantity)
    ))
    const total: number = totalSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return (
            <div className="bg-white flex flex-col items-center justify-center min-h-screen min-w-screen">
                <div className="lg:w-1/2 w-[350px] bg-gray-50 flex flex-col border border-slate-300 lg:h-[700px] h-[500px] items-center justify-between">
                    <div className="lg:h-16 h-8 w-full flex flex-col justify-center border-b-2 border-zinc-300">
                        <h1 className="lg:text-2xl text-lg lg:ml-10 ml-5">Your Cart</h1>
                    </div>
                    <div className="flex flex-col justify-start items-center lg:h-[600px] h-[400px] w-full overflow-auto">
                        {items.map((item) => (
                            <div className="flex flex-col w-full justify-start lg:my-4 my-1">
                                <div className="flex justify-between items-center text-lg lg:mx-16 mx-8">
                                    <div className="lg:h-[100px] h-[50px] lg:w-[150px] w-[50px] flex items-center justify-center overflow-hidden rounded-md">
                                        <img src={`http://localhost:8000/storage/${item.image}`} alt={item.name} onClick={() => navigate(`/products/${item.id}`)} className="max-h-full max-w-full cursor-pointer" />
                                    </div>
                                    <h1 className="lg:w-[170px] w-[50px] lg:text-lg text-xs">{item.name}</h1>
                                    <h1 className="lg:w-[50px] w-[15px] lg:text-lg text-xs">{item.quantity}</h1>
                                    <button onClick={() => handleIncrease(item.product_id)}>+</button>
                                    <button onClick={() => handleDecrease(item.id)}>-</button>
                                    <h1 className="lg:w-[50px] w-[35px] lg:text-lg text-xs">${item.price}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ml-auto lg:h-16 h-8 lg:w-1/4 w-1/2 flex items-center justify-around lg:text-xl text-md text-slate-900">
                        <h1>Subtotal</h1>
                        <h1>${total.toFixed(2)}</h1>
                    </div>
                    <div className="lg:h-16 h-8 w-full flex items-center justify-around border-t-2 border-zinc-300">
                        <button className="bg-slate-900 hover:bg-slate-700 text-slate-100 rounded lg:text-lg text-xs w-1/3 p-1 lg:h-12 h-6" onClick={handleClear}>CLEAR CART</button>
                        <button className="bg-slate-900 hover:bg-slate-700 text-slate-100 rounded lg:text-lg text-xs w-1/2 p-1 lg:h-12 h-6" onClick={() => navigate("/Checkout")}>CONTINUE TO CHECKOUT</button>
                    </div>
                </div>
            </div>
    );
};

export default Cart;