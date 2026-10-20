export type UserRole = "student" | "faculty" | "organizer";

export type PrototypeView =
  | "home"
  | "search"
  | "start-here"
  | "events"
  | "opportunities"
  | "learning"
  | "projects"
  | "collaboration"
  | "journal"
  | "directory"
  | "mentors"
  | "passport"
  | "navigator"
  | "knowledge"
  | "command-center";

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  year: string; // e.g. "3rd Year, B.Tech CSE"
  department: string;
  rollNumberDemo: string;
  bio: string;
  skills: string[];
  interests: string[];
  projects: string[];
  collaborationStatus: string;
  githubDemo: string;
  linkedinDemo: string;
  visibility: "public" | "vosc_only" | "hidden";
  isOptedIn: boolean;
  contributionsCount: number;
}

export interface FacultyMentorProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  expertise: string[];
  mentorshipDomains: string[];
  researchAreas: string[];
  availability: "Available for Guidance" | "Limited Slots" | "Reviewing Projects";
  officeHoursDemo: string;
  bio: string;
  activeMenteesCount: number;
  featuredPublicationDemo: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  date: string; // e.g. "2026-10-18"
  time: string; // e.g. "04:30 PM - 06:30 PM"
  location: string; // e.g. "Auditorium / Lab 3 / Online"
  category: "Workshop" | "Hackathon" | "Open Source Sprint" | "Tech Talk" | "Community Meetup";
  status: "upcoming" | "past" | "closing_soon";
  description: string;
  speaker: string;
  speakerRole: string;
  prerequisites: string;
  registeredCount: number;
  capacity: number;
  isRegistered?: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: "General" | "Opportunities" | "Hackathon" | "Community" | "Urgent";
  author: string;
  authorRole: string;
  pinned?: boolean;
}

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  type: "interactive" | "code" | "video" | "reading";
  summary: string;
  completed?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  lessons: LessonItem[];
  progressPercent: number;
  badgeEarned?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  category:
    | "Web Development"
    | "Backend Engineering"
    | "AI & Machine Learning"
    | "Cybersecurity"
    | "Cloud & DevOps"
    | "Open Source"
    | "Programming Fundamentals"
    | "Data Structures & Algorithms";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  format: "Interactive Guide" | "Video Workshop" | "Hands-on Lab" | "Documentation";
  featured?: boolean;
  lessonsCount: number;
  author: string;
  tags: string[];
  externalDemoUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  domain: "Web & Cloud" | "AI / ML" | "Mobile & IoT" | "Systems & DevOps" | "Campus Tools";
  techStack: string[];
  status: "Seeking Contributors" | "In Active Development" | "Beta Released" | "Completed";
  difficulty: "Beginner Friendly" | "Intermediate" | "Advanced";
  teamSize: string;
  leadStudent: string;
  leadYear: string;
  openRoles: string[];
  repoPlaceholder: string;
  isFeatured?: boolean;
  hasExpressedInterest?: boolean;
  interestedRole?: string;
  starsCount: number;
}

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  type: "Internship" | "Hackathon" | "Research Position" | "Open Source Program" | "Competition";
  eligibility: string;
  deadline: string;
  locationType: "Remote" | "Hybrid" | "On-Campus" | "Hyderabad";
  stipendOrPrize: string;
  skills: string[];
  status: "Open" | "Closing Soon" | "Upcoming" | "Closed";
  description: string;
  applyDemoUrl: string;
  isSaved?: boolean;
  applicationStatus?: "not_applied" | "applied" | "interviewing";
}

export interface CollaborationRequest {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  spotsAvailable: number;
  projectContext: string;
  authorName: string;
  authorYear: string;
  authorDept: string;
  status: "Open" | "Filled";
  createdAt: string;
  hasExpressedInterest?: boolean;
  interestNotes?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentMarkdown: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  category: "Architecture" | "Open Source" | "AI Engineering" | "Git & Tools" | "Student Stories";
  readingTime: string;
  coverAccent: string;
  status: "published" | "pending_review";
  likesCount: number;
  isLiked?: boolean;
}

export interface CollegeKnowledgeItem {
  id: string;
  title: string;
  category:
    | "Academic Resources"
    | "Technical Clubs & Communities"
    | "Computing Labs & Facilities"
    | "Institutional Links"
    | "Student Support"
    | "Open Source & IP Guidelines"
    | "Student FAQs";
  summary: string;
  details: string;
  isVerifiedLink: boolean;
  actionText: string;
  actionUrlDemo: string;
  coordinatorOrContact: string;
  tags: string[];
}

export interface MentorshipRequest {
  id: string;
  studentName: string;
  studentEmailDemo: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  goal: string;
  guidanceType: "GSoC / Open Source Guidance" | "Project Architecture Review" | "Career & Placement Path" | "Research Mentorship";
  message: string;
  status: "pending" | "accepted" | "declined";
  submittedAt: string;
  responseNote?: string;
}

export interface StartHereStep {
  id: string;
  number: number;
  title: string;
  summary: string;
  guideMarkdown: string;
  checklist: string[];
  completed: boolean;
  resources: { title: string; linkView: PrototypeView }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: "event" | "opportunity" | "project" | "mentor" | "system";
  targetView: PrototypeView;
}

export interface ContributionActivity {
  id: string;
  title: string;
  category: "PR Merged" | "Workshop Attended" | "Project Milestone" | "Mentorship Session" | "Learning Path";
  date: string;
  points: number;
  details: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  earnedDate: string;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
}
