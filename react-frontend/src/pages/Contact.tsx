import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { contactUser, setEmail, setErrorMessage, setMessage, setName } from "../slices/contact/contactSlice";
import { useEffect, useRef } from "react";

const Contact: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const errorPopupRef = useRef<HTMLDivElement>(null);

    const {name, email, message, errorMessage} = useSelector((state: RootState) => state.contact);

    const handleClickOutside = (e: MouseEvent) => {
        if (errorPopupRef.current && !errorPopupRef.current.contains(e.target as Node)) {
            dispatch(setErrorMessage(null));
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            dispatch(setErrorMessage('Please enter a valid email address.'));
            return;
        }

        dispatch(contactUser({name, email, message}))
        dispatch(setName(''));
        dispatch(setEmail(''));
        dispatch(setMessage(''));
        navigate('/products');
    }
    return (
            <div className="bg-white flex flex-col items-center justify-center min-h-screen">
                {errorMessage && (
                    <div className="bg-slate-900 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {errorMessage}
                    </div>
                )}
                <form className="lg:w-[700px] lg:h-[500px] w-[350px] h-[350px] bg-gray-50 border rounded border-zinc-300 flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h1 className="lg:text-2xl text-lg text-slate-900">Get in touch</h1>
                    <h1 className="lg:text-xl text-md text-slate-600">Hey there, fill out this form</h1>
                    <div className="flex justify-between items-center lg:w-[600px] w-[300px]">
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[290px] w-[145px] lg:h-12 h-8" type="text" value={name} onChange={(e) => dispatch(setName(e.target.value))} placeholder="User name..." required />
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[290px] w-[145px] lg:h-12 h-8" type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder="E-Mail..." required />
                    </div>
                    <textarea className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[600px] w-[300px] lg:h-48 h-36" value={message} onChange={(e) => dispatch(setMessage(e.target.value))} placeholder="Enter your message" required />
                    <button className="rounded p-2 lg:w-[600px] w-[300px] bg-slate-900 hover:bg-slate-700 text-slate-100" type="submit">
                        Submit
                    </button>
                </form>
            </div>
    );
};

export default Contact;