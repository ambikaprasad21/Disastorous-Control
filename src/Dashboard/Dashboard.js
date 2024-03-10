import Header from "../components/Header";
// import Navbar from "../components/Navbar";
import Awareness from "./Awareness";
import Maps from "./Maps";

function Dashboard() {
  return (
    <>
      <div className="hero">
        <Header />
        <div className="video-container">
          <video muted className="main-video">
            <source src="images/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <Awareness />
      <Maps />
    </>
  );
}

export default Dashboard;
