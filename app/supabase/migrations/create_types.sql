create type user_role as enum ('admin', 'user', 'trainer');
create type subscription_status as enum ('active', 'inactive', 'pending');
create type workout_type as enum ('strength', 'cardio', 'flexibility', 'hiit', 'custom');
create type difficulty_level as enum ('beginner', 'intermediate', 'advanced', 'expert');