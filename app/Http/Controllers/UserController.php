<?php

namespace App\Http\Controllers;

use App\Http\Classes\dxResponse;
use App\Models\dxDataGrid;
use App\Models\ModelHasRoles;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use SoDe\Extend\Crypto;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class UserController extends Controller
{
    public function paginate(Request $request): HttpResponse|ResponseFactory
    {
        $response =  new dxResponse();
        try {
            $instance = User::select([
                'id', 'name', 'lastname', 'relative_id', 'email', 'status'
            ]);

            if ($request->group != null) {
                [$grouping] = $request->group;
                $selector = \str_replace('.', '__', $grouping['selector']);
                $instance = User::select([
                    "{$selector} AS key"
                ])
                    ->groupBy($selector);
            }

            if (!auth()->user()->can('users.root')) {
                $instance->whereNotNull('status');
            }
            if ($request->filter) {
                $instance->where(function ($query) use ($request) {
                    dxDataGrid::filter($query, $request->filter ?? []);
                });
            }

            if ($request->sort != null) {
                foreach ($request->sort as $sorting) {
                    $selector = \str_replace('.', '__', $sorting['selector']);
                    $instance->orderBy(
                        $selector,
                        $sorting['desc'] ? 'DESC' : 'ASC'
                    );
                }
            } else {
                $instance->orderBy('id', 'DESC');
            }

            $totalCount = $instance->count('*');
            $jpas = $request->isLoadingAll
                ? $instance->get()
                : $instance
                ->skip($request->skip ?? 0)
                ->take($request->take ?? 10)
                ->get();

            $results = [];

            foreach ($jpas as $jpa) {
                $result = JSON::unflatten($jpa->toArray(), '__');
                // unset($result['_business']);
                // $result['default'] = isset($result['id']) && $result['id'] == $session['setting']['status'];
                $results[] = $result;
            }

            $response->status = 200;
            $response->message = 'Operación correcta';
            $response->data = $results;
            $response->totalCount = $totalCount;
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage() . ' Ln.' . $th->getLine();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        try {
            $jpa = null;
            if ($request->id) {
                $jpa = User::find($request->id);
            }
            if (!$jpa) {
                if (!isset($request->password) || !isset($request->confirm)) throw new Exception('Debes ingresar una contraseña para el nuevo usuario');
                $jpa = new User();
                $jpa->relative_id = Crypto::randomUUID();
            }
            $jpa->name = $request->name;
            $jpa->lastname = $request->lastname;
            $jpa->email = $request->email;

            if (
                isset($request->password) && isset($request->confirm)
            ) {
                if (Controller::decode($request->password) == Controller::decode($request->confirm)) {
                    $jpa->password = password_hash(Controller::decode($request->password), PASSWORD_DEFAULT);
                } else throw new Exception('Las contraseñas deben ser iguales');
            }

            $jpa->save();

            ModelHasRoles::where('model_id', $jpa->id)
                ->where('model_type', User::class)
                ->delete();

            foreach ($request->roles as $role) {
                ModelHasRoles::create([
                    'role_id' => $role,
                    'model_id' => $jpa->id,
                    'model_type' => User::class
                ]);
            }

            $response->status = 200;
            $response->message = 'Operacion correcta';
            $response->data = $jpa->toArray();
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }

    static function status(Request $request)
    {
        $response = new Response();
        try {
            User::where('id', $request->id)
                ->update([
                    'status' => $request->status ? 0 : 1
                ]);

            $response->status = 200;
            $response->message = 'Operacion correcta';
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }

    static function delete(Request $request, string $id)
    {
        $response = new Response();
        try {
            $deleted = User::where('id', $id)
                ->update(['status' => null]);

            if (!$deleted) throw new Exception('No se ha eliminado ningun registro');

            $response->status = 200;
            $response->message = 'Operacion correcta';
        } catch (\Throwable $th) {
            $response->status = 400;
            $response->message = $th->getMessage();
        } finally {
            return response(
                $response->toArray(),
                $response->status
            );
        }
    }
}
