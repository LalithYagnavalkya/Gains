import Classification from "../models/classification.model";

export const parseDate = (dateString: string, format: string): Date => {
    const parts = dateString.split('-');
    let day, month, year;
    if (parts.length === 3) {
        if (format === 'dd-mm-yy' || format === 'dd-mm-yyyy') {
            [day, month, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }
        else if (format === 'mm-dd-yy' || format === 'mm-dd-yyyy') {
            [month, day, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }

    }
    // Return a default value if parsing fails
    return new Date();
}

export const parseWorkoutTypes = async (workoutTypes: string[]): Promise<{ error: boolean, message?: string, updatedWorkoutTypes: string[] }> => {
    const _workoutTypes = await Classification.find({ type: 'WORKOUT_TYPE' }).select('key value').lean();
    const _keys = _workoutTypes.map(x => x.key);
    const updatedWorkoutTypes: string[] = [];

    for (const x of workoutTypes) {
        if (!_keys.includes(x.toLocaleLowerCase())) {
            return { error: true, message: `Invalid workout type: ${x}`, updatedWorkoutTypes: [] };
        }
        const updatedType = _workoutTypes.find(item => item.key === x.toLocaleLowerCase())?.value || '';
        updatedWorkoutTypes.push(updatedType);
    }
    return { error: false, updatedWorkoutTypes }
}
