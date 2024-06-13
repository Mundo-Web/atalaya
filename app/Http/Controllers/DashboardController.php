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
            DB::raw('IFNULL(DATE(date), DATE(created_at)) as date'),
            DB::raw('SUM(amount) as total')
          ])
            ->groupBy(DB::raw('IFNULL(DATE(date), DATE(created_at))'))
            ->get();
          break;
        case 'weekly': // Semanal
          $data = Payment::select([
            DB::raw('IFNULL(YEARWEEK(date), YEARWEEK(created_at)) as week'),
            DB::raw('SUM(amount) as total')
          ])
            ->groupBy(DB::raw('IFNULL(YEARWEEK(date), YEARWEEK(created_at))'))
            ->get();
          break;
        case 'annually': // Anual
          $data = Payment::select(
            DB::raw('IFNULL(YEAR(date), YEAR(created_at)) as year'),
            DB::raw('SUM(amount) as total')
          )
            ->groupBy(DB::raw('IFNULL(YEAR(date), YEAR(created_at))'))
            ->get();
          break;
        default: // Mensual
          $data = Payment::select(
            DB::raw('IFNULL(YEAR(date), YEAR(created_at)) as year'),
            DB::raw('IFNULL(MONTH(date), MONTH(created_at)) as month'),
            DB::raw('SUM(amount) as total')
          )
            ->groupBy(DB::raw('IFNULL(YEAR(date), YEAR(created_at))'), DB::raw('IFNULL(MONTH(date), MONTH(created_at))'))
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
