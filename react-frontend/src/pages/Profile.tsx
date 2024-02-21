import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchUser, setName, setEmail, setAddress, setPassword, setErrorMessage, updateUser, updatePassword, setNewPassword, setConfirmPassword } from "../slices/profile/profileSlice";


const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {name, email, address, password, newPassword, confirmPassword, errorMessage}  = useSelector((state: RootState) => state.user)
    const errorPopupRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    const validatePassword = (password: string) => {
        if (password.length < 8) return false;

        if (!/[A-Z]/.test(password)) return false;

        if (!/[a-z]/.test(password)) return false;

        if (!/[0-9]/.test(password)) return false;

        if (!/[@$!%*?&#^()_+=[\]{}|;]/.test(password)) return false;

        return true;
    };

    const handleCredentialsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUser({name, email, address}));
    }

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            dispatch(setErrorMessage('Passwords must match. Please try again.'));
            return;
        }

        if (!validatePassword(newPassword)) {
            dispatch(setErrorMessage("Your password should contain at least 8 characters, should contain a capital letter, a lower letter, a number and a special character."));
            return;
        }
        dispatch(updatePassword({password, newPassword}));
        dispatch(setPassword(''));
        dispatch(setNewPassword(''));
        dispatch(setConfirmPassword(''))
    }

    return (
            <div className="bg-white flex flex-col justify-center items-center min-h-screen min-w-screen">
                {errorMessage && (
                    <div className="bg-slate-900 text-stone-100 fixed top-16 right-5 rounded-xl py-2 px-3 text-base z-40" ref={errorPopupRef}>
                        {errorMessage}
                    </div>
                )}
                <div className="lg:flex grid grid-col-1 gap-4 lg:w-1/2 w-[350px]">
                    <form className="lg:w-1/2 w-full bg-gray-50 flex flex-col border border-slate-300 lg:h-[420px] h-[300px] items-center justify-around" onSubmit={handleCredentialsSubmit}>
                        <h1 className="lg:text-2xl text-lg text-slate-900">Your Credentials</h1>
                        <input className="p-1 inline-block border rounded border-slate-300 w-2/3 lg:h-12 h-8" type="text" value={name} onChange={(e) => dispatch(setName(e.target.value))} required />
                        <input className="p-1 inline-block border rounded border-slate-300 w-2/3 lg:h-12 h-8" type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} required />
                        <textarea className="p-1 inline-block border rounded border-slate-300 w-2/3 h-20 overflow-auto" value={address} onChange={(e) => dispatch(setAddress(e.target.value))} required />
                        <button className="rounded lg:text-lg text-sm lg:p-2 p1 bg-slate-900 hover:bg-slate-700 text-slate-100 w-2/3 lg:h-12 h-8" type="submit">
                            Update
                        </button>
                    </form>
                    <form className="lg:w-1/2 w-full bg-gray-50 flex flex-col border border-slate-300 lg:h-[420px] h-[300px] items-center justify-around" onSubmit={handlePasswordUpdate}>
                        <h1 className="lg:text-2xl text-lg text-slate-900">Password Update</h1>
                        <input className="p-1 inline-block border rounded border-slate-300 w-2/3 lg:h-12 h-8" type="password" placeholder="Current Password..." value={password} onChange={(e) => dispatch(setPassword(e.target.value))} required />
                        <input className="p-1 inline-block border rounded border-slate-300 w-2/3 lg:h-12 h-8" type="password" placeholder="New Password..." value={newPassword} onChange={(e) => dispatch(setNewPassword(e.target.value))} required />
                        <input className="p-1 inline-block border rounded border-slate-300 w-2/3 lg:h-12 h-8" type="password" placeholder="Confirm Password..." value={confirmPassword} onChange={(e) => dispatch(setConfirmPassword(e.target.value))} required />
                        <button className="rounded lg:text-lg text-sm p-2 bg-slate-900 hover:bg-slate-700 text-slate-100 w-2/3 lg:h-12 h-8" type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default Profile;