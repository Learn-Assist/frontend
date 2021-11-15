import { useState } from 'react'
import college from '../images/college.jpg'

function About() {
    const [show, setshow] = useState(false)
    return (
        <div style={{ minHeight: "68vh" }}>
            <div className="card shadow-xl image-full w-5/6 lg:w-4/6 xl:w-1/2 2xl:w-1/3 mx-auto my-10">
                <figure>
                    <img src={college} alt="college" />
                </figure>
                <div className="justify-end card-body">
                    <h1 className=" text-2xl font-bold card-title text-primary">Learn Assist</h1>
                    <h2 className="card-title">This product is in its initial prototype stage. This web site is just a show case.</h2>
                    <p>For Final year project </p>
                    <p className='text-primary font-medium'>18BCS083 18BCS081 18BCS080</p>
                    <p className='text-primary font-bold'>KCT Computer Science department</p>

                    <div className="mt-3 flex flex-row">
                        <button onClick={() => setshow(x => !x)} className="btn btn-primary">MORE</button>
                        {show && <span className="mt-2 ml-2 text-xs xl:text-lg lg:text-lg align-middle">
                            Developed by: <span class="text-primary xl:text-lg lg:text-lg  text-sm font-bold">Sivaram Shabari</span>
                        </span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
