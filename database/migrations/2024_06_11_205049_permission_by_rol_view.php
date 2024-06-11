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
        DB::statement('CREATE VIEW permissions_by_rol AS SELECT
            r.id AS role__id,
            r.name AS role__name,
            r.description AS role__description,
            p.id AS permission__id,
            p.name AS permission__name,
            p.description AS permission__description
        FROM role_has_permissions rhp
        INNER JOIN permissions p ON p.id = rhp.permission_id
        INNER JOIN roles r ON r.id = rhp.role_id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW permissions_by_rol');
    }
};
