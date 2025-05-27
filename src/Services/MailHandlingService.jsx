import axios from "axios";
import {handleError} from "../Helpers/ErrorHandler.jsx";
import { attachInterceptors } from "../Helpers/attachInterceptor.jsx";

const mailClient = axios.create({
    baseURL: "https://mailhandlingservice-brdtfbcye5dea5cw.swedencentral-01.azurewebsites.net/api/",
});

attachInterceptors(mailClient);

// create email
export const createEmail = async (emailDto) => {
    try {
        const response = await mailClient.post("emails", emailDto);
        return emailMapper(response.data.result);  // use mapper
    } catch (error) {
        handleError(error);
        return null;
    }
}

// get emails
export const getEmails = async (folder = "inbox", unreadOnly = false, searchQuery = "") => {
    try {
        const response = await mailClient.get("emails", {
            params: { folder, unreadOnly, searchQuery }
        });
        const mapped = (response.data.items || []).map(emailMapper);
        return mapped;
    } catch (error) {
        handleError(error);
        return [];
    }
};

// get email
export const getEmail = async (id) => {
    try {
        const response = await mailClient.get(`emails/${id}`);
        return emailMapper(response.data.item); 
    } catch (error) {
        handleError(error);
        return null;
    }
};

// soft delete / move to trash folder
export const softDeleteEmail = async (id) => {
    try {
        await mailClient.delete(`emails/${id}`);
    } catch (error) {
        handleError(error);
    }
};

// hard delete
export const hardDeleteEmail = async (emailId) => {
    try {
        await mailClient.delete(`emails/${emailId}/permanent`);
    } catch (error) {
        handleError(error);
    }
};

// empty trash
export const emptyTrash = async () => {
    try {
        await mailClient.delete("emails/trash/empty");
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