import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser, setEmail, setErrorMessage, setPassword } from "../slices/register/registrationSlice";
import { setLoggedIn, setToken, setUserId } from "../slices/auth/authSlice";


const Login: React.FC = () => {
    const { email, password, errorMessage } = useSelector((state: RootState) => state.registration);
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate();
    const errorPopupRef = useRef<HTMLDivElement>(null);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            loginUser({ email, password })
        ).then((result: { payload: any; meta: any; }) => {
            const { payload, meta } = result;
            console.log(payload);
            if (meta.requestStatus === 'fulfilled' && payload) {
                localStorage.setItem('token', payload.token);
                localStorage.setItem('userId', payload.id);
                dispatch(setToken(payload.token));
                dispatch(setUserId(payload.id));
                dispatch(setLoggedIn(true));
                dispatch(setEmail(''));
                dispatch(setPassword(''));
                dispatch(setErrorMessage(null));
                navigate('/');
            }
        }).catch ((error: any) => {
            console.log(error)
            dispatch(setErrorMessage(errorMessage));
        });
    };
    return (
            <div className="bg-white flex flex-col justify-center items-center min-h-screen min-w-screen">
                {errorMessage && (
                    <div className="bg-red-600 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {errorMessage}
                    </div>
                )}
                <form className="lg:w-[500px] lg:h-[300px] w-[350px] h-[300px] bg-gray-50 border rounded border-zinc-300 flex flex-col items-center justify-around" onSubmit={handleSubmit}>
                    <h1 className="lg:text-2xl text-lg text-slate-900">Welcome to our Store</h1>
                    <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[400px] w-[300px] h-12" type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} placeholder="E-Mail..." required />
                    <input className="p-1 inline-block border rounded border-slate-300 text-slate-900 lg:w-[400px] w-[300px] h-12" type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} placeholder="Password..." required />
                    <button className="rounded p-2 lg:w-[400px] w-[300px] bg-slate-900 hover:bg-slate-700 text-slate-100" type="submit">
                        Login
                    </button>
                </form>
            </div>
    );
};

export default Login;