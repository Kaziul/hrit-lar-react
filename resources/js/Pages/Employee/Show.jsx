import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

function Show({ employee }) {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Details
                    </h2>
                    <Link href={route('employees.index')} className='inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 false '>
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Employee" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        {
                            employee && (
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <label>Name</label>
                                        <p>{employee.name}</p>
                                    </div>
                                    <div>
                                        <label>Phone</label>
                                        <p>{employee.phone}</p>
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <p>{employee.email}</p>
                                    </div>
                                    <div>
                                        <label>Position</label>
                                        <p>{employee.position}</p>
                                    </div>
                                    <div>
                                        <label>Address</label>
                                        <p>{employee.address}</p>
                                    </div>
                                    <div>
                                        <label>Department</label>
                                        <p>{employee.department}</p>
                                    </div>
                                    <div>
                                        <label>Salary</label>
                                        <p>{employee.salary}</p>
                                    </div>
                                    <div>
                                        <label>Status</label>
                                        <p>{employee.status}</p>
                                    </div>
                                    <div>
                                        <label>Photo</label>
                                        <img src={
                                            '/photos/' + employee.photo
                                        } alt={employee.name} className='w-40 h-40' />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}

export default Show;