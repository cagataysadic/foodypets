import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { clearCart, fetchCartItems } from "../slices/cart/cartSlice";
import { OrderItem, postOrderItems } from "../slices/order/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items} = useSelector((state: RootState) => state.cart);
    const [selectedMethod, setSelectedMethod] = useState('Flat-Rate');
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [securityCode, setSecurityCode] = useState<string>('');

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = value.replace(/\D/g, '').slice(0, 16);
        setCardNumber(formattedValue);
    };

    const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpirationDate(value);
    };

    const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const formattedValue = value.replace(/\D/g, '').slice(0, 3);
        setSecurityCode(formattedValue);
    };

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch]);

    let orders: OrderItem[] = items.map((item) => ({
        'product_id': item.product_id,
        'quantity': item.quantity,
        'price': item.price
    }));
    

    const handleClick = () => {
        dispatch(postOrderItems(orders))
        dispatch(clearCart())
        navigate('/products')
    }

    const shippingMethods = [
        {
            id: 'Flat-Rate',
            name: 'FLAT-RATE',
            description: 'Standard flat rate for all shipments.',
            cost: 18.90
        },
        {
            id: 'Expedited',
            name: 'EXPEDITED SHIPPING',
            description: 'Expedited shipping to get the shipment in a day or two.',
            cost: 122.85
        },
        {
            id: 'Overnight',
            name: 'OVERNIGHT SHIPPING',
            description: 'An expensive option to get the shipment on the next business day.',
            cost: 222.30
        }
    ];

    const selectedMethodCost = shippingMethods.find(method => method.id === selectedMethod)?.cost || 0;

    let sum: number[] = [];
    items.map((item) => (
        sum.push(item.price * item.quantity)
    ))
    const subTotal: number = sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const total: number = subTotal + selectedMethodCost;

    return (
            <div className="bg-white flex flex-col items-center min-h-screen min-w-screen">
                <div className="w-full lg:flex grid grid-col-4 justify-center">
                    <div className="lg:mr-3 lg:w-2/5 w-[350px]">
                        <div className="w-full bg-gray-50 flex flex-col border rounded border-zinc-300 lg:h-[500px] h-[400px] lg:mt-6 mt-3 items-center">
                            <div className="lg:h-20 h-10 w-full flex flex-col justify-center border-b-2 border-zinc-300">
                                <h1 className="lg:text-2xl text-lg lg:ml-10 ml-5">Items in Order</h1>
                            </div>
                            <div className="flex flex-col justify-start items-center lg:h-[420px] h-[360px] lg:my-2 my-1 w-full overflow-auto">
                                {items.map((item) => (
                                    <div className="flex flex-col w-full justify-start lg:my-4 my-2">
                                        <div className="flex justify-between items-center lg:text-lg text-xs lg:mx-16 mx-8">
                                            <div className="lg:h-[100px] h-[50px] lg:w-[100px] w-[50px] flex items-center justify-center overflow-hidden rounded-md">
                                                <img src={`http://localhost:8000/storage/${item.image}`} alt={item.name} onClick={() => navigate(`/products/${item.id}`)} className="max-h-full max-w-full cursor-pointer" />
                                            </div>
                                            <h1 className="lg:w-[170px] w-[90px] lg:text-lg text-xs">{item.name}</h1>
                                            <h1 className="lg:w-[50px] w-[25px] lg:text-lg text-xs">{item.quantity}</h1>
                                            <h1 className="lg:w-[50px] w-[35px] lg:text-lg text-xs">${item.price}</h1>
                                        </div>
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-gray-50 flex flex-col border rounded border-zinc-300 lg:mt-6 mt-3 items-center">
                            <div className="w-full flex flex-col justify-center lg:h-20 h-10">
                                <h1 className="lg:text-2xl text-lg lg:ml-10 ml-5">Shipping Method</h1>
                            </div>
                            <div className="w-full">
                                {shippingMethods.map((method) => (
                                    <label key={method.id} className="flex flex-col justify-center border-t-2 border-zinc-300 lg:h-20 h-16 p-1">
                                        <div className="flex justify-between items-center lg:mx-2 mx-1">
                                            <div className="flex items-center">
                                                <input 
                                                    type="radio"
                                                    name="shipping"
                                                    value={method.id}
                                                    checked={selectedMethod === method.id}
                                                    onChange={() => setSelectedMethod(method.id)}
                                                    className="form-radio lg:h-5 h-2 lg:w-5 w-2 text-slate-600 lg:mx-2 mx-1"
                                                />
                                                <span className="lg:text-lg text-sm text-zinc-700">{method.name}</span>
                                            </div>
                                            <p className="lg:text-sm text-xs text-zinc-600 lg:mr-2 mr-1">${method.cost}</p>
                                        </div>
                                        <p className="lg:text-sm text-xs text-zinc-600 lg:ml-10 ml-5">{method.description}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-gray-50 flex flex-col border rounded border-zinc-300 lg:h-[300px] h-[200px] lg:my-6 my-3 items-center justify-between">
                            <div className="lg:h-16 h-8 w-full flex flex-col justify-center border-b-2 border-zinc-300">
                                <h1 className="lg:text-2xl text-lg lg:ml-10 ml-5">Payment Info</h1>
                            </div>
                            <input
                                className="lg:h-12 h-8 lg:p-2 p-1 inline-block rounded border border-zinc-500 w-3/4 text-zinc-900 lg:my-2 my-1"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                type="tel"
                            />
                            <div className="w-3/4 flex justify-between lg:my-2 my-1">
                                <input
                                    className="lg:h-12 h-8 lg:p-2 p-1 inline-block rounded border border-zinc-500 w-1/2 text-zinc-900 lg:mr-2 mr-1"
                                    placeholder="Expiration Date"
                                    value={expirationDate}
                                    onChange={handleExpirationDateChange}
                                    type="tel"
                                />
                                <input
                                    className="lg:h-12 h-8 lg:p-2 p-1 inline-block rounded border border-zinc-500 w-1/2 text-zinc-900 lg:ml-2 ml-1"
                                    placeholder="Security Code"
                                    value={securityCode}
                                    onChange={handleSecurityCodeChange}
                                    type="tel"
                                />
                            </div>
                            <button className="bg-zinc-900 lg:h-12 h-8 rounded hover:bg-zinc-600 text-zinc-100 w-1/2 p-1 lg:mb-4 mb-2" onClick={handleClick}>CHECKOUT</button>
                        </div>
                    </div>
                    <div className="lg:ml-3 lg:w-1/5 w-full">
                        <div className="w-full bg-gray-50 flex flex-col sticky lg:top-5 top-2 border rounded border-zinc-300 lg:h-[300px] h-[150px] lg:mt-6 mt-3">
                            <div className="lg:h-20 h-10 w-full flex flex-col justify-center border-b-2 border-zinc-300">
                                <h1 className="lg:text-2xl text-lg ml-5">Order Summary</h1>
                            </div>
                            <div className="lg:mt-8 mt-4 lg:text-lg text-sm text-slate-900 lg:mx-4 mx-2">
                                <div className="flex lg:h-10 h-5 justify-between items-center my-1">
                                    <h1>Subtotal</h1>
                                    <h1>${subTotal.toFixed(2)}</h1>
                                </div>
                                <div className="flex lg:h-10 h-5 justify-between items-center my-1">
                                    <h1>{selectedMethod}</h1>
                                    <h1>${selectedMethodCost}</h1>
                                </div>
                                <div className="flex lg:h-10 h-5 justify-between items-center my-1">
                                    <h1>Total</h1>
                                    <h1>${total.toFixed(2)}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Checkout;