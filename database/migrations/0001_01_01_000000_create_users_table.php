<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('name', 30);
            $table->string('surname', 30);
            $table->string('phone_number', 20)->nullable();
            $table->string('email', 50);
            $table->boolean('email_confirmed')->default(false);
            $table->string('password_hash', 256);
            $table->string('profile_picture_path', 100)->nullable();
            $table->string('role', 20)->nullable()->default('user');
            $table->string('verification_token_hash', 256)->nullable();
            $table->string('password_reset_token_hash', 256)->nullable();
            $table->timestamps();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        DB::unprepared("
            CREATE TRIGGER prevent_duplicate_confirmed_email
            BEFORE INSERT ON users
            FOR EACH ROW
            BEGIN
                DECLARE confirmed_count INT DEFAULT 0;

                -- Count number of users with the same email that are confirmed
                SELECT COUNT(*) INTO confirmed_count
                FROM users
                WHERE email = NEW.email AND email_confirmed = TRUE;

                -- If any confirmed email already exists, disallow insert
                IF confirmed_count > 0 THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Cannot insert: email is already confirmed by another user.';
                END IF;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER prevent_update_to_confirmed_email
            BEFORE UPDATE ON users
            FOR EACH ROW
            BEGIN
                DECLARE confirmed_count INT DEFAULT 0;

                IF NEW.email != OLD.email THEN
                    SELECT COUNT(*) INTO confirmed_count
                    FROM users
                    WHERE email = NEW.email AND email_confirmed = TRUE AND user_id != OLD.user_id;

                    IF confirmed_count > 0 THEN
                        SIGNAL SQLSTATE '45000'
                        SET MESSAGE_TEXT = 'Cannot update: email is already confirmed by another user.';
                    ELSE
                        SET NEW.email_confirmed = FALSE;
                    END IF;
                END IF;
            END;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        DB::unprepared("DROP TRIGGER IF EXISTS prevent_duplicate_confirmed_email;");
        DB::unprepared("DROP TRIGGER IF EXISTS prevent_update_to_confirmed_email;");

        Schema::dropIfExists('users');
        Schema::dropIfExists('sessions');
    }
};
