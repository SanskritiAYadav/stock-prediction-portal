import {useState, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../AuthProvider'

const Login = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        const userData = {username, password}
        console.log('userData==>', userData)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
                console.log('Login successful:', response.data)
                setIsLoggedIn(true);
                navigate('/dashboard')
        } catch (error) {
            console.error('Login error==>', error)
            setError(error.response.data)
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6 bg-light-dark p-4 mt-5 rounded'>
                <h3 className='text-light text-center mb-4'>Login to our portal</h3>
                <form onSubmit={handleLogin}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                    <input type="password" className='form-control mb-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error && <div className='text-danger mb-3'>{error.detail}</div>}
                    {loading ? 
                    (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Logging in...</button>)
                    : (<button type='submit' className='btn btn-info d-block mx-auto'>Login</button>)}
                    
                </form>
            </div>
        </div>
         </div>
    </>
     
    
  )
}

export default Login