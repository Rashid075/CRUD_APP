import React, {  useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Update() {
    const {id}=useParams();
    const [values, setValues]=useState({
        name:'',
        email:'',
        phone:''
    })
    const navigate=useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/users/'+ id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const handleUpdate=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3000/users/'+id, values)
        .then(res => {
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h2>Update User</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name:</label>
                    <input type="text"  name='name'className="form-control" placeholder='Enter Name' value={values.name} onChange={e=>setValues({...values,name: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email:</label>
                    <input type="email" className="form-control"  name='email' placeholder='Enter Email' value={values.email} onChange={e=>setValues({...values,email: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Phone:</label>
                    <input type="text" className="form-control" name='phone' placeholder='Enter Phone Number' value={values .phone} onChange={e=>setValues({...values,phone: e.target.value})} />
                </div>
                <button  className="btn btn-success">Update</button>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </form>
            </div>

        </div>
  )
}
