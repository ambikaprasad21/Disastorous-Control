import Footer from "../components/Footer";
import Header from "../components/Header";
import Awareness from "./Awareness";
import InteractiveMap from "./InteractiveMap";
import Maps from "./Maps";

function Dashboard() {
  return (
    <>
      <div className="hero">
        <Header />
        <div className="video-container">
          <video muted autoPlay loop className="main-video">
            <source src="images/bg-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <Awareness />
      <InteractiveMap />
      <Maps />
      <Footer />
    </>
  );
}

export default Dashboard;
