import Image from "next/image";
import userUser from "@/hooks/useUser";
import Avatar from "@/components/Avatar";
interface userHeroProps {
  userId: string;
}

const UserHero = ({ userId }: userHeroProps) => {
  const { data: fetchedUser } = userUser(userId);
  return (
    <div>
      <div className="bg-neutral-800 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
