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
            s.color AS client_status__color,
            u.id AS user_assigned__id,
            u.name AS user_assigned__name,
            u.lastname AS user_assigned__lastname,
            u.relative_id AS user_assigned__relative_id,
            (SELECT COUNT(p.id) FROM projects p WHERE p.client_id = c.id AND status = 1) AS projects,
            (SELECT COUNT(n.id) FROM client_notes n WHERE n.client_id = c.id) AS notes
        FROM clients c
        LEFT JOIN statuses s ON s.id = c.status_id
        LEFT JOIN users u ON u.id = c.assigned_to');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
