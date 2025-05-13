create table if not exists workout_exercises (
    id uuid default uuid_generate_v4() primary key,
    workout_id uuid references workouts(id) on delete cascade,
    exercise_id uuid references exercises(id) on delete cascade,
    sets integer,
    reps integer,
    duration_seconds integer,
    rest_seconds integer,
    order_position integer not null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);