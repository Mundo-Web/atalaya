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
        DB::statement('ALTER VIEW projects_view AS
        SELECT
            p.*,
            c.id AS client__id,
            c.ruc AS client__ruc,
            c.name AS client__name,
            c.status AS client__status,
            t.id AS type__id,
            t.name AS type__name,
            s.id AS project_status__id,
            s.name AS project_status__name,
            s.color AS project_status__color,
            COALESCE(SUM(pymts.amount), 0) AS total_payments,
            COALESCE(p.cost - SUM(pymts.amount), p.cost) AS remaining_amount,
            MAX(pymts.created_at) AS last_payment_date,
            (SELECT payment_type
            FROM payments p2
            WHERE p2.project_id = p.id
            ORDER BY p2.created_at DESC
            LIMIT 1) AS last_payment_type
        FROM projects p
        INNER JOIN clients c ON c.id = p.client_id
        INNER JOIN types t ON t.id = p.type_id
        INNER JOIN statuses s ON s.id = p.status_id
        LEFT JOIN payments pymts ON pymts.project_id = p.id
        GROUP BY
            p.id, p.type_id, p.client_id, p.status_id, p.name, p.description, p.cost, p.signed_at, p.starts_at, p.ends_at, p.visible, p.status, p.created_at, p.updated_at, c.id, c.ruc, c.name, c.status, t.id, t.name, s.id, s.name, s.color');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
