export interface Course {
  id: string;
  userId: string;

  title: string;
  description: string;   
  videoUrl: string;   

  category: string[];
  level: "Beginner" | "Intermediate" | "Advanced";

  price: number;

  views: number;
  whisList: string[];

  createdAt: string;
}
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}