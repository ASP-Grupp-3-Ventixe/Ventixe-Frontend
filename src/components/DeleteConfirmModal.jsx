import React, { useEffect } from 'react'

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onCancel()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)

  }, [oncancel])

  const handleBackdropClick = (e) => {
    if(e.target.classList.contains("modal-backdrop")){
      onCancel()
    }
  }
  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div className='modal delete-modal'>
        <p>Delete event?</p>
        <p>This action cannot be undone.</p>
        <div className='modal-actions'>
          <button className='confirm-btn' onClick={onConfirm}>Delete</button>
          <button className='cancel-btn' onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
