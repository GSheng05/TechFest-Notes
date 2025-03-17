import { useState } from 'react';
import { MdDeleteForever, MdEdit, MdSave } from 'react-icons/md';

const Note = ({ id, title, content, date, handleDeleteNote, handleUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim().length > 0 && editContent.trim().length > 0) {
      handleUpdateNote(id, editTitle, editContent);
      setIsEditing(false);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title..."
            className="note-title-input"
          />
          <textarea
            rows="8"
            cols="10"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit content..."
            className="note-textarea"
          ></textarea>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{content}</p>
        </>
      )}
      <div className="note-footer">
        <small>{new Date(date).toLocaleString()}</small>
        <div>
          {isEditing ? (
            <MdSave onClick={handleSave} className="save-icon" size="1.3em" />
          ) : (
            <MdEdit onClick={handleEdit} className="edit-icon" size="1.3em" />
          )}
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
