export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string;
  photoURL: string | null;
  targetSchools?: string[];
  gmatScore?: number;
  workExperience?: number;
  role: UserRole;
  createdAt: any; // Firestore Timestamp
}

export type ConsultationStatus = 'pending' | 'contacted' | 'completed';

export interface ConsultationRequest {
  id: string;
  userId: string;
  name: string;
  email: string;
  message?: string;
  status: ConsultationStatus;
  createdAt: any; // Firestore Timestamp
}

export type ApplicationStatus = 'not-started' | 'in-progress' | 'submitted' | 'interview-invite' | 'accepted' | 'waitlisted' | 'rejected';

export interface Application {
  id: string;
  userId: string;
  schoolName: string;
  round?: string;
  deadline?: string;
  status: ApplicationStatus;
  notes?: string;
  updatedAt: any; // Firestore Timestamp
}

export type ResourceCategory = 'GMAT' | 'Essays' | 'Interviews' | 'Networking';

export interface Resource {
  id: string;
  title: string;
  description?: string;
  category: ResourceCategory;
  content: string;
  author?: string;
  createdAt: any; // Firestore Timestamp
}
