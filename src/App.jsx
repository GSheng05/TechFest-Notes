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
      <div className="p-8 text-center">
        <button onClick={signInWithGoogle}>Sign In with Google</button>
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
