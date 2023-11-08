import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
export default function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    const handleDelete=(id)=>{
        const confirm=window.confirm("Would you like to delete");
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id)
            .then(res=>{
                location.reload()
            })
            .catch(err=>console.log(err));
        }
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Users</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success'>Add+</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <Link to={`/read/${item.id}`}className='btn btn-sm btn-info me-2'>Read</Link>
                                        <Link to={`/update/${item.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button className='btn btn-sm btn-danger' onClick={e=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
