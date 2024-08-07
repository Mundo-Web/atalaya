<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER VIEW clients_view AS SELECT
            c.*,
            s.id AS client_status__id,
            s.name AS client_status__name,
            s.description AS client_status__description,
            s.color AS client_status__color
        FROM clients c
        LEFT JOIN statuses s ON s.id = c.status_id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
