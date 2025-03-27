import { useEffect, useState } from "react";
import "../assets/styles/LoadingScreen.css"; // Make sure this path is correct

const LoadingScreen = ({ loading }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      // Add a small delay before starting the animation
      timer = setTimeout(() => setIsActive(true), 100);
    } else {
      // When loading finishes, immediately deactivate
      setIsActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  // Only render the component when loading is true
  if (!loading) return null;

  return (
    <div className={`loading-overlay visible`}>
      <svg
        className={isActive ? "active" : ""}
        width="64"
        height="65"
        viewBox="0 0 64 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.6676 37.8336H58.6676"
          stroke="#1A55E3"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-1"
        ></path>
        <path
          d="M13.3333 59.167L15.8147 56.6854C17.2248 55.2755 17.9298 54.5704 18.8182 54.1696C19.7065 53.7685 20.7016 53.7064 22.6918 53.5822L31.365 53.04C35.6277 52.7736 37.7591 52.6403 39.6346 51.7398C41.5103 50.839 42.9469 49.2587 45.8197 46.0984L53.3333 37.8336H43.9999L39.2189 42.6147C38.901 42.9326 38.7418 43.0918 38.5765 43.232C37.7258 43.9547 36.6698 44.392 35.5575 44.4827C35.341 44.5003 35.1162 44.5003 34.6666 44.5003M34.6666 44.5003C34.6666 43.2611 34.6666 42.6416 34.5642 42.1264C34.1434 40.0107 32.4895 38.3568 30.3738 37.936C29.8586 37.8336 29.2391 37.8336 27.9999 37.8336H25.9159C23.1291 37.8336 21.7357 37.8336 20.4291 38.1696C19.4559 38.4198 18.5229 38.8062 17.6578 39.3174C16.4964 40.0038 15.5111 40.9891 13.5406 42.9598L5.33325 51.167M34.6666 44.5003H25.3333"
          stroke="#1A55E3"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-2"
        ></path>
        <path
          d="M13.3333 31.1669C13.3333 19.3848 22.8845 9.83362 34.6666 9.83362M34.6666 9.83362C46.4487 9.83362 55.9999 19.3848 55.9999 31.1669M34.6666 9.83362V5.83362"
          stroke="#1A55E3"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-3"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingScreen;
