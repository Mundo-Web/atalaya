<?php

namespace App\Http\Controllers;

use App\Http\Classes\dxResponse;
use App\Models\dxDataGrid;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use SoDe\Extend\JSON;
use SoDe\Extend\Response;

class UsersController extends Controller
{
    public function all(Request $request): HttpResponse|ResponseFactory
    {
        $response = new Response();
        $session = $request->user;
        try {
            $jpas = User::select(['id', 'status_name', 'description', 'sorting', 'color', '_business', 'status'])
                ->where('_business', $session['session']['business'])
                ->whereNotNull('status')
                ->orderBy('sorting', 'ASC')
                ->get();

            $results = [];
            foreach ($jpas as $jpa) {
                $result = JSON::unflatten($jpa->toArray(), '__');
                unset($result['_business']);
                $result['default'] = $result['id'] == $session['setting']['status'];
                $results[] = $result;
            }

            $response->status = 200;
            $response->message = 'Operacion correcta';
            $response->data = $results;
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
    public function paginate(Request $request): HttpResponse|ResponseFactory
    {
        $response =  new dxResponse();
        try {
            $instance = User::select([
                'id', 'name', 'lastname', 'email', 'status'
            ]);

            if ($request->group != null) {
                [$grouping] = $request->group;
                $selector = \str_replace('.', '__', $grouping['selector']);
                $instance = User::select([
                    "{$selector} AS key"
                ])
                    ->groupBy($selector);
            }

            $instance->whereNotNull('status');
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
                if (!isset($request->password) || !isset($request->confirm))
                $jpa = new User();
            }
            $jpa->name = $request->name;
            $jpa->lastname = $request->lastname;
            $jpa->email = $request->email;

            if (
                isset($request->password) && isset($request->confirm) 
            ) {
                if (Controller::decode($request->password) == Controller::decode($request->confirm)) {
                    $jpa ->password = password_hash($request->password, PASSWORD_DEFAULT);
                } throw new Exception('Las contraseñas deben ser iguales');
            }

            $jpa->save();

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

    static function status(Request $request, string $id)
    {
        $response = new Response();
        $session = $request->user;
        try {
            User::where('_business', $session['session']['business'])
                ->where('id', $id)
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
        $session = $request->user;
        try {
            $deleted = User::where('_business', $session['session']['business'])
                ->where('id', $id)
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
