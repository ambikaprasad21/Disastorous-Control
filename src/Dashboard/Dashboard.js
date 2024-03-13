import Footer from "../components/Footer";
import Header from "../components/Header";
// import Navbar from "../components/Navbar";
import Awareness from "./Awareness";
import InteractiveMap from "./InteractiveMap";
import Maps from "./Maps";

function Dashboard() {
  return (
    <>
      <div className="hero">
        <Header />
        <div className="video-container">
<<<<<<< HEAD
          <video muted autoplay loop className="main-video">
          <source src="images/Background-vid.mp4" type="video/mp4" />
=======
          <video muted autoPlay loop className="main-video">
            <source src="images/bg-video.mp4" type="video/mp4" />
>>>>>>> 047e20b0410ccd498c797cbad0f38512fb2dff75
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
