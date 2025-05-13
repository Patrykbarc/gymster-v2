-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table exercises enable row level security;
alter table workouts enable row level security;
alter table workout_exercises enable row level security;
alter table workout_logs enable row level security;
alter table exercise_logs enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (auth.uid() = id);

create policy "Users can update own profile"
    on profiles for update
    using (auth.uid() = id);

create policy "Exercises are viewable by everyone"
    on exercises for select
    using (true);

create policy "Only admins can modify exercises"
    on exercises for all
    using (
        exists (
            select 1 from profiles
            where profiles.id = auth.uid()
            and profiles.role = 'admin'
        )
    );

create policy "Workouts are viewable by everyone if public"
    on workouts for select
    using (is_public = true or created_by = auth.uid());

create policy "Users can create workouts"
    on workouts for insert
    with check (auth.uid() = created_by);

create policy "Users can update own workouts"
    on workouts for update
    using (created_by = auth.uid());

create policy "Users can delete own workouts"
    on workouts for delete
    using (created_by = auth.uid());

create policy "Workout exercises are viewable with workout"
    on workout_exercises for select
    using (
        exists (
            select 1 from workouts
            where workouts.id = workout_exercises.workout_id
            and (workouts.is_public or workouts.created_by = auth.uid())
        )
    );

create policy "Users can manage workout exercises for own workouts"
    on workout_exercises for all
    using (
        exists (
            select 1 from workouts
            where workouts.id = workout_exercises.workout_id
            and workouts.created_by = auth.uid()
        )
    );

create policy "Users can view own workout logs"
    on workout_logs for select
    using (user_id = auth.uid());

create policy "Users can manage own workout logs"
    on workout_logs for all
    with check (user_id = auth.uid());

create policy "Users can view own exercise logs"
    on exercise_logs for select
    using (
        exists (
            select 1 from workout_logs
            where workout_logs.id = exercise_logs.workout_log_id
            and workout_logs.user_id = auth.uid()
        )
    );

create policy "Users can manage own exercise logs"
    on exercise_logs for all
    with check (
        exists (
            select 1 from workout_logs
            where workout_logs.id = exercise_logs.workout_log_id
            and workout_logs.user_id = auth.uid()
        )
    );
