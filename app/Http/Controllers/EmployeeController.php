<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Employee::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

        $employees = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);


        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Pass a default value or an employee object if editing
        return Inertia::render('Employee/Create', [
            'employee' => null, // Or pass the employee object for editing
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $request->id,
            'phone' => 'required|unique:employees,phone,' . $request->id,
            'photo' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->id) {
            $employee = Employee::find($request->id);
        } else {
            $employee = new Employee();
        }
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->position = $request->position;
        $employee->department = $request->department;
        $employee->salary = $request->salary;

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete existing photo if available
            if ($employee->photo && file_exists(public_path('photos/' . $employee->photo))) {
                unlink(public_path('photos/' . $employee->photo));
            }

            // Upload new photo
            $photo = $request->file('photo');
            $photo_name = time() . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('photos'), $photo_name);
            $employee->photo = $photo_name;
        }


        if ($request->id) {
            $employee->update();
        } else {
            $employee->save();
        }
        return redirect()->route('employees.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $employee = Employee::find($id);
        return Inertia::render('Employee/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Create', [
            'employee' => $employee,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if ($employee->photo && file_exists(public_path('photos/' . $employee->photo))) {
            unlink(public_path('photos/' . $employee->photo));
        }
        $employee->delete();
        return redirect()->route('employees.index');
    }
}
