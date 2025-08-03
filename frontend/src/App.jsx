import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WriteArticle from "./pages/WriteArticle";
import Dashboard from "./pages/Dashboard";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import Layout from "./pages/Layout";
import RemoveBg from "./pages/RemoveBg";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import { Toaster } from "react-hot-toast";

const App = () => {
  // const { getToken } = useAuth();

  // useEffect(() => {
  //   getToken().then((token) => console.log(token));
  // }, []);

  return (
    <>
      <main>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="blog-titles" element={<BlogTitles />} />
            <Route path="generate-images" element={<GenerateImages />} />
            <Route path="remove-background" element={<RemoveBg />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
