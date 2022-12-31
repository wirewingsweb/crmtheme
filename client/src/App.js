import { lazy, Suspense, useEffect } from 'react';
import "react-bootstrap"
/// Components
import Index from "./jsx";
import { connect, useDispatch , useSelector} from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
// import './vendor/bootstrap/dist/js/bootstrap.bundle.min';
import "./css/style.css";


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
    });
});

function App() {
    const auth = useSelector(isAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(dispatch)
    useEffect(() => {
        checkAutoLogin(dispatch, navigate);
    }, []);
    console.log(auth, 'from app.js')


    let routeblog = (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/page-register' element={<SignUp />} />
            <Route path='/page-forgot-password' element={<ForgotPassword />} />
        </Routes>
    );
    if (auth) {
        return (
            <>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    <Index />
                </Suspense>
            </>
        );
    } else {
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routeblog}
                </Suspense>
            </div>
        );
    }
};

// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: isAuthenticated(state),
//     };
// };

{/* export default connect((mapStateToProps)(App));  */ }
export default App;

