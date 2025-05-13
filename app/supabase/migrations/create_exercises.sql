create table if not exists exercises (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    muscle_group text[],
    difficulty difficulty_level not null,
    equipment text[],
    instructions text[],
    video_url text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);