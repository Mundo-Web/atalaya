<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            // $table->string('ruc')->unique();
            // $table->string('name'); // empresa
            // $table->string('description')->nullable();
            // $table->string('contact_name')->nullable(); // nombre
            // $table->string('contact_phone')->nullable(); // telefono
            // $table->string('contact_email')->nullable(); // email
            // $table->string('contact_address')->nullable();
            $table->string('contact_position')->nullable();  //cargo
            $table->string('message'); // mensaje
            $table->string('web_url'); // urlweb
            $table->string('source'); // source
            $table->string('date'); // fecha
            $table->string('time'); // hora
            $table->string('ip'); // ip
            $table->string('origin'); // llegade
            $table->string('client_width')->nullable(); // ancho
            $table->string('client_height')->nullable(); // alto
            $table->string('client_latitude')->nullable(); // latitud
            $table->string('client_longitude')->nullable(); // longitud
            $table->string('client_system')->nullable(); // sistema
            $table->unsignedBigInteger('status_id')->nullable();

            $table->foreign('status_id')->references('id')->on('statuses')->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign(['status_id']);
            $table->dropColumn('ruc');
            $table->dropColumn('name');
            $table->dropColumn('contact_position');
            $table->dropColumn('message');
            $table->dropColumn('web_url');
            $table->dropColumn('source');
            $table->dropColumn('date');
            $table->dropColumn('time');
            $table->dropColumn('ip');
            $table->dropColumn('origin');
            $table->dropColumn('client_width');
            $table->dropColumn('client_height');
            $table->dropColumn('client_latitude');
            $table->dropColumn('client_longitude');
            $table->dropColumn('client_system');
            $table->dropColumn('status_id');
        });
    }
};
