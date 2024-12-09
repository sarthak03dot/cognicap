import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '../stylesheets/OpenDiscussion.css';

// Default Discussions
const initialDiscussions = [
    {
        id: 1,
        author: "John Doe",
        content: "This is a sample discussion written in **Markdown**! Feel free to reply or ask questions.",
        replies: [
            {
                id: 1,
                author: "Jane Smith",
                content: "Great discussion! Markdown support is awesome. 😊",
            },
        ],
    },
];

const OpenDiscussion = () => {
    const navigate = useNavigate();
    const [discussions, setDiscussions] = useState(initialDiscussions);
    const [newDiscussion, setNewDiscussion] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    // Add a new discussion
    const handleAddDiscussion = () => {
        if (newDiscussion.trim()) {
            setDiscussions([
                ...discussions,
                {
                    id: discussions.length + 1,
                    author: "Anonymous User", // Replace with user authentication if available
                    content: newDiscussion,
                    replies: [],
                },
            ]);
            setNewDiscussion('');
        }
    };

    // Add a reply to a discussion
    const handleAddReply = (discussionId) => {
        if (replyContent.trim()) {
            const updatedDiscussions = discussions.map((discussion) => {
                if (discussion.id === discussionId) {
                    return {
                        ...discussion,
                        replies: [
                            ...discussion.replies,
                            {
                                id: discussion.replies.length + 1,
                                author: "Anonymous User", // Replace with user authentication if available
                                content: replyContent,
                            },
                        ],
                    };
                }
                return discussion;
            });

            setDiscussions(updatedDiscussions);
            setReplyContent('');
            setSelectedDiscussion(null);
        }
    };

    return (
        <div className="open-discussion">
        <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <h1>Open Discussion</h1>

            {/* Markdown Editor for New Discussion */}
            <div className="new-discussion">
                <h2>Start a Discussion</h2>
                <Editor
                    value={newDiscussion}
                    onChange={({ text }) => setNewDiscussion(text)}
                    style={{ height: "200px" }}
                />
                <button className="submit-btn" onClick={handleAddDiscussion}>
                    Post Discussion
                </button>
            </div>

            {/* Discussion Feed */}
            <div className="discussion-feed">
                <h2>Discussions</h2>
                {discussions.map((discussion) => (
                    <div key={discussion.id} className="discussion-card">
                        <div className="discussion-content">
                            <h3>{discussion.author}</h3>
                            <ReactMarkdown>{discussion.content}</ReactMarkdown>
                        </div>

                        {/* Replies */}
                        <div className="replies">
                            <h4>Replies</h4>
                            {discussion.replies.map((reply) => (
                                <div key={reply.id} className="reply">
                                    <strong>{reply.author}:</strong> <ReactMarkdown>{reply.content}</ReactMarkdown>
                                </div>
                            ))}

                            {/* Reply Input */}
                            {selectedDiscussion === discussion.id && (
                                <div className="reply-input">
                                    <Editor
                                        value={replyContent}
                                        onChange={({ text }) => setReplyContent(text)}
                                        style={{ height: "150px" }}
                                    />
                                    <button onClick={() => handleAddReply(discussion.id)}>Post Reply</button>
                                </div>
                            )}
                            <button
                                className="reply-btn"
                                onClick={() =>
                                    setSelectedDiscussion(
                                        selectedDiscussion === discussion.id ? null : discussion.id
                                    )
                                }
                            >
                                {selectedDiscussion === discussion.id ? "Cancel Reply" : "Reply"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenDiscussion;
