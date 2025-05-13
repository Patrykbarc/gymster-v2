create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_workouts_created_by on workouts(created_by);
create index if not exists idx_workout_exercises_workout_id on workout_exercises(workout_id);
create index if not exists idx_workout_logs_user_id on workout_logs(user_id);
create index if not exists idx_exercise_logs_workout_log_id on exercise_logs(workout_log_id);