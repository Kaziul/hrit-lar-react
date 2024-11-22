import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ employees, queryParams = null, success }) {
    queryParams = queryParams || {};
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('employees.index', queryParams));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Employee
                    </h2>
                    <Link href={route('employees.create')} className='inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 false '>
                        Create
                    </Link>
                </div>
            }
        >
            <Head title="Employee" />
            <div className="py-12">
                {success && <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">{success}</div>}

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className='overflow-auto'>
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className='bg-gray-50 '>
                                    <tr>
                                        <TableHeading className="px-4 py-2" name="name" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Name</TableHeading>
                                        <TableHeading className="px-4 py-2" name="phone" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Phone</TableHeading>
                                        <TableHeading className="px-4 py-2" name="email" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Email</TableHeading>
                                        <TableHeading className="px-4 py-2" name="position" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Position</TableHeading>
                                        <TableHeading className="px-4 py-2" name="address" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Address</TableHeading>
                                        <TableHeading className="px-4 py-2" name="department" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Department</TableHeading>
                                        <TableHeading className="px-4 py-2" name="salary" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Salary</TableHeading>
                                        <TableHeading className="px-4 py-2" name="photo" sortChanged={sortChanged} sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}>Photo</TableHeading>
                                        <th className="px-4 py-2" >Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {employees.data.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-4 py-2 border">{employee.name}</td>
                                            <td className="px-4 py-2 border">{employee.phone}</td>
                                            <td className="px-4 py-2 border">{employee.email}</td>
                                            <td className="px-4 py-2 border">{employee.position}</td>
                                            <td className="px-4 py-2 border">{employee.address}</td>
                                            <td className="px-4 py-2 border">{employee.department}</td>
                                            <td className="px-4 py-2 border">{employee.salary}</td>
                                            <td className="px-4 py-2 border">{employee?.photo ? (
                                                <img
                                                    src={`/photos/${employee.photo}`}
                                                    alt={`${employee.name || 'Employee'}'s photo`}
                                                    className="mt-2 rounded-full w-14 h-14"
                                                />
                                            ) : (
                                                <p className="mt-2">No photo available</p>
                                            )}</td>
                                            <td className="px-4 py-2 border">
                                                <Link href={route('employees.edit', employee.id)} className='btn btn-primary'>Edit</Link>
                                                <Link href={route('employees.show', employee.id)} className='ml-2 btn btn-primary'>Show</Link>
                                                <Link href={route('employees.destroy', employee.id)} method='delete' as='button' className='ml-2 btn btn-primary'>Delete</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={employees.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
