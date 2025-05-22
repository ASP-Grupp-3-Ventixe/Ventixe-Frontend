import React, { useEffect, useState } from "react";

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
  });

  const [errors, setErrors] = useState({})

  const validate = (values) => {
    const newErrors = {}

    if (!values.title.trim()) newErrors.title = "Title is required."
    if (!values.category.trim()) newErrors.category = "Category is required."
    if (!values.date) newErrors.date = "Date is required."
    if (!values.location.trim()) newErrors.location = "Location is required."
    if (!values.status) newErrors.status = "Status is required."

    const progress = Number(values.progress)
    if (isNaN(progress) || progress < 0 || progress > 100)
      newErrors.progress = "Progress must be between 0 and 100."

    const price = Number(values.price)
    if (isNaN(price) || price < 0)
      newErrors.price = "Price must be a positive number."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const change = (key, value) => {
    setForm(prev => {
      const updated = { ...prev, [key]: value }

      const errors = validate(updated)
      setErrors(errors)

      return updated
    })
  }

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        title: initialData.title,
        category: initialData.category,
        date: initialData.date.slice(0, 10),
        location: initialData.location,
        status: initialData.status,
        progress: initialData.progress.toString(),
        price: initialData.price.toString(),
        description: initialData.description,
      })
    } else {
      setForm({
        id: 0,
        title: "",
        category: "",
        date: "",
        location: "",
        status: "Active",
        progress: "",
        price: "",
        description: "",
      })
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!validate(form)) return

    const cleanedForm = {
      ...form,
      title: form.title.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      progress: Number(form.progress),
      price: Number(form.price),
      date: new Date(form.date).toISOString()
    };

    if (!initialData) {
      delete cleanedForm.id;
    }
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
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => change("category", e.target.value)}
          className={errors.category ? "input-error" : ""}
        />
        {errors.category && <p className="error-message">{errors.category}</p>}
        <input
          type="date"
          value={form.date}
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
