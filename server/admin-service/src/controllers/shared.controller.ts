import { Model, Document } from "mongoose";

// models
import Classification from "../models/classification.model";

// types
import { PaginatedResults } from "../types/types";

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

export const paginateResults = async <T extends Document>(
    model: Model<T>,
    query: Record<string, any>,
    pageNumber: number = 1,
    limit: number = 5,
    sortField?: string,
    sortDirection?: -1 | 1,
    select?: string
): Promise<PaginatedResults<T>> => {

    if (pageNumber < 1) {
        // throw new AppError(400, 'Page must be a positive integer');
    }

    const skip = (pageNumber - 1) * limit;

    let queryBuilder = model.find(query).skip(skip).limit(limit);

    if (sortField && sortDirection) {
        const sortOptions: Record<string, -1 | 1> = {
            [sortField]: sortDirection,
        };
        queryBuilder = queryBuilder.sort(sortOptions);
    }

    if (select) {
        queryBuilder = queryBuilder.select(select);
    }

    const results = await queryBuilder.lean() as T[];

    const totalCount = await model.countDocuments(query);

    return {
        totalCount,
        data: results,
    };
};

