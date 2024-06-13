<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\Response;

class DashboardController
{
  public function revenue(Request $request, $range)
  {
    $response = new Response();
    try {

      $data = [];

      switch ($range) {
        case 'daily': // Diario
          $data = Payment::select([
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(amount) as total')
          ])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();
          break;
        case 'weekly': // Semanal
          $data = Payment::select([
            DB::raw('YEARWEEK(created_at) as week'),
            DB::raw('SUM(amount) as total')
          ])
            ->groupBy(DB::raw('YEARWEEK(created_at)'))
            ->get();
          break;
        case 'annually': // Anual
          $data = Payment::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('SUM(amount) as total')
          )
            ->groupBy(DB::raw('YEAR(created_at)'))
            ->get();
          break;
        default: // Mensual
          $data = Payment::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(amount) as total')
          )
            ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
            ->get();
          break;
      }

      $response->status = 200;
      $response->message = 'Operación correcta';
      $response->data = $data;
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
