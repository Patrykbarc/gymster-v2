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

INSERT INTO exercises (name, description, muscle_group, difficulty, equipment, instructions) VALUES
    ('Push-ups', 'Classic bodyweight exercise for chest and triceps', ARRAY['chest', 'triceps', 'shoulders'], 'beginner', ARRAY['bodyweight'], ARRAY['Start in a plank position', 'Lower your body until your chest nearly touches the floor', 'Push back up to starting position']),
    
    ('Squats', 'Fundamental lower body exercise', ARRAY['quadriceps', 'hamstrings', 'glutes'], 'beginner', ARRAY['bodyweight'], ARRAY['Stand with feet shoulder-width apart', 'Lower your body by bending knees and hips', 'Return to starting position']),
    
    ('Pull-ups', 'Upper body pulling exercise', ARRAY['back', 'biceps'], 'intermediate', ARRAY['pull-up bar'], ARRAY['Grab the bar with hands wider than shoulders', 'Pull your body up until chin is over the bar', 'Lower back down with control']),
    
    ('Plank', 'Core stability exercise', ARRAY['core', 'abs'], 'beginner', ARRAY['bodyweight'], ARRAY['Start in a push-up position', 'Bend your elbows and rest on your forearms', 'Keep your body straight and hold the position']),
    
    ('Lunges', 'Single-leg lower body exercise', ARRAY['quadriceps', 'hamstrings', 'glutes'], 'beginner', ARRAY['bodyweight'], ARRAY['Step forward with one leg', 'Lower your body until both knees are bent at 90 degrees', 'Push back to starting position']),
    
    ('Deadlift', 'Compound exercise for posterior chain', ARRAY['back', 'hamstrings', 'glutes'], 'intermediate', ARRAY['barbell'], ARRAY['Stand with feet hip-width apart', 'Bend at hips and knees to grab the bar', 'Lift by extending hips and knees']),
    
    ('Bench Press', 'Classic chest exercise', ARRAY['chest', 'triceps', 'shoulders'], 'intermediate', ARRAY['barbell', 'bench'], ARRAY['Lie on bench with feet flat on floor', 'Grip bar slightly wider than shoulders', 'Lower bar to chest and push back up']),
    
    ('Russian Twists', 'Core rotation exercise', ARRAY['core', 'obliques'], 'beginner', ARRAY['bodyweight'], ARRAY['Sit on floor with knees bent', 'Lean back and rotate torso from side to side', 'Keep core engaged throughout movement']),
    
    ('Dumbbell Rows', 'Back strengthening exercise', ARRAY['back', 'biceps'], 'beginner', ARRAY['dumbbell', 'bench'], ARRAY['Place one hand and knee on bench', 'Pull dumbbell up to hip', 'Lower with control']),
    
    ('Shoulder Press', 'Overhead pressing movement', ARRAY['shoulders', 'triceps'], 'intermediate', ARRAY['dumbbells'], ARRAY['Stand with feet shoulder-width apart', 'Press weights overhead', 'Lower back to shoulder height']);