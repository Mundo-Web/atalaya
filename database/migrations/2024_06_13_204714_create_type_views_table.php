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
        DB::statement('CREATE VIEW types_view AS SELECT
            t.*,
            tb.id AS table__id,
            tb.name AS table__name,
            tb.description AS table__description
        FROM types t
        LEFT JOIN tables tb ON tb.id = t.table_id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW clients_view');
    }
};
