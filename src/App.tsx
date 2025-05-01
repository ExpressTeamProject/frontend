import { Routes, Route } from "react-router";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ProblemDetailPage from "./page/ProblemDetailPage";
import NewProblemPage from "./page/NewProblemPage";
import ProblemsPage from "./page/ProblemsPage/ProblemsPage";
import SolvedProblemsPage from "./page/SolvedProblemsPage";
import CommunityPage from "./page/CommunityPage/CommunityPage";
import CommunityNewPage from "./page/CommunityNewPage";
import RankingPage from "./page/RankingPage/RankingPage";
import UserProfilePage from "./page/UserProfilePage";
import ProfileEditPage from "./page/ProfileEditPage";
import SearchResultsPage from "./page/SearchResultPages/SearchResultsPage";

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
      <Route path="/user/:username/edit" element={<ProfileEditPage />} />
      <Route path="/search" element={<SearchResultsPage />} /> {/** 메인페이지에서 검색시 페이지 */}
    </Routes>
  );
}

export default App;
