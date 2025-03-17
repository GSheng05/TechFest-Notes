import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const [noteTitle, setNoteTitle] = useState('');
	const characterLimit = 200;

	const handleTextChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleTitleChange = (event) => {
		setNoteTitle(event.target.value)
	}

	const handleSaveClick = () => {
		if (noteText.trim().length > 0 && noteTitle.trim().length > 0) {
			handleAddNote({title: noteTitle, content: noteText})
			setNoteText('')
			setNoteTitle('');
		}
	};

	return (
		<div className='note new'>
			<input
				type='text'
				placeholder='Note title...'
				value={noteTitle}
				onChange={handleTitleChange}
				className='note-title-input'
			/>
			<textarea
				rows='8'
				cols='10'
				className='note-textarea'
				placeholder='Type to add a note...'
				value={noteText}
				onChange={handleTextChange}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
