export interface RootState {
    auth: {
        isLoggedIn: boolean;
        email: string | null;
        id: string | null;
        token: string | null;
        friends: string[] | null;
    };
}
export interface Booking {
    _id: string;
    date: string;
    timeSlot: string;
}
export interface PrivateRoutesProps {
    // children: React.ReactNode;
}
