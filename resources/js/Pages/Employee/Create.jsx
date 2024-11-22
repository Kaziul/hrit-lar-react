import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ employee = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: employee?.id || '',
        name: employee?.name || '',
        phone: employee?.phone || '',
        email: employee?.email || '',
        position: employee?.position || '',
        address: employee?.address || '',
        department: employee?.department || '',
        salary: employee?.salary || '',
        photo: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('employees.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {employee ? 'Edit' : 'Create'} Employee
                    </h2>
                    <Link href={route('employees.index')} className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 false ">
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Employee" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <form onSubmit={submit} encType="multipart/form-data">
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}

                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="Phone" />

                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        className="block w-full mt-1"
                                        autoComplete="phone"
                                        isFocused={true}
                                        onChange={(e) => setData('phone', e.target.value)}

                                    />

                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full mt-1"
                                        autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)}

                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="position" value="Position" />

                                    <TextInput
                                        id="position"
                                        type="text"
                                        name="position"
                                        value={data.position}
                                        className="block w-full mt-1"
                                        autoComplete="position"
                                        onChange={(e) => setData('position', e.target.value)}

                                    />

                                    <InputError message={errors.position} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="address" value="Address" />

                                    <TextInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="block w-full mt-1"
                                        autoComplete="address"
                                        onChange={(e) => setData('address', e.target.value)}

                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="department" value="Department" />

                                    <TextInput
                                        id="department"
                                        type="text"
                                        name="department"
                                        value={data.department}
                                        className="block w-full mt-1"
                                        autoComplete="department"
                                        onChange={(e) => setData('department', e.target.value)}

                                    />

                                    <InputError message={errors.department} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="salary" value="Salary" />

                                    <TextInput
                                        id="salary"
                                        type="text"
                                        name="salary"
                                        value={data.salary}
                                        className="block w-full mt-1"
                                        autoComplete="salary"
                                        onChange={(e) => setData('salary', e.target.value)}

                                    />

                                    <InputError message={errors.salary} className="mt-2" />
                                </div>
                                {/* Additional fields */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="photo" value="Photo" />
                                    <TextInput
                                        id="photo"
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                    />
                                    {employee?.photo ? (
                                        <img
                                            src={`/photos/${employee.photo}`}
                                            alt={`${employee.name || 'Employee'}'s photo`}
                                            className="w-24 h-24 mt-2 rounded-full"
                                        />
                                    ) : (
                                       ''
                                    )}
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-8">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
