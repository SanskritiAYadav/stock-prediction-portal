import React, {useState} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = {  
            username, email, password, confirmPassword
        }

        try {
           const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
            console.log('User registered successfully:', response.data);
            setError({});
            setSuccess(true);
        } catch (error) {
            setError(error.response.data);
            console.error('Error occurred while registering user:', error.response.data);
        }finally {
            setLoading(false);
        }


    }

  return (
    <>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6 bg-light-dark p-4 mt-5 rounded'>
                <h3 className='text-light text-center mb-4'>Create an account</h3>
                <form onSubmit={handleSignUp}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <small>{error.username && <div className='text-danger'>{error.username}</div>}</small>
                    </div>
                    <div className='mb-3'>
                    <input type="email" className='form-control mb-3' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <small>{error.email && <div className='text-danger'>{error.email}</div>}</small>
                    </div>
                    <div className='mb-3'>
                    <input type="password" className='form-control mb-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <small>{error.password && <div className='text-danger'>{error.password}</div>}</small>
                    </div>
                    <div className='mb-3'>
                    <input type="password" className='form-control mb-3' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <small>{error.confirmPassword && <div className='text-danger'>{error.confirmPassword}</div>}</small>
                    </div>
                    {success && <div className='alert alert-success'>Registered successfully!</div>}
                    {loading ? 
                    (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Signing Up...</button>)
                    : (<button type='submit' className='btn btn-info d-block mx-auto'>Sign Up</button>)}
                    
                </form>
            </div>
        </div>
         </div>
    
    </>
   
  )
}

export default Register