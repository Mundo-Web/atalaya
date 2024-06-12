<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

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
            s.color AS client_status__color,
            (SELECT COUNT(p.id) FROM projects p WHERE p.client_id = c.id) AS projects
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
