"use client";

import React, { useState } from "react";
import { usePrototype } from "../context/prototype-context";
import {
  Sparkles,
  Search,
  Plus,
  BookOpen,
  Clock,
  Heart,
  ChevronRight,
  Send,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function EngineeringJournalView() {
  const {
    journalArticles,
    submitJournalArticle,
    toggleArticleLike,
    openDetailModal,
  } = usePrototype();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [category, setCategory] = useState<any>("Architecture");
  const [formError, setFormError] = useState("");

  const categories = ["All", "Architecture", "Open Source", "AI Engineering", "Git & Tools", "Student Stories"];

  const publishedArticles = journalArticles.filter((a) => a.status === "published");
  const pendingArticles = journalArticles.filter((a) => a.status === "pending_review");

  const filteredArticles = publishedArticles.filter((a) => {
    const matchesCat = categoryFilter === "All" || a.category === categoryFilter;
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.authorName.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !contentMarkdown.trim()) {
      setFormError("Please fill out the title, excerpt, and content.");
      return;
    }
    submitJournalArticle({
      title: title.trim(),
      excerpt: excerpt.trim(),
      contentMarkdown: contentMarkdown.trim(),
      category,
    });
    setTitle("");
    setExcerpt("");
    setContentMarkdown("");
    setFormError("");
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
            Engineering Journal
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            In-depth architectural breakdowns, systems engineering reflections, and open-source
            deep dives written by Vasavi students, faculty, and alumni.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow-2xs self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit an Article</span>
        </button>
      </div>

      {/* Pending Draft Notice if any */}
      {pendingArticles.length > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span>
            You have <strong>{pendingArticles.length} submitted draft(s)</strong> awaiting review in the Organizer Command Center queue.
          </span>
          <span className="font-mono text-[10px] text-amber-700">Editorial Review</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, keyword, or author..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === c
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {article.category}
                </span>
                <span className="text-zinc-400 font-mono text-[11px]">{article.readingTime}</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2 text-xs text-zinc-500 font-mono flex items-center justify-between">
                <span>By {article.authorName}</span>
                <span>{article.publishedDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleArticleLike(article.id)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  article.isLiked ? "text-rose-600 font-semibold" : "text-zinc-500 hover:text-rose-600"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${article.isLiked ? "fill-rose-600" : ""}`} />
                <span>{article.likesCount}</span>
              </button>

              <button
                onClick={() => openDetailModal("article", article)}
                className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Read Article <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Article Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                Submit an Engineering Article
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., How We Scaled the College Registration Bot"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                  >
                    <option>Architecture</option>
                    <option>Open Source</option>
                    <option>AI Engineering</option>
                    <option>Git & Tools</option>
                    <option>Student Stories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Short Excerpt / TL;DR *
                  </label>
                  <input
                    type="text"
                    placeholder="1-2 sentences summarizing the article"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Article Content (Markdown supported) *
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your technical article with code blocks, headings, and lessons..."
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-medium text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs hover:opacity-90"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
