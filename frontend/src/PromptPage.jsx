import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Globe from "react-globe.gl";

/* ----------------------------- DiscussionComponent ----------------------------- */
function DiscussionComponent() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddPost = () => {
    if (newPostText.trim() === "") return;
    const newPost = { id: Date.now(), content: newPostText.trim() };
    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = (id) => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setEditingPostId(id);
      setEditingText(post.content);
    }
  };

  const handleSaveEdit = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, content: editingText } : post
    );
    setPosts(updatedPosts);
    setEditingPostId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingText("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-6">Discussion</h3>

      {/* New Post Textarea + Post Button */}
      <div className="mb-4">
        <textarea
          placeholder="Share your thoughts..."
          className="
            w-full p-4
            bg-[#1c1c1c]
            text-white
            rounded
            border border-gray-600
            focus:outline-none
            focus:ring-2 focus:ring-[#47C0FF]
            transition
          "
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <button
          onClick={handleAddPost}
          className="
            mt-3
            px-5 py-2
            border border-white
            rounded-full
            hover:bg-white hover:text-black
            transition-colors
            text-sm
            font-semibold
          "
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet. Start the conversation!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#1c1c1c] p-5 rounded mb-4 border border-gray-700"
          >
            {editingPostId === post.id ? (
              <>
                <textarea
                  className="
                    w-full p-3
                    bg-black
                    text-white
                    rounded
                    border border-gray-600
                    focus:outline-none
                    focus:ring-2 focus:ring-[#47C0FF]
                    transition
                  "
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className="
                      px-4 py-2
                      border border-white
                      rounded-full
                      hover:bg-white hover:text-black
                      transition-colors
                      text-sm
                      font-semibold
                    "
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="
                      px-4 py-2
                      border border-white
                      rounded-full
                      hover:bg-white hover:text-black
                      transition-colors
                      text-sm
                      font-semibold
                    "
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white">{post.content}</p>
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="
                      px-4 py-2
                      border border-[#FFC346]
                      text-[#FFC346]
                      rounded-full
                      hover:bg-[#FFC346] hover:text-black
                      transition-colors
                      text-sm
                      font-semibold
                    "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="
                      px-4 py-2
                      border border-red-500
                      text-red-500
                      rounded-full
                      hover:bg-red-500 hover:text-black
                      transition-colors
                      text-sm
                      font-semibold
                    "
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/* ----------------------------- DailyDilemma ----------------------------- */
function DailyDilemma() {
  // Voting states
  const [voted, setVoted] = useState(false);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  const [yesWidth, setYesWidth] = useState(0);
  const [noWidth, setNoWidth] = useState(0);

  // Which side the user picked
  const [selectedSide, setSelectedSide] = useState("");

  // Tally & percentages
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes === 0 ? 0 : (yesVotes / totalVotes) * 100;
  const noPercentage = totalVotes === 0 ? 0 : (noVotes / totalVotes) * 100;

  // Footer stages
  // "PICK_SIDE", "VOTE", "RESULTS"
  const [footerStage, setFooterStage] = useState("PICK_SIDE");

  // Animate bar after vote
  useEffect(() => {
    if (voted) {
      setTimeout(() => {
        setYesWidth(yesPercentage);
        setNoWidth(noPercentage);
      }, 100);
    }
  }, [voted, yesPercentage, noPercentage]);

  // Show/hide Globe
  const [showGlobe, setShowGlobe] = useState(false);

  // Expand the footer (slides up)
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  // Voting function
  const handleVote = (side) => {
    if (!voted) {
      if (side === "yes") {
        setYesVotes((prev) => prev + 1);
        setSelectedSide("Let it go and talk to her");
      } else {
        setNoVotes((prev) => prev + 1);
        setSelectedSide("Make her return it and apologize");
      }
      setVoted(true);
      setFooterStage("RESULTS");
    }
  };

  // "View Discussion" => set expanded
  const handleViewDiscussion = () => {
    setIsFooterExpanded(true);
  };

  // "Minimize" => revert
  const handleCloseDiscussion = () => {
    setIsFooterExpanded(false);
  };

  // **Conditionally compute collapsed height**:
  // - In "RESULTS", we want more vertical space (200px).
  // - Otherwise, use 130px (or something smaller).
  const getCollapsedHeight = () => {
    if (footerStage === "RESULTS") {
      return "translate-y-[calc(100%-200px)]";
    }
    // For PICK_SIDE and VOTE
    return "translate-y-[calc(100%-120px)]";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-[100px] items-center px-4 relative font-sans">
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full p-4 flex items-center justify-between">
        <img src={logo} alt="Daily Dilemma Logo" className="h-12 w-auto" />
        <div
          onClick={() => setShowGlobe(!showGlobe)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <GlobeAltIcon className="h-12 w-12 text-white" />
        </div>
      </header>

      {/* MAIN TITLE */}
      <div className="mt-20 mb-8 text-center">
        <h1 className="text-7xl font-bold leading-tight">
          The{" "}
          <span className="inline-block">
            Da
            <span className="text-[#FFC346]">i</span>ly
          </span>{" "}
          D<span className="text-[#47C0FF]">i</span>lemma
        </h1>
      </div>

      {/* PROMPT CONTAINER */}
      <div className="max-w-2xl w-full bg-[#1c1c1c] rounded-md border border-gray-700 p-8 mb-24">
        <h2 className="text-xl font-semibold text-center mb-4">
          My 14-Year-Old Daughter Stole a Luxury Hair Product—Do I Make Her
          Return It or Let It Slide?
        </h2>
        <hr></hr>
        <br></br>
        <p className="text-gray-300 text-sm leading-relaxed">
          Today was one of those days that started normal but ended with a knot
          in my stomach. My 14-year-old daughter and I went grocery shopping,
          like we always do. We stick to Save on Foods because, honestly, it’s
          all we can afford right now. Things have been tight since my wife got
          laid off, and every dollar counts. After grabbing what we needed, we
          stopped at the drugstore to pick up some cold medicine for her. It
          wasn’t until we got home and I was unpacking the bags that I noticed
          something off. In my daughter’s backpack was an expensive hair
          product—one of those high-end brands she’s been obsessing over for
          weeks. I knew we didn’t buy it, and when I asked her about it, she
          froze. After a long pause, she admitted she took it from the
          drugstore. She said she didn’t want to ask me for it because she knows
          how stressed I’ve been about money, and she didn’t want to add to it.
          Part of me understands. She’s at that age where fitting in feels like
          life or death, and all her friends have these fancy things. But the
          other part of me is furious and heartbroken. Stealing is wrong, plain
          and simple, and I don’t want her to think it’s okay to take things
          just because we can’t afford them. At the same time, I know she’s
          already feeling guilty and embarrassed. She’s a good kid, and this is
          the first time something like this has happened. I’m torn. Do I make
          her return the product and apologize to the store, even though it
          might humiliate her? Or do I let it go this once, sit her down, and
          have a serious talk about why what she did was wrong and how to handle
          these feelings in the future?
        </p>
      </div>

      {/* GLOBE SECTION (toggle) */}
      {showGlobe && (
        <div className="w-full max-w-2xl bg-[#1c1c1c] border border-gray-700 rounded-md p-8 mb-24">
          <h2 className="text-2xl font-bold mb-4">Globe</h2>
          <div className="w-full h-[500px]">
            <Globe
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            />
          </div>
        </div>
      )}

      {/* FOOTER (SLIDE-UP) */}
      <footer
        className={`
          fixed left-0 bottom-0 w-full z-50
          bg-[#1c1c1c]
          border-t border-gray-700
          h-screen
          transition-transform duration-700
          ${isFooterExpanded ? "translate-y-0" : getCollapsedHeight()}
        `}
      >
        <div className="flex flex-col h-full w-full overflow-y-auto">
          {/* ----- COLLAPSED CONTENT (NOT EXPANDED) ----- */}
          {!isFooterExpanded && (
            <>
              {/* STAGE 1: Single 'Pick a side' */}
              {footerStage === "PICK_SIDE" && (
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-4">
                  <button
                    onClick={() => setFooterStage("VOTE")}
                    className="
                      px-16 py-6
                      border border-white
                      rounded-full
                      hover:bg-white hover:text-black
                      transition-colors
                      text-sm
                      font-semibold
                      
                    "
                  >
                    Pick a side
                  </button>
                </div>
              )}

              {/* STAGE 2: Vote Buttons */}
              {footerStage === "VOTE" && !voted && (
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-4 space-y-3">
                  <p className="text-white text-l">Pick a side</p>
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleVote("yes")}
                      className="
                        px-8 py-4
                        text-white
                        text-base
                        font-semibold
                        bg-[#242424]
                        border-2 border-[#FFC346]
                        rounded-md
                        hover:bg-[#FFC346] hover:text-black
                        transition-colors
                      "
                    >
                      Let it go and talk to her
                    </button>
                    <button
                      onClick={() => handleVote("no")}
                      className="
                        px-8 py-4
                        text-white
                        text-base
                        font-semibold
                        bg-[#242424]
                        border-2 border-[#47C0FF]
                        rounded-md
                        hover:bg-[#47C0FF] hover:text-black
                        transition-colors
                      "
                    >
                      Make her return it and apologize
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: Results Bar + 'View Discussion' */}
              {footerStage === "RESULTS" && voted && (
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-4 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-200">You’ve sided with</p>
                    <p className="text-base font-semibold mt-1">
                      {selectedSide}
                    </p>
                  </div>
                  <div className="w-full max-w-md">
                    <div className="w-full h-6 bg-gray-700 rounded-full relative overflow-hidden">
                      <div
                        className="bg-[#FFC346] h-full transition-all duration-700"
                        style={{ width: `${yesWidth}%` }}
                      ></div>
                      <div
                        className="bg-[#47C0FF] h-full transition-all duration-700 absolute top-0 right-0"
                        style={{ width: `${noWidth}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full mt-2 text-xs text-gray-400">
                      <span>
                        {Math.round(noPercentage)}% Let it go and talk to her
                      </span>
                      <span>
                        {Math.round(yesPercentage)}% Make her return it and
                        apologize
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleViewDiscussion}
                    className="
                      flex flex-col items-center
                      text-white text-xl font-bold
                      transition-opacity
                      hover:opacity-80
                    "
                  >
                    <span>View the Discussion</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mt-1 text-gray-400 rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}

          {/* ----- EXPANDED CONTENT (SLIDING FULLY UP) ----- */}
          {isFooterExpanded && (
            <div className="w-full max-w-3xl mx-auto pt-6 px-4 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Discussion &amp; Results</h2>
                <button
                  onClick={handleCloseDiscussion}
                  className="
                    flex flex-col items-center
                    text-white text-sm font-semibold
                    transition-opacity hover:opacity-80
                  "
                >
                  <span>Minimize</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1 text-gray-400 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-200">You’ve sided with</p>
                  <p className="text-base font-semibold mt-1">{selectedSide}</p>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="w-full h-6 bg-gray-700 rounded-full relative overflow-hidden">
                    <div
                      className="bg-[#FFC346] h-full transition-all duration-700"
                      style={{ width: `${yesWidth}%` }}
                    />
                    <div
                      className="bg-[#47C0FF] h-full transition-all duration-700 absolute top-0 right-0"
                      style={{ width: `${noWidth}%` }}
                    />
                  </div>
                  <div className="flex justify-between w-full mt-2 text-xs text-gray-400">
                    <span>
                      {Math.round(noPercentage)}% Let it go and talk to her
                    </span>
                    <span>{Math.round(yesPercentage)}% Make her return it</span>
                  </div>
                </div>
              </div>
              {/* Discussion */}
              <DiscussionComponent />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default DailyDilemma;
