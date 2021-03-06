<?php

namespace App\Http\Controllers;

use App\DatosP;
use Illuminate\Http\Request;

class ApiDatosPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DatosP::orderBy('id', 'desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos = new DatosP;

        $datos->name     = $request->name;
        $datos->position = $request->position;
        $datos->salary   = $request->salary;
        $datos->save();

        return 'Datos guardados correctamente';

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DatosP $datosp)
    {

        $datosp->name     = $request->name;
        $datosp->position = $request->position;
        $datosp->salary   = $request->salary;
        $datosp->save();

        return 'Datos editados correctamente';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DatosP $datosp)
    {
        
        $datosp->delete();

        return 'Registro Eliminado Correctamente!';

    }
}
