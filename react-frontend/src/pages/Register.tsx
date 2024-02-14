import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    registerUser,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setErrorMessage,
    setAddress,
} from "../slices/register/registrationSlice";
import { AppDispatch, RootState } from "../store";
import { setLoggedIn, setToken, setUserId } from "../slices/auth/authSlice";

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const errorPopupRef = useRef<HTMLDivElement>(null);

    const {
        name, email, password, confirmPassword, address, errorMessage
    } = useSelector((state: RootState) => state.registration);    

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

    const validatePassword = (password: string) => {
        if (password.length < 8) return false;

        if (!/[A-Z]/.test(password)) return false;

        if (!/[a-z]/.test(password)) return false;

        if (!/[0-9]/.test(password)) return false;

        if (!/[@$!%*?&#^()_+=[\]{}|;]/.test(password)) return false;

        return true;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            dispatch(setErrorMessage('Please enter a valid email address.'));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(setErrorMessage('Passwords must match. Please try again.'));
            return;
        }

        if (!validatePassword(password)) {
            dispatch(setErrorMessage("Your password should contain at least 8 characters, should contain a capital letter, a lower letter, a number and a special character."));
            return;
        }

        dispatch(
            registerUser({ name, email, password, address })
        ).then((result: { payload: any; meta: any; }) => {
            const { payload, meta } = result;
            if (meta.requestStatus === 'fulfilled' && payload) {
                localStorage.setItem('token', payload.token);
                localStorage.setItem('userId', payload.id);
                dispatch(setToken(payload.token));
                dispatch(setUserId(payload.id));
                dispatch(setLoggedIn(true));
                dispatch(setName(''));
                dispatch(setEmail(''));
                dispatch(setPassword(''));
                dispatch(setConfirmPassword(''));
                dispatch(setAddress(''));
                navigate('/profile')
            }
        }).catch ((error: any) => {
            console.log(error);
        });
    };
    return (
            <div className="bg-white flex flex-col justify-center items-center min-h-screen min-w-screen">
                {errorMessage && (
                    <div className="bg-slate-900 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {errorMessage}
                    </div>
                )}
                <form className="lg:w-[600px] lg:h-[500px] w-[350px] h-[450px] bg-gray-50 border rounded border-zinc-300 flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h1 className="lg:text-2xl text-lg text-slate-900">Welcome to our Store</h1>
                    <div className="flex justify-between items-center lg:w-[550px] w-[275px]">
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[270px] w-[135px] lg:h-12 h-8" type="text" value={name} onChange={(e) => dispatch(setName(e.target.value))} placeholder="User name..." required />
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[270px] w-[135px] lg:h-12 h-8" type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder="E-Mail..." required />
                    </div>
                    <div className="flex justify-between items-center lg:w-[550px] w-[275px]">
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[270px] w-[135px] lg:h-12 h-8" type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="Password..." required />
                        <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[270px] w-[135px] lg:h-12 h-8" type="password" value={confirmPassword} onChange={(e) => dispatch(setConfirmPassword(e.target.value))} placeholder="Confirm Password..." required />
                    </div>
                    <h3 className="text-base text-zinc-900 lg:w-[550px] w-[225px] inline-block border rounded border-zinc-300 p-2 text-center">Your password should contain at least 8 characters, should contain a capital letter, a lower letter, a number and a special character.</h3>
                    <textarea className="p-1 inline-block lg:w-[550px] w-[225px] border rounded border-slate-300 text-slate-900 lg:h-32 h-20" value={address} onChange={(e) => dispatch(setAddress(e.target.value))} placeholder="Address..." required />
                    <button className="rounded lg:w-[550px] w-[225px] p-2 hover:bg-slate-700 bg-slate-900 text-slate-100" type="submit">
                        Register
                    </button>
                </form>
            </div>
    );
};

export default Register;