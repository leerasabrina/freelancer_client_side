import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from '../assets/animation.json';

const Loader = () => (
  <div>
    <Player
      autoplay
      loop
      src={loadingAnimation}
      style={{ height: "70px", width: "100px" }}
    />
  </div>
);

export default Loader;
