import { useState } from "react";

export function useModal(initial = false) {
    const [open, setOpen] = useState(initial);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return { open, handleOpen, handleClose };
}