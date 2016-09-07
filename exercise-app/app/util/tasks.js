export default [
    {
        id: 0,
        title: 'Stretch',
        days: [1,3,5], // Represents days in which this task should be performed. Sunday = 0, Monday = 1, etc
        order: [0] // The ordering in shich this item should be completed. Will be duplicated if multiple numbers provided
    },
    {
        id: 1,
        title: 'Warm Up with Cardio',
        days: [1,3,5],
        order: [1],
        timer: 5 * 60 * 1000 // Run for 5 minutes by default
    },
    {
        id: 2,
        title: 'One-arm Dumbbell Military Press',
        days: [1],
        order: [2,4],
        reps: 6,
        weight: 0 // No default weight
    },
    {
        id: 3,
        title: 'Lateral Pulldown',
        days: [1,5],
        order: [3,5],
        reps: 6,
        weight: 0
    },
    {
        id: 4,
        title: 'Barbell Deadlift',
        days: [1,5],
        order: [6,8],
        reps: 3,
        weight: 0
    },
    {
        id: 5,
        title: 'Slow and Controlled Sit-Ups',
        days: [1],
        order: [7,9],
        reps: 10
    },
    {
        id: 6,
        title: 'Double Dumbbell Military Press',
        days: [3],
        order: [2,4],
        reps: 6,
        weight: 0
    },
    {
        id: 7,
        title: 'One-arm Dumbbell Bent-over Row (each side)',
        days: [3],
        order: [3,5],
        reps: 6,
        weight: 0
    },
    {
        id: 8,
        title: 'Dumbbell Squat',
        days: [3],
        order: [6,8],
        reps: 6,
        weight: 0
    },
    {
        id: 9,
        title: 'Dumbbell Lunge (each side)',
        days: [3],
        order: [7,9],
        reps: 6,
        weight: 0
    },
    {
        id: 10,
        title: 'Bench Press',
        days: [5],
        order: [2,4],
        reps: 6,
        weight: 0
    },
    {
        id: 11,
        title: 'Hanging Leg Raise',
        days: [5],
        order: [7,9],
        reps: 5
    }
];
