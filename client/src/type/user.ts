export interface user {
  _id?: number;
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  bio?: string;
  profileImage?: string;
  learningLanguage?: string;
  nativeLanguage?: string;
  location?: string;
  isOnboarded?: boolean;
  friends?: [user];
}

export interface isOnboard {
  bio: string;
  fullName: string;
  learningLanguage: string;
  location: string;
  nativeLanguage: string;
  profileImage: string;
}

export interface  login {
    email: string,
    password : string
}