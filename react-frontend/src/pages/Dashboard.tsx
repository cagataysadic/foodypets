import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { setLoggedIn, setToken, setUserId } from "../slices/auth/authSlice";


const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const handleLogout = () => {
        dispatch(setLoggedIn(false));
        dispatch(setToken(""));
        dispatch(setUserId(""));
    };

    return (
        <div className="bg-slate-50 w-full">
            <div className="flex justify-between items-center lg:mx-32 lg:h-20 h-10 lg:text-xl text-md text-slate-900">
                <Link to={"/"} className="lg:text-3xl border-b-2 border-slate-900 text-xl ml-4">Store</Link>
                <div className="flex justify-around items-center lg:w-1/3 w-3/4 mr-4">
                    <Link to={"/products"}>Products</Link>
                    <Link to={"/contact"}>Contact</Link>
                    {!isLoggedIn ?
                        <>
                            <Link to={"/register"}>Register</Link>
                            <Link to={"/login"}>Login</Link>
                        </> : 
                        <>
                            <Link to={"/profile"}>Profile</Link>
                            <button className="rounded lg:p-2 p-1 bg-slate-900 hover:bg-slate-700 text-slate-100" onClick={() => handleLogout()}>Logout</button>
                        </>
                    }
                    <button className="rounded lg:p-2 p-1 bg-slate-900 hover:bg-slate-700 text-slate-100" onClick={() => navigate("/Cart")}>Cart</button>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;