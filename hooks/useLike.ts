import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId } : { postId: string, userId? : string }) => {

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId); 
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const [isLoading, setIsLoading ] = useState(false);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likeIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likeIds]);

  const toggleLike = useCallback( async () => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {

      setIsLoading(true);

      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts()
      mutateCurrentUser();
      
      toast.success("Success");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }, [currentUser, hasLiked, loginModal, mutateCurrentUser, mutateFetchedPost, mutateFetchedPosts, postId])

  return {
    hasLiked,
    toggleLike,
    isLoading
  }
}

export default useLike;