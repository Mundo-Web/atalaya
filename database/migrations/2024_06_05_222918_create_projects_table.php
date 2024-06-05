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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('status_id')->default(1);
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('cost')->default(0);
            $table->timestamp('signed_at')->nullable();
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->boolean('visible')->default(true);
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('types');
            $table->foreign('client_id')->references('id')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
