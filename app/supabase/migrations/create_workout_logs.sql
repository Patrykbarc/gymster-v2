create table if not exists workout_logs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references profiles(id) on delete cascade,
    workout_id uuid references workouts(id) on delete cascade,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone,
    completed boolean default false,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);