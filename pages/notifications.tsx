import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
// import useNotificationsDelete from "@/hooks/useNotificationsDelete";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AiOutlineClear } from "react-icons/ai";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser.id);
  const { data: fetchedNotifications = [], mutate: mutateFetchedNotifications } = useNotifications(currentUser.id);

  const deleteNotifications = async () => {
    await axios.delete(`/api/notifications/${currentUser.id}`);
    mutateCurrentUser();
    mutateFetchedUser();
    mutateFetchedNotifications();
    toast.success("Notifications deleted successfully");
  };

  return (
    <>
      {fetchedNotifications.length > 0 ? (
        <Header
          label="Notifications"
          showBackArrow
          rightContent={{ icon: AiOutlineClear, action: deleteNotifications }}
        />
      ) : (
        <Header label="Notifications" showBackArrow />
      )}

      <NotificationsFeed />
    </>
  );
};

export default Notifications;
