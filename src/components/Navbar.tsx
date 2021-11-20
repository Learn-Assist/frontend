import { Link } from "react-router-dom"

function Navbar() {
    return (

        <div className="navbar pb-2 shadow-lg bg-neutral text-neutral-content rounded-none ">
            <div className="px-2 mx-2 navbar-start">
                <span style={{ fontFamily: "Yuji Boku" }} className="text-lg font-bold">
                    <Link to="/home" className="text-primary hover:text-gray-200">
                        Learn Assist
                    </Link>
                </span>
            </div>

            <div className="hidden px-2 mx-2 navbar-center lg:flex">
                <div className="flex items-stretch">
                    <Link to="/home" className="btn btn-ghost btn-sm rounded-btn hover:bg-gray-500">
                        Home
                    </Link>
                    <Link to="/app" className="btn btn-ghost btn-sm rounded-btn hover:bg-gray-500">
                        App
                    </Link>
                    <Link to="/assist" className="btn btn-ghost btn-sm rounded-btn hover:bg-gray-500">
                        Assist
                    </Link>
                    <Link to="/about" className="btn btn-ghost btn-sm rounded-btn hover:bg-gray-500">
                        About
                    </Link>

                </div>
            </div>
            <div className="navbar-end">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                </button>
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </div>


    )
}

export default Navbar
