import StarEmpty from "../assets/svg/icons/star-empty.svg";
import StarFilled from "../assets/svg/icons/star-filled.svg";

const StarButton = ({
  favorited,
  onClick,
  size = 12,
}: {
  favorited: boolean;
  onClick: () => void;
  size?: number;
}) => (
  <button
    onClick={onClick}
    aria-label={favorited ? "Unfavorite" : "Favorite"}
    title={favorited ? "Unfavorite" : "Favorite"}
  >
    {favorited ? (
      <StarFilled className={`w-${size} h-${size}`} />
    ) : (
      <StarEmpty className={`w-${size} h-${size}`} />
    )}
  </button>
);

export default StarButton;
