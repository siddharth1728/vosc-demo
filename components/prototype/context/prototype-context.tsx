"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserRole,
  PrototypeView,
  StudentProfile,
  FacultyMentorProfile,
  EventItem,
  AnnouncementItem,
  LearningResource,
  LearningPath,
  StartHereStep,
  ProjectItem,
  OpportunityItem,
  CollaborationRequest,
  JournalArticle,
  CollegeKnowledgeItem,
  MentorshipRequest,
  NotificationItem,
  BadgeItem,
  ContributionActivity,
} from "../data/types";
import {
  initialStudents,
  initialMentors,
  initialEvents,
  initialAnnouncements,
  initialLearningResources,
  initialLearningPaths,
  initialStartHereSteps,
  initialProjects,
  initialOpportunities,
  initialCollaborationRequests,
  initialJournalArticles,
  initialCollegeKnowledge,
  initialMentorshipRequests,
  initialBadges,
  initialActivities,
  initialNotifications,
} from "../data/mock-data";
import { toast } from "sonner";

interface ModalItem {
  type:
    | "project"
    | "event"
    | "opportunity"
    | "student"
    | "mentor"
    | "article"
    | "collab"
    | "knowledge"
    | "lesson";
  data: any;
}

interface PrototypeContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: PrototypeView;
  setActiveView: (view: PrototypeView) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Datasets
  students: StudentProfile[];
  mentors: FacultyMentorProfile[];
  events: EventItem[];
  announcements: AnnouncementItem[];
  learningResources: LearningResource[];
  learningPaths: LearningPath[];
  startHereSteps: StartHereStep[];
  projects: ProjectItem[];
  opportunities: OpportunityItem[];
  collaborationRequests: CollaborationRequest[];
  journalArticles: JournalArticle[];
  collegeKnowledge: CollegeKnowledgeItem[];
  mentorshipRequests: MentorshipRequest[];
  badges: BadgeItem[];
  activities: ContributionActivity[];
  notifications: NotificationItem[];
  userPoints: number;

  // Active User Profile
  currentUserProfile: StudentProfile;
  updateProfileVisibility: (visibility: "public" | "vosc_only" | "hidden") => void;

  // Modals & Triggers
  selectedModalItem: ModalItem | null;
  openDetailModal: (type: ModalItem["type"], data: any) => void;
  closeDetailModal: () => void;
  isResetModalOpen: boolean;
  setIsResetModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // User Interactive Actions
  toggleEventRegistration: (eventId: string) => void;
  toggleSaveOpportunity: (oppId: string) => void;
  applyOpportunity: (oppId: string) => void;
  toggleProjectInterest: (projectId: string, roleName?: string) => void;
  toggleStartHereStep: (stepId: string) => void;
  toggleLessonCompleted: (pathId: string, lessonId: string) => void;
  toggleCollabInterest: (collabId: string, notes?: string) => void;
  createCollabRequest: (data: {
    title: string;
    description: string;
    requiredSkills: string[];
    spotsAvailable: number;
    projectContext: string;
  }) => void;
  submitMentorshipRequest: (data: {
    mentorId: string;
    mentorName: string;
    goal: string;
    guidanceType: MentorshipRequest["guidanceType"];
    message: string;
  }) => void;
  respondMentorshipRequest: (
    requestId: string,
    status: "accepted" | "declined",
    note?: string
  ) => void;
  submitJournalArticle: (data: {
    title: string;
    excerpt: string;
    contentMarkdown: string;
    category: JournalArticle["category"];
  }) => void;
  toggleArticleLike: (articleId: string) => void;

  // Organizer Actions
  createEvent: (event: Omit<EventItem, "id" | "registeredCount">) => void;
  updateEventStatus: (eventId: string, status: EventItem["status"]) => void;
  createAnnouncement: (ann: Omit<AnnouncementItem, "id" | "date">) => void;
  updateOpportunityStatus: (oppId: string, status: OpportunityItem["status"]) => void;
  reviewArticle: (articleId: string, approved: boolean) => void;

  // Notifications
  markNotificationRead: (notifId: string) => void;
  clearAllNotifications: () => void;

  // Gamification & Simulation
  simulateActivity: (
    title: string,
    category: ContributionActivity["category"],
    points: number
  ) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = "vosc_hub_prototype_state_v2";

const PrototypeContext = createContext<PrototypeContextType | undefined>(undefined);

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [role, setRoleState] = useState<UserRole>("student");
  const [activeView, setActiveViewState] = useState<PrototypeView>("home");
  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState<StudentProfile[]>(initialStudents);
  const [mentors, setMentors] = useState<FacultyMentorProfile[]>(initialMentors);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [learningResources, setLearningResources] = useState<LearningResource[]>(initialLearningResources);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(initialLearningPaths);
  const [startHereSteps, setStartHereSteps] = useState<StartHereStep[]>(initialStartHereSteps);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(initialOpportunities);
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>(initialCollaborationRequests);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(initialJournalArticles);
  const [collegeKnowledge, setCollegeKnowledge] = useState<CollegeKnowledgeItem[]>(initialCollegeKnowledge);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(initialMentorshipRequests);
  const [badges, setBadges] = useState<BadgeItem[]>(initialBadges);
  const [activities, setActivities] = useState<ContributionActivity[]>(initialActivities);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [userPoints, setUserPoints] = useState<number>(340);

  const [selectedModalItem, setSelectedModalItem] = useState<ModalItem | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role) setRoleState(parsed.role);
        if (parsed.activeView) setActiveViewState(parsed.activeView);
        if (parsed.students) setStudents(parsed.students);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.learningPaths) setLearningPaths(parsed.learningPaths);
        if (parsed.startHereSteps) setStartHereSteps(parsed.startHereSteps);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.opportunities) setOpportunities(parsed.opportunities);
        if (parsed.collaborationRequests) setCollaborationRequests(parsed.collaborationRequests);
        if (parsed.journalArticles) setJournalArticles(parsed.journalArticles);
        if (parsed.mentorshipRequests) setMentorshipRequests(parsed.mentorshipRequests);
        if (parsed.activities) setActivities(parsed.activities);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (typeof parsed.userPoints === "number") setUserPoints(parsed.userPoints);
      }
    } catch (e) {
      console.warn("Failed to parse prototype local state", e);
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave = {
        role,
        activeView,
        students,
        events,
        announcements,
        learningPaths,
        startHereSteps,
        projects,
        opportunities,
        collaborationRequests,
        journalArticles,
        mentorshipRequests,
        activities,
        notifications,
        userPoints,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Failed to persist prototype local state", e);
    }
  }, [
    isHydrated,
    role,
    activeView,
    students,
    events,
    announcements,
    learningPaths,
    startHereSteps,
    projects,
    opportunities,
    collaborationRequests,
    journalArticles,
    mentorshipRequests,
    activities,
    notifications,
    userPoints,
  ]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === "organizer") {
      setActiveViewState("command-center");
      toast.success("Switched to VOSC Organizer role", {
        description: "Viewing Organizer Command Center & administrative tools.",
      });
    } else if (newRole === "faculty") {
      setActiveViewState("mentors");
      toast.success("Switched to Faculty / Mentor role", {
        description: "Viewing mentorship requests & guidance dashboard.",
      });
    } else {
      setActiveViewState("home");
      toast.success("Switched to Student role", {
        description: "Viewing personalized Student Home & growth paths.",
      });
    }
  };

  const setActiveView = (view: PrototypeView) => {
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentUserProfile = students.find((s) => s.id === "std-1") || students[0];

  const updateProfileVisibility = (visibility: "public" | "vosc_only" | "hidden") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === currentUserProfile.id ? { ...s, visibility } : s))
    );
    toast.success(`Profile visibility updated to: ${visibility}`, {
      description: "Preferences saved to your local session.",
    });
  };

  const openDetailModal = (type: ModalItem["type"], data: any) => {
    setSelectedModalItem({ type, data });
  };

  const closeDetailModal = () => {
    setSelectedModalItem(null);
  };

  const toggleEventRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextRegistered = !ev.isRegistered;
          const nextCount = nextRegistered ? ev.registeredCount + 1 : Math.max(0, ev.registeredCount - 1);
          if (nextRegistered) {
            toast.success(`Registered for ${ev.title}!`, {
              description: "Simulated registration recorded. Check your Student Home.",
            });
            simulateActivity(`Registered: ${ev.title}`, "Workshop Attended", 20);
          } else {
            toast.info(`Cancelled registration for ${ev.title}`);
          }
          return {
            ...ev,
            isRegistered: nextRegistered,
            registeredCount: nextCount,
          };
        }
        return ev;
      })
    );
  };

  const toggleSaveOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === oppId) {
          const nextSaved = !opp.isSaved;
          toast(nextSaved ? "Saved opportunity to bookmarks" : "Removed opportunity from bookmarks");
          return { ...opp, isSaved: nextSaved };
        }
        return opp;
      })
    );
  };

  const applyOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === oppId) {
          toast.success(`Application submitted for ${opp.title}!`, {
            description: "Simulated application tracked in 'My Tracked Applications'.",
          });
          simulateActivity(`Applied: ${opp.title}`, "Project Milestone", 30);
          return { ...opp, applicationStatus: "applied" };
        }
        return opp;
      })
    );
  };

  const toggleProjectInterest = (projectId: string, roleName = "Contributor") => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const nextInterested = !proj.hasExpressedInterest;
          if (nextInterested) {
            toast.success(`Expressed interest in ${proj.title}!`, {
              description: `Role selected: ${roleName}. Lead notified in simulated review.`,
            });
            simulateActivity(`Joined Project Team: ${proj.title}`, "Project Milestone", 40);
          } else {
            toast.info(`Withdrew interest from ${proj.title}`);
          }
          return {
            ...proj,
            hasExpressedInterest: nextInterested,
            interestedRole: nextInterested ? roleName : undefined,
          };
        }
        return proj;
      })
    );
  };

  const toggleStartHereStep = (stepId: string) => {
    setStartHereSteps((prev) =>
      prev.map((st) => {
        if (st.id === stepId) {
          const nextCompleted = !st.completed;
          if (nextCompleted) {
            toast.success(`Completed Step ${st.number}: ${st.title}!`, {
              description: "Progress updated on your Student Home and Contribution Passport.",
            });
            simulateActivity(`Start Here Checkpoint: ${st.title}`, "Learning Path", 15);
          }
          return { ...st, completed: nextCompleted };
        }
        return st;
      })
    );
  };

  const toggleLessonCompleted = (pathId: string, lessonId: string) => {
    setLearningPaths((prev) =>
      prev.map((p) => {
        if (p.id === pathId) {
          const updatedLessons = p.lessons.map((l) =>
            l.id === lessonId ? { ...l, completed: !l.completed } : l
          );
          const completedCount = updatedLessons.filter((l) => l.completed).length;
          const nextProgress = Math.round((completedCount / updatedLessons.length) * 100);
          toast.success("Lesson completion updated", {
            description: `Learning path progress is now ${nextProgress}%.`,
          });
          simulateActivity(`Completed Lesson: ${p.title}`, "Learning Path", 25);
          return {
            ...p,
            lessons: updatedLessons,
            progressPercent: nextProgress,
          };
        }
        return p;
      })
    );
  };

  const toggleCollabInterest = (collabId: string, notes = "I'd love to collaborate on this!") => {
    setCollaborationRequests((prev) =>
      prev.map((c) => {
        if (c.id === collabId) {
          const next = !c.hasExpressedInterest;
          if (next) {
            toast.success("Interest expressed in collaboration request!", {
              description: "The post author will review your simulated request.",
            });
            simulateActivity(`Teammate Request: ${c.title}`, "Project Milestone", 20);
          }
          return { ...c, hasExpressedInterest: next, interestNotes: next ? notes : undefined };
        }
        return c;
      })
    );
  };

  const createCollabRequest = (data: {
    title: string;
    description: string;
    requiredSkills: string[];
    spotsAvailable: number;
    projectContext: string;
  }) => {
    const newRequest: CollaborationRequest = {
      id: `collab-${Date.now()}`,
      title: data.title,
      description: data.description,
      requiredSkills: data.requiredSkills,
      spotsAvailable: data.spotsAvailable,
      projectContext: data.projectContext,
      authorName: currentUserProfile.name,
      authorYear: currentUserProfile.year.split(",")[0],
      authorDept: currentUserProfile.department,
      status: "Open",
      createdAt: "Just now",
      hasExpressedInterest: false,
    };
    setCollaborationRequests((prev) => [newRequest, ...prev]);
    toast.success("Collaboration request posted successfully!", {
      description: "Visible to all students in the Collaboration Board.",
    });
    simulateActivity(`Created Collab Post: ${data.title}`, "Project Milestone", 25);
  };

  const submitMentorshipRequest = (data: {
    mentorId: string;
    mentorName: string;
    goal: string;
    guidanceType: MentorshipRequest["guidanceType"];
    message: string;
  }) => {
    const newReq: MentorshipRequest = {
      id: `req-${Date.now()}`,
      studentName: currentUserProfile.name,
      studentEmailDemo: currentUserProfile.rollNumberDemo + "@vce.ac.in",
      studentYear: currentUserProfile.year,
      mentorId: data.mentorId,
      mentorName: data.mentorName,
      goal: data.goal,
      guidanceType: data.guidanceType,
      message: data.message,
      status: "pending",
      submittedAt: "Today",
    };
    setMentorshipRequests((prev) => [newReq, ...prev]);
    toast.success(`Mentorship request sent to ${data.mentorName}!`, {
      description: "Switch to Faculty / Mentor role to simulate reviewing this request.",
    });
    simulateActivity(`Requested Mentorship with ${data.mentorName}`, "Mentorship Session", 20);
  };

  const respondMentorshipRequest = (
    requestId: string,
    status: "accepted" | "declined",
    note = "Session accepted. Check office hours."
  ) => {
    setMentorshipRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status, responseNote: note } : r
      )
    );
    toast.success(`Mentorship request marked as ${status}!`, {
      description: `Simulated student status updated.`,
    });
  };

  const submitJournalArticle = (data: {
    title: string;
    excerpt: string;
    contentMarkdown: string;
    category: JournalArticle["category"];
  }) => {
    const newArticle: JournalArticle = {
      id: `art-${Date.now()}`,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: data.title,
      excerpt: data.excerpt,
      contentMarkdown: data.contentMarkdown,
      authorName: currentUserProfile.name,
      authorRole: `${currentUserProfile.year} · VOSC Contributor`,
      publishedDate: "Pending Review",
      category: data.category,
      readingTime: "4 min read",
      coverAccent: "bg-indigo-50 border-indigo-200 text-indigo-900",
      status: "pending_review",
      likesCount: 0,
    };
    setJournalArticles((prev) => [newArticle, ...prev]);
    toast.success("Draft submitted to Engineering Journal editorial queue!", {
      description: "VOSC Organizers can review and publish this from the Command Center.",
    });
    simulateActivity(`Submitted Article: ${data.title}`, "Project Milestone", 35);
  };

  const toggleArticleLike = (articleId: string) => {
    setJournalArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          const nextLiked = !a.isLiked;
          const nextCount = nextLiked ? a.likesCount + 1 : Math.max(0, a.likesCount - 1);
          return { ...a, isLiked: nextLiked, likesCount: nextCount };
        }
        return a;
      })
    );
  };

  // Organizer operations
  const createEvent = (data: Omit<EventItem, "id" | "registeredCount">) => {
    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      ...data,
      registeredCount: 0,
      isRegistered: false,
    };
    setEvents((prev) => [newEvent, ...prev]);
    toast.success(`Event '${data.title}' published successfully!`, {
      description: "Now visible across the Events Calendar and Student Home.",
    });
  };

  const updateEventStatus = (eventId: string, status: EventItem["status"]) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, status } : e))
    );
    toast.info(`Event status updated to ${status}`);
  };

  const createAnnouncement = (data: Omit<AnnouncementItem, "id" | "date">) => {
    const newAnn: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      ...data,
      date: "Today",
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    toast.success(`Announcement '${data.title}' published!`, {
      description: "Pinned on the Student Home announcement widget.",
    });
  };

  const updateOpportunityStatus = (oppId: string, status: OpportunityItem["status"]) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, status } : o))
    );
    toast.info(`Opportunity status changed to ${status}`);
  };

  const reviewArticle = (articleId: string, approved: boolean) => {
    setJournalArticles((prev) =>
      prev.map((a) => {
        if (a.id === articleId) {
          const newStatus = approved ? "published" : "pending_review";
          return {
            ...a,
            status: newStatus,
            publishedDate: approved ? "Just now" : a.publishedDate,
          };
        }
        return a;
      })
    );
    toast.success(approved ? "Article approved and published!" : "Article sent back for revisions");
  };

  // Notifications
  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.info("All notifications marked as read");
  };

  // Simulation & Reset
  const simulateActivity = (
    title: string,
    category: ContributionActivity["category"],
    points: number
  ) => {
    const newAct: ContributionActivity = {
      id: `act-${Date.now()}`,
      title,
      category,
      date: "Today",
      points,
      details: "Simulated milestone recorded during prototype review.",
    };
    setActivities((prev) => [newAct, ...prev]);
    setUserPoints((prev) => prev + points);
  };

  const resetDemoData = () => {
    setRoleState("student");
    setActiveViewState("home");
    setStudents(initialStudents);
    setMentors(initialMentors);
    setEvents(initialEvents);
    setAnnouncements(initialAnnouncements);
    setLearningResources(initialLearningResources);
    setLearningPaths(initialLearningPaths);
    setStartHereSteps(initialStartHereSteps);
    setProjects(initialProjects);
    setOpportunities(initialOpportunities);
    setCollaborationRequests(initialCollaborationRequests);
    setJournalArticles(initialJournalArticles);
    setCollegeKnowledge(initialCollegeKnowledge);
    setMentorshipRequests(initialMentorshipRequests);
    setBadges(initialBadges);
    setActivities(initialActivities);
    setNotifications(initialNotifications);
    setUserPoints(340);
    localStorage.removeItem(STORAGE_KEY);
    setIsResetModalOpen(false);
    toast.success("Demo data reset to pristine state!", {
      description: "All modifications and simulated submissions cleared.",
    });
  };

  return (
    <PrototypeContext.Provider
      value={{
        role,
        setRole,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        students,
        mentors,
        events,
        announcements,
        learningResources,
        learningPaths,
        startHereSteps,
        projects,
        opportunities,
        collaborationRequests,
        journalArticles,
        collegeKnowledge,
        mentorshipRequests,
        badges,
        activities,
        notifications,
        userPoints,
        currentUserProfile,
        updateProfileVisibility,
        selectedModalItem,
        openDetailModal,
        closeDetailModal,
        isResetModalOpen,
        setIsResetModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toggleEventRegistration,
        toggleSaveOpportunity,
        applyOpportunity,
        toggleProjectInterest,
        toggleStartHereStep,
        toggleLessonCompleted,
        toggleCollabInterest,
        createCollabRequest,
        submitMentorshipRequest,
        respondMentorshipRequest,
        submitJournalArticle,
        toggleArticleLike,
        createEvent,
        updateEventStatus,
        createAnnouncement,
        updateOpportunityStatus,
        reviewArticle,
        markNotificationRead,
        clearAllNotifications,
        simulateActivity,
        resetDemoData,
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error("usePrototype must be used within a PrototypeProvider");
  }
  return context;
}
