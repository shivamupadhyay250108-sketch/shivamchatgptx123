import { useState } from "react";
import { saveProfile } from "../../services/profile.service";

export default function ProfileForm() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    category: "",
    annualIncome: "",
    occupation: "",
    education: "",
    disability: false,
    farmer: false,
    startupFounder: false,
    student: false,
  });

  function updateField(
    key: string,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit() {
    saveProfile({
      fullName: form.fullName,
      age: Number(form.age),
      gender: form.gender,
      state: form.state,
      district: form.district,
      category: form.category,
      annualIncome: Number(form.annualIncome),
      occupation: form.occupation,
      education: form.education,
      disability: form.disability,
      farmer: form.farmer,
      startupFounder: form.startupFounder,
      student: form.student,
    });

    alert("✅ Profile Saved Successfully!");
  }

  return (
    <div className="rounded-[32px] border border-cyan-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold text-white">
        AI Welfare Profile
      </h2>

      <p className="mt-2 text-white/50">
        Complete your profile to receive personalized
        government scheme recommendations.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            updateField("fullName", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) =>
            updateField("age", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Gender"
          value={form.gender}
          onChange={(e) =>
            updateField("gender", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            updateField("state", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="District"
          value={form.district}
          onChange={(e) =>
            updateField("district", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            updateField("category", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Annual Income"
          type="number"
          value={form.annualIncome}
          onChange={(e) =>
            updateField("annualIncome", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Occupation"
          value={form.occupation}
          onChange={(e) =>
            updateField("occupation", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

        <input
          placeholder="Education"
          value={form.education}
          onChange={(e) =>
            updateField("education", e.target.value)
          }
          className="rounded-2xl bg-[#0B0F19] border border-white/10 p-4 text-white outline-none"
        />

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.student}
            onChange={(e) =>
              updateField("student", e.target.checked)
            }
          />
          Student
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.farmer}
            onChange={(e) =>
              updateField("farmer", e.target.checked)
            }
          />
          Farmer
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.disability}
            onChange={(e) =>
              updateField("disability", e.target.checked)
            }
          />
          Person with Disability
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={form.startupFounder}
            onChange={(e) =>
              updateField(
                "startupFounder",
                e.target.checked
              )
            }
          />
          Startup Founder
        </label>

      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white transition hover:scale-105"
      >
        Save AI Profile
      </button>

    </div>
  );
}