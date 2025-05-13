create table if not exists exercise_logs (
    id uuid default uuid_generate_v4() primary key,
    workout_log_id uuid references workout_logs(id) on delete cascade,
    exercise_id uuid references exercises(id) on delete cascade,
    sets_completed integer,
    reps_completed integer,
    weight_kg numeric(5,2),
    duration_seconds integer,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);