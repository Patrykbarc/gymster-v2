create table if not exists workouts (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    type workout_type not null,
    difficulty difficulty_level not null,
    duration_minutes integer,
    calories_burn integer,
    created_by uuid references profiles(id) on delete cascade,
    is_public boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);