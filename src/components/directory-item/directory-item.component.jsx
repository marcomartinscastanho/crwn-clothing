import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

export const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      {/* imageUrl could be called whatever, it's whatever name we decide to pass a prop into the styled component */}
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
