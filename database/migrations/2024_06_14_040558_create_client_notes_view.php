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
        DB::statement('CREATE VIEW client_notes_view AS SELECT
            cn.*,
            t.id AS type__id,
            t.name AS type__name,
            u.id AS user__id,
            u.name AS user__name,
            u.lastname AS user__lastname,
            u.relative_id AS user__relative_id,
            u.updated_at AS user__updated_at,
            u.created_at AS user__created_at
        FROM client_notes cn
        LEFT JOIN types t ON t.id = cn.type_id
        LEFT JOIN users u ON u.id = cn.user_id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW client_notes_view');
    }
};
