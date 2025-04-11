import { useState, useEffect, useCallback } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Listen to authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) listenToNotes(currentUser.uid);
    });

    return () => unsubscribe();
  }, []);

  // Listen to notes for the authenticated user
  const listenToNotes = useCallback((uid) => {
    const userNotesRef = collection(db, "notes");
    const q = query(userNotesRef, where("userID", "==", uid));

    return onSnapshot(q, (querySnapshot) => {
      const notesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesData);
      setFilteredNotes(notesData); // Initially set to all notes
    });
  }, []);

  // Filter notes based on search text
  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchText, notes]);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  // Add a new note
  const addNote = async ({ title, content }) => {
    if (!title || !content) return;
    const userNotesRef = collection(db, "notes");
    try {
      await addDoc(userNotesRef, {
        userID: user.uid,
        title,
        content,
        createdTime: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Update a note
  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const noteRef = doc(db, "notes", id);
      await updateDoc(noteRef, {
        title: updatedTitle,
        content: updatedContent,
      });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Log out
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div className="signin-container">
        <div className="signin-card">
          <img 
            src="/firebase-logo.png"
            alt="Firebase Logo" 
            className="firebase-logo"
          />
          <h2>Welcome to Firebase Notes</h2>
          <p className="signin-text">Sign in to continue</p>
          <button 
            onClick={signInWithGoogle} 
            className="google-signin-btn"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign in with Google
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="container">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
          <button onClick={logOut}>Log Out</button>
        </div>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={filteredNotes}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleUpdateNote={updateNote}
        />
      </div>
    </div>
  );
};

export default App;
