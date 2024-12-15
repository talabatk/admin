import "./loadingSpinner.scss";
import { Ring } from "@uiball/loaders";

const LoadingSpinner = () => {
  return (
    <div className="lazy-loading-spinner center">
      <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
    </div>
  );
};
export default LoadingSpinner;
