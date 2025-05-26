import React, { useEffect, useState } from "react";
import { EventCategoryList } from "./EventCategory";

const fieldPattern = /^[a-öA-Ö0-9\s,.:;'`-]{2,100}$/
const packagePattern = /^[a-zA-Z0-9\s-]{2,30}$/

const EventForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    id: 0,
    title: "",
    category: "",
    date: "",
    location: "",
    status: "Active",
    progress: "",
    price: "",
    description: "",
    packages: [{ name: "", price: "" }]
  });

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)



  const validate = (values) => {
    const newErrors = {}

    if (!fieldPattern.test(values.title.trim()))
      newErrors.title = "Only letters, numbers, spaces, and - allowed (2-50 chars.)"
    if (!EventCategoryList.includes(values.category)) {
      newErrors.category = "Invalid category."
    }

    if (!values.date) newErrors.date = "Date is required."

    const eventDate = new Date(values.date)
    const now = new Date()

    if (isNaN(eventDate.getTime()))
      newErrors.date = "Invalid date format."
    else if (eventDate < now) {
      newErrors.date = "Date must be in the future."
    }

    if (!fieldPattern.test(values.location.trim()))
      newErrors.location = "Only letters, numbers, spaces, and - allowed (2-50 chars.)"

    if (!values.status) newErrors.status = "Status is required."

    const progress = Number(values.progress)
    if (isNaN(progress) || progress < 0 || progress > 100)
      newErrors.progress = "Progress must be between 0 and 100."

    const price = Number(values.price)
    if (isNaN(price) || price < 0)
      newErrors.price = "Price must be a positive number."

    if (values.packages && Array.isArray(values.packages)) {
      const packageErrors = []

      values.packages.forEach((p, index) => {
        if (!packagePattern.test(p.name)) {
          packageErrors[index] = `Package name "${p.name}" is invalid.`
        } else if (typeof p.price !== 'number' || isNaN(p.price) || p.price < 0) {
          packageErrors[index] = `Package price for "${p.name}" must be a positive number.`
        } else packageErrors[index] = null

      })

      if (packageErrors.some(Boolean)) {
        newErrors.packages = packageErrors
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const change = (key, value) => {
    const updated = { ...form, [key]: value }
    setForm(updated)

    if (submitted) validate(updated)
  }



  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        title: initialData.title,
        category: initialData.category,
        date: initialData.date.slice(0, 16),
        location: initialData.location,
        status: initialData.status,
        progress: initialData.progress.toString(),
        price: initialData.price.toString(),
        description: initialData.description,
        maxTickets: initialData.maxTickets,
        packages: initialData.packages ?? []
      })
    }
  }, [initialData]);

  const handleSubmit = () => {
    setSubmitted(true)
    if (!validate(form)) return

    const cleanedForm = {
      ...form,
      title: form.title.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      progress: Number(form.progress),
      price: Number(form.price),
      date: new Date(form.date).toISOString(),
      maxTickets: Number(form.maxTickets),
      packages: form.packages.map(p => ({
    name: p.name,
    price: Number(p.price)
  }))
    };

    if (!initialData) delete cleanedForm.id;

    onSubmit(cleanedForm);
  };



  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Edit Event" : "New Event"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => change("title", e.target.value)}
          className={errors.title ? "input-error" : ""}


        />
        {errors.title && <p className="error-message">{errors.title}</p>}
        <select
          value={form.category}
          onChange={(e) => change("category", e.target.value)}
          className={errors.category ? "input-error" : ""}
        >
          <option value="">Select a category</option>
          {EventCategoryList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <p className="error-message">{errors.category}</p>}

        <input
          type="datetime-local"
          value={form.date || ""}
          onChange={(e) => change("date", e.target.value)}
          className={errors.date ? "input-error" : ""}
        />
        {errors.date && <p className="error-message">{errors.date}</p>}
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => change("location", e.target.value)}
          className={errors.location ? "input-error" : ""}
        />
        {errors.location && <p className="error-message">{errors.location}</p>}
        <select
          value={form.status}
          onChange={(e) => change("status", e.target.value)}

        >
          {["Active", "Draft", "Past"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.status && <p className="error-message">{errors.status}</p>}
        <div className="input-with-suffix">
          <input
            type="number"
            placeholder="Progress %"
            value={form.progress}
            onChange={(e) => change("progress", e.target.value)}
            className={errors.progress ? "input-error" : ""}
          />
          <span className="suffix">%</span>
        </div>
        {errors.progress && <p className="error-message">{errors.progress}</p>}

        <div className="input-with-prefix">
          <span className="prefix">$</span>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => change("price", e.target.value)}
            className={errors.price ? "input-error" : ""}
          />
        </div>
        {errors.price && <p className="error-message">{errors.price}</p>}

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => change("description", e.target.value)}
        />


        <input
          placeholder="Total tickets"
          type="number"
          id="maxTickets"
          value={form.maxTickets}
          onChange={(e) => setForm({ ...form, maxTickets: Number(e.target.value) })} />

        <h4>Packages</h4>
        {form.packages.map((pkg, index) => (
          <div key={pkg.id} className="package-row">

            <input type="text"
              placeholder="Package name"
              value={pkg.name}
              onChange={(e) => {
                const updated = form.packages.map((p) =>
                  p.id === pkg.id ? { ...p, name: e.target.value } : p)
                change("packages", updated);
              }}
              className="package-input"

            />

            <input
              type="number"
              placeholder="Price"
              value={pkg.price || ""}
              onChange={(e) => {
                const updated = [...form.packages];
                updated[index].price = parseFloat(e.target.value);
                change("packages", updated);
              }}
              className="package-price"
            />

            <button
              type="button"
              className="remove-package"
              onClick={() => {
                const updated = [...form.packages];
                updated.splice(index, 1);
                change("packages", form.packages.filter((p) => p.id !== pkg.id));
              }}
            >
              Remove
            </button>
            {errors.packages && errors.packages[index] && (
              <p className="error-message">{errors.packages[index]}</p>
            )
            }
          </div>
        ))}

        <button
          type="button"
          className="add-package"
          onClick={() =>
            change("packages", [...form.packages, { id: Date.now(), name: "", price: 0 }])
          }

        >
          + Add Package
        </button>

        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {initialData ? "Save changes" : "Create Event"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
