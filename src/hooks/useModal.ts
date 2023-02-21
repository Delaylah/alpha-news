import { useState } from "react";
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [postId, setPostId] = useState("");

  function toggle(id:string) {
    setIsShowing(!isShowing);
    setPostId(id);
  }
  return {
    isShowing,
    postId,
    toggle
  };
};
export default useModal;