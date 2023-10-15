import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation'
import axios from 'axios';
function Signup() {
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    // Use the Validation function to check for errors
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (
      validationErrors.name === '' &&
      validationErrors.email === '' &&
      validationErrors.password === '' &&
      validationErrors.address === '' &&
      validationErrors.phone === ''
    ) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => console.log(err));
    }
  };
   
  
  
  
  /* const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: null,
    }
    )

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    

    const handleSubmit = (event) => {
      event.preventDefault();
    };

    useEffect(() => {
      const validationErrors = Validation(values);

      setErrors(validationErrors);

      if (
        validationErrors.name === '' && validationErrors.email === '' &&
        validationErrors.password === '' &&
        validationErrors.address === '' &&
        validationErrors.phone === ''
      ) {
        axios.post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
      }
    },[values]);
*/

  /*  const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "" && errors.address === "" && errors.phone === "") {
          axios.post('http://localhost:8081/signup', values).then(res => {
            navigate('/');
          }).catch(err => console.log(err));
        }
        
    }*/

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-success vh-100'>
      <h1 className='text-center text-white mb-5 bg-success'>Welcome to Sportify!</h1>
      <div className='bg-light p-3 rounded w-25'>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'><strong>Name</strong></label>
            <input type='text' placeholder='Enter Name' name='name' onChange={handleInput} className='form-control rounded-0' />
            {errors.name && <span className='text-danger'> {errors.name};</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'> {errors.email};</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'> {errors.password};</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='address'><strong>Address</strong></label>
            <input type='text' placeholder='Address' name='address' onChange={handleInput} className='form-control rounded-0' />
            {errors.address && <span className='text-danger'> {errors.address};</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='phone'><strong>Phone Number</strong></label>
            <input type='tel' placeholder='8888888888' pattern="[0-9]{10}" maxlength="12"  title="Ten digits code" required name='phone' onChange={handleInput} className='form-control rounded-0' />
            {errors.phone && <span className='text-danger'> {errors.phone};</span>}
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
          <p></p>
          <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'><strong>Log in</strong></Link>
        </form>
      </div>
    </div>
  )
};

export default Signup;
