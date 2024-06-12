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
        DB::statement('ALTER VIEW statuses_view AS SELECT
            s.*,
            t.id AS table__id,
            t.name AS table__name,
            t.description AS table__description
        FROM statuses s
        LEFT JOIN tables t ON t.id = s.table_id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
