import {useEffect, useState} from "react";
import {getEmails} from "../../../../../Services/MailHandlingService.jsx";


export function useEmails(activeFolder) {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getEmails(activeFolder.toLowerCase(), false, "")
            .then(data => setEmails(data))
            .catch(() => setError("Failed to fetch emails"))
            .finally(() => setLoading(false));
    }, [activeFolder]);
    
    // function to remove an email from the list directly
    const removeMail = (id) => {
        setEmails(prev => prev.filter(mail => mail.id !== id));
    };

    return { emails, loading, error, removeMail, setEmails };
}