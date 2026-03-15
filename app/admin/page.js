"use client";
import { useEffect, useMemo, useState } from "react";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/save-projects", { cache: "no-store" });
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const previewImage = useMemo(() => {
    if (imageUrl) return imageUrl;
    if (imageFile) return URL.createObjectURL(imageFile);
    return "";
  }, [imageUrl, imageFile]);

  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    if (!imageFile && !imageUrl.trim()) {
      alert("Add an image (upload or URL)");
      return;
    }

    setSaving(true);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const imageValue = imageFile ? await toBase64(imageFile) : imageUrl.trim();

      const newProject = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        image: imageValue,
      };

      // Update local state to show immediately
      const updated = [...projects, newProject];
      setProjects(updated);

      // Send ONLY the new project to API - API will concatenate with existing
      await fetch("/api/save-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setImageUrl("");
    } catch (error) {
      console.error("Unable to save project", error);
      alert("حدث خطأ أثناء الحفظ. حاول مرة أخرى");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-6">لوحة التحكم</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4 bg-neutral-900/70 border border-neutral-800 rounded-xl p-5">
            <h2 className="text-xl font-medium">إضافة مشروع جديد</h2>
            <input
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="العنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
              placeholder="الوصف"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="التصنيف (اختياري)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">ارفع صورة (Base64 يحفظ تلقائياً)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
              <div className="relative">
                <input
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="أو ضع رابط صورة (اختياري)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <p className="text-xs text-neutral-400 mt-1">إذا وُجد ملف مرفوع سيتم تجاهل الرابط</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              disabled={saving}
              className="w-full rounded-lg bg-teal-500 text-neutral-950 font-semibold py-2 hover:bg-teal-400 transition disabled:opacity-60"
            >
              {saving ? "...جاري الحفظ" : "حفظ المشروع"}
            </button>
            {previewImage && (
              <div className="rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden">
                <img src={previewImage} alt="preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">المشاريع الحالية</h2>
              {loading && <span className="text-sm text-neutral-400">تحميل...</span>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 space-y-3">
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-800">
                    {project.image ? (
                      <img src={project.image} alt={project.title || "project"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-neutral-500 text-sm">No image</div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-neutral-300">{project.description}</p>
                    {project.category && <p className="text-xs text-teal-300 mt-1">{project.category}</p>}
                  </div>
                </div>
              ))}
              {!projects.length && !loading && (
                <p className="text-neutral-400">لا توجد مشاريع بعد.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
