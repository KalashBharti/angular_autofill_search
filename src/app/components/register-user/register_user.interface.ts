interface RegisterUserModel {
    title: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
}

interface FormSubmissionStatus {
    success: boolean;
    message: string
}
export type { RegisterUserModel , FormSubmissionStatus}