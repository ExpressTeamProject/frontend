import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ProblemDetailPage from "./page/ProblemDetailPage";
import NewProblemPage from "./page/NewProblemPage";
import ProblemsPage from "./page/ProblemsPage";
import SolvedProblemsPage from "./page/SolvedProblemsPage";
import CommunityPage from "./page/CommunityPage";
import RankingPage from "./page/RankingPage";
import CommunityNewPage from "./page/CommunityNewPage";
import UserProfilePage from "./page/UserProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/problems/:id" element={<ProblemDetailPage />} />
      <Route path="/problems/new" element={<NewProblemPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
      <Route path="/solved" element={<SolvedProblemsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/new" element={<CommunityNewPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/user/:username" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;
