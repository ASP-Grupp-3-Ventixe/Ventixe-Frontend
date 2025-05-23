import axios from "axios";
import {handleError} from "../Helpers/ErrorHandler.jsx";


const api = import.meta.env.VITE_APP_API_URL || 'http://localhost:5241';

// create email
export const createEmail = async (emailDto) => {
    try {
        const response = await axios.post(`${api}/api/emails`, emailDto);
        return emailMapper(response.data.result);  // use mapper
    } catch (error) {
        handleError(error);
        return null;
    }
}

// get emails
export const getEmails = async (folder = "inbox", unreadOnly = false, searchQuery = "") => {
    try {
        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
        console.log('Token used for emails:', token);
        const response = await axios.get(`${api}/api/emails`, {
            params: { folder, unreadOnly, searchQuery },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return (response.data.items || []).map(emailMapper); 
    } catch (error) {
        handleError(error);
        return [];
    }
};

// get email
export const getEmail = async (id) => {
    try {
        const response = await axios.get(`${api}/api/emails/${id}`);
        return emailMapper(response.data.item); 
    } catch (error) {
        handleError(error);
        return null;
    }
};

// soft delete / move to trash folder
export const softDeleteEmail = async (id) => {
    try {
        await axios.delete(`${api}/api/emails/${id}`);
    } catch (error) {
        handleError(error);
    }
};

// hard delete
export const hardDeleteEmail = async () => {
    try {
        await axios.delete(`${api}/api/emails/${emailId}/permanent`);
    } catch (error) {
        handleError(error);
    }
};

// empty trash
export const emptyTrash = async () => {
    try {
        await axios.delete(`${api}/api/emails/trash/empty`);
    } catch (error) {
        handleError(error);
    }
};

// mapper to convert API data to frontend format
const emailMapper = (mail) => ({
    id: mail.id,
    senderName: mail.sender?.name || "",
    senderInitials: mail.sender?.initials || "",
    senderEmail: mail.sender?.email || "",
    senderAvatar: mail.sender?.avatarUrl || "",
    senderType: mail.sender?.senderType || "",
    recipients: mail.recipients?.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email
    })) || [],
    labels: mail.labels || [],
    subject: mail.subject,
    preview: mail.preview,
    time: mail.time,
    date: mail.date,
    unread: !mail.isRead,
    flagged: mail.isStarred,
    attachments: mail.attachments || [],
    body: mail.body
});