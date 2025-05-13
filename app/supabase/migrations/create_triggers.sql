-- Create functions and triggers for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers for all tables
create trigger update_profiles_updated_at
    before update on profiles
    for each row
    execute function update_updated_at_column();

create trigger update_exercises_updated_at
    before update on exercises
    for each row
    execute function update_updated_at_column();

create trigger update_workouts_updated_at
    before update on workouts
    for each row
    execute function update_updated_at_column();

create trigger update_workout_exercises_updated_at
    before update on workout_exercises
    for each row
    execute function update_updated_at_column();

create trigger update_workout_logs_updated_at
    before update on workout_logs
    for each row
    execute function update_updated_at_column();

create trigger update_exercise_logs_updated_at
    before update on exercise_logs
    for each row
    execute function update_updated_at_column();