import Header from "../components/Header";
// import Navbar from "../components/Navbar";
import Awareness from "./Awareness";

function Dashboard() {
  return (
    <>
      <div className="hero">
        <Header />
        <div className="video-container">
          <video muted className="main-video">
            <source src="images/nasa1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <Awareness />
    </>
  );
}

export default Dashboard;
